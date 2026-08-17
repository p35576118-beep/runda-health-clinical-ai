(() => {
  "use strict";

  const stage = document.querySelector("#deckStage");
  const slides = [...document.querySelectorAll(".slide[data-page]")];
  const overlay = document.querySelector("[data-miu-overlay]");
  const miuTriggers = [...document.querySelectorAll("[data-miu-trigger]")];
  const miuClose = document.querySelector("[data-miu-close]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let currentPage = 1;
  let wheelLocked = false;
  let pointerStart = null;
  let returnTarget = null;

  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainder = Math.floor(seconds % 60);
    return `${minutes}:${String(remainder).padStart(2, "0")}`;
  }

  function renderAgentDemo(product = window.__rundaActiveAgent) {
    const demoSlide = document.querySelector("[data-agent-demo]");
    if (!demoSlide || !product?.demo) return;

    const { demo } = product;
    window.__rundaActiveAgent = product;
    demoSlide.dataset.label = `${product.name} product proof`;
    demoSlide.setAttribute("aria-label", `${product.name} product proof`);
    demoSlide.querySelector("[data-demo-eyebrow]").textContent = `06 / selected agent / ${product.name}`;
    demoSlide.querySelector("[data-demo-description]").textContent = demo.description;
    demoSlide.querySelector("[data-demo-proof-title]").textContent = demo.proofTitle;
    demoSlide.querySelector("[data-demo-note]").textContent = demo.note;

    const headline = demoSlide.querySelector("[data-demo-headline]");
    const emphasis = document.createElement("em");
    emphasis.textContent = demo.emphasis;
    headline.replaceChildren(document.createTextNode(`${demo.lead} `), emphasis);

    const steps = demo.steps.map((step) => {
      const item = document.createElement("li");
      item.textContent = step;
      return item;
    });
    demoSlide.querySelector("[data-demo-steps]").replaceChildren(...steps);

    const link = demoSlide.querySelector("[data-demo-link]");
    const target = demo.href || product.media?.video;
    if (target) {
      link.hidden = false;
      link.href = target;
      const arrow = document.createElement("span");
      arrow.textContent = "↗";
      link.replaceChildren(document.createTextNode(`${demo.linkText || "Open product video"} `), arrow);
    } else {
      link.hidden = true;
      link.removeAttribute("href");
    }
  }

  function createVideoButton(label, text, className = "") {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `video-controls__button${className ? ` ${className}` : ""}`;
    button.setAttribute("aria-label", label);
    button.textContent = text;
    return button;
  }

  function syncFullscreenButtons() {
    document.querySelectorAll("[data-video-fullscreen]").forEach((button) => {
      const host = button.closest("[data-runda-media]");
      const expanded = document.fullscreenElement === host;
      button.textContent = expanded ? "Exit full screen" : "Full screen";
      button.setAttribute("aria-label", expanded ? "Exit full screen" : "Enter full screen");
      button.setAttribute("aria-pressed", String(expanded));
    });
  }

  function attachVideoControls(video) {
    if (video.dataset.rundaControls === "true") return;
    const host = video.closest("figure");
    if (!host) return;

    video.dataset.rundaControls = "true";
    video.controls = false;
    host.classList.add("media-host");
    host.dataset.rundaMedia = "true";

    const controls = document.createElement("div");
    controls.className = "video-controls";
    controls.setAttribute("role", "group");
    controls.setAttribute("aria-label", "Video controls");

    const play = createVideoButton("Play video", "Play", "video-controls__play");
    const back = createVideoButton("Go back 10 seconds", "-10s");
    const forward = createVideoButton("Go forward 10 seconds", "+10s");
    const seek = document.createElement("input");
    seek.className = "video-controls__seek";
    seek.type = "range";
    seek.min = "0";
    seek.max = "1000";
    seek.step = "1";
    seek.value = "0";
    seek.disabled = true;
    seek.setAttribute("aria-label", "Choose video time");
    const time = document.createElement("output");
    time.className = "video-controls__time";
    time.textContent = "0:00 / 0:00";

    const speed = document.createElement("select");
    speed.className = "video-controls__speed";
    speed.setAttribute("aria-label", "Playback speed");
    [0.75, 1, 1.25, 1.5, 2].forEach((rate) => {
      const option = document.createElement("option");
      option.value = String(rate);
      option.textContent = `${rate}x`;
      option.selected = rate === 1;
      speed.append(option);
    });

    const sound = createVideoButton("Enable audio", "Sound on", "video-controls__sound");
    const fullscreen = createVideoButton("Enter full screen", "Full screen", "video-controls__fullscreen");
    fullscreen.dataset.videoFullscreen = "true";
    fullscreen.setAttribute("aria-pressed", "false");
    controls.append(play, back, forward, seek, time, speed, sound, fullscreen);
    host.append(controls);

    const update = () => {
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      const current = Number.isFinite(video.currentTime) ? video.currentTime : 0;
      play.textContent = video.paused ? "Play" : "Pause";
      play.setAttribute("aria-label", video.paused ? "Play video" : "Pause video");
      seek.disabled = duration <= 0;
      seek.value = duration > 0 ? String(Math.round((current / duration) * 1000)) : "0";
      time.textContent = `${formatTime(current)} / ${formatTime(duration)}`;
      sound.textContent = video.muted || video.volume === 0 ? "Sound on" : "Mute";
      sound.setAttribute("aria-label", video.muted || video.volume === 0 ? "Enable audio" : "Mute audio");
      sound.setAttribute("aria-pressed", String(!video.muted && video.volume > 0));
      speed.value = String(video.playbackRate);
    };

    play.addEventListener("click", () => {
      if (video.paused) video.play().catch(() => {});
      else video.pause();
    });
    back.addEventListener("click", () => {
      video.currentTime = Math.max(0, video.currentTime - 10);
      update();
    });
    forward.addEventListener("click", () => {
      const duration = Number.isFinite(video.duration) ? video.duration : video.currentTime + 10;
      video.currentTime = Math.min(duration, video.currentTime + 10);
      update();
    });
    seek.addEventListener("input", () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      video.currentTime = (Number(seek.value) / 1000) * video.duration;
      update();
    });
    speed.addEventListener("change", () => {
      video.playbackRate = Number(speed.value);
      video.play().catch(() => {});
      update();
    });
    sound.addEventListener("click", () => {
      video.muted = !video.muted;
      if (!video.muted) video.volume = 1;
      video.play().catch(() => {});
      update();
    });
    fullscreen.addEventListener("click", () => {
      if (document.fullscreenElement === host) {
        document.exitFullscreen?.().catch(() => {});
      } else if (host.requestFullscreen) {
        host.requestFullscreen().catch(() => {});
      } else if (typeof video.webkitEnterFullscreen === "function") {
        video.webkitEnterFullscreen();
      }
    });

    controls.addEventListener("pointerdown", (event) => event.stopPropagation());
    controls.addEventListener("pointerup", (event) => event.stopPropagation());
    ["loadedmetadata", "durationchange", "timeupdate", "play", "pause", "ended", "volumechange", "ratechange"].forEach((eventName) => {
      video.addEventListener(eventName, update);
    });
    update();
  }

  function initializeVideoControls() {
    document.querySelectorAll("video").forEach(attachVideoControls);
    new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches("video")) attachVideoControls(node);
          node.querySelectorAll?.("video").forEach(attachVideoControls);
        });
      });
    }).observe(stage, { childList: true, subtree: true });
    document.addEventListener("fullscreenchange", syncFullscreenButtons);
  }

  function scaleStage() {
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    const x = (window.innerWidth - 1920 * scale) / 2;
    const y = (window.innerHeight - 1080 * scale) / 2;
    stage.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  }

  function slideFor(page) {
    return slides.find((slide) => Number(slide.dataset.page) === Number(page));
  }

  function stopMedia(slide) {
    slide?.querySelectorAll("video").forEach((video) => {
      video.pause();
      video.removeAttribute("data-playing");
    });
  }

  function playMedia(slide) {
    if (reduceMotion.matches) return;
    slide.querySelectorAll("video[data-case-video]").forEach((video) => {
      const start = Number(video.dataset.start || 0);
      const play = () => {
        const duration = Number.isFinite(video.duration) ? video.duration : start + 1;
        video.currentTime = Math.min(start, Math.max(0, duration - 0.25));
        video.dataset.playing = "true";
        video.play().catch(() => {});
      };

      if (video.readyState >= 1) play();
      else video.addEventListener("loadedmetadata", play, { once: true });
    });
  }

  function setActiveSlide(nextSlide) {
    slides.forEach((slide) => {
      const active = slide === nextSlide;
      slide.classList.toggle("active", active);
      slide.classList.toggle("visible", active);
      slide.setAttribute("aria-hidden", String(!active));
    });
  }

  function showPage(page, updateHash = true) {
    const nextPage = Math.min(slides.length, Math.max(1, Number(page) || 1));
    const previousSlide = slideFor(currentPage);
    const nextSlide = slideFor(nextPage);
    if (!nextSlide || nextSlide === previousSlide) return;

    stopMedia(previousSlide);
    if (nextPage === 6) renderAgentDemo();
    currentPage = nextPage;
    setActiveSlide(nextSlide);
    playMedia(nextSlide);
    if (updateHash && location.hash !== `#${nextPage}`) history.replaceState(null, "", `#${nextPage}`);
  }

  function setMiuOverlay(open, trigger = null) {
    if (!overlay) return;
    returnTarget = open ? trigger || document.activeElement : returnTarget;
    overlay.hidden = !open;
    document.body.classList.toggle("miu-open", open);
    if (open) miuClose?.focus();
    else if (returnTarget instanceof HTMLElement) returnTarget.focus({ preventScroll: true });
  }

  miuTriggers.forEach((trigger) => trigger.addEventListener("click", () => setMiuOverlay(true, trigger)));
  miuClose?.addEventListener("click", () => setMiuOverlay(false));
  overlay?.addEventListener("click", (event) => {
    if (event.target === overlay) setMiuOverlay(false);
  });

  window.addEventListener("runda:agent-open", (event) => {
    if (!event.detail?.product) return;
    window.__rundaActiveAgent = event.detail.product;
    renderAgentDemo(event.detail.product);
    showPage(6);
  });

  document.addEventListener("keydown", (event) => {
    if (event.shiftKey && event.key.toLowerCase() === "m") {
      event.preventDefault();
      setMiuOverlay(true);
      return;
    }

    if (!overlay.hidden) {
      if (event.key === "Escape") setMiuOverlay(false);
      return;
    }

    if (document.fullscreenElement) return;

    if (event.target.closest("a, button, input, select, textarea, .atlas-matrix")) return;
    if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(event.key)) {
      event.preventDefault();
      showPage(currentPage + 1);
    }
    if (["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key)) {
      event.preventDefault();
      showPage(currentPage - 1);
    }
    if (event.key === "Home") showPage(1);
    if (event.key === "End") showPage(slides.length);
  });

  window.addEventListener("wheel", (event) => {
    if (wheelLocked || !overlay.hidden || Math.abs(event.deltaY) < 24) return;
    wheelLocked = true;
    showPage(currentPage + (event.deltaY > 0 ? 1 : -1));
    window.setTimeout(() => { wheelLocked = false; }, 360);
  }, { passive: true });

  stage.addEventListener("pointerdown", (event) => {
    if (event.target.closest("a, button, input, select, video, .atlas-matrix")) return;
    pointerStart = { x: event.clientX, y: event.clientY, type: event.pointerType };
  });

  stage.addEventListener("pointerup", (event) => {
    if (!pointerStart || event.target.closest("a, button, input, select, video, .atlas-matrix")) {
      pointerStart = null;
      return;
    }
    const deltaX = event.clientX - pointerStart.x;
    const deltaY = event.clientY - pointerStart.y;
    const type = pointerStart.type;
    pointerStart = null;
    if (type === "touch" && Math.abs(deltaX) > 70 && Math.abs(deltaX) > Math.abs(deltaY)) showPage(currentPage + (deltaX < 0 ? 1 : -1));
  });

  window.addEventListener("hashchange", () => showPage(Number(location.hash.slice(1)) || 1, false));
  window.addEventListener("resize", scaleStage, { passive: true });

  scaleStage();
  initializeVideoControls();
  renderAgentDemo();
  currentPage = Math.min(slides.length, Math.max(1, Number(location.hash.slice(1)) || 1));
  setActiveSlide(slideFor(currentPage));
  playMedia(slideFor(currentPage));
  if (new URLSearchParams(location.search).get("miu") === "1") setMiuOverlay(true);

  window.__rundaDeck = { get currentPage() { return currentPage; }, get slideCount() { return slides.length; }, showPage };
})();
