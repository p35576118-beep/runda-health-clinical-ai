(() => {
  "use strict";

  const families = {
    before: {
      number: "01",
      short: "Before the visit",
      eyebrow: "Two jobs before care begins",
      title: "Understand the patient before the visit begins.",
      description: "Ask the right questions early and keep risk, screening and follow-up connected.",
      products: ["ai-pre-consultation", "breast-health"]
    },
    during: {
      number: "02",
      short: "During care",
      eyebrow: "Four jobs while care is happening",
      title: "Give clinicians a clearer view during care.",
      description: "Organize the record, draft the note, find quality issues and surface cardiac risk.",
      products: ["cdsa", "medical-record-generation", "medical-record-quality", "heartengine"]
    },
    after: {
      number: "03",
      short: "After discharge",
      eyebrow: "One job after discharge",
      title: "Help patients understand what happens next.",
      description: "Turn approved health information into plain-language guidance patients can follow.",
      products: ["ai-health-assistant"]
    }
  };

  const products = {
    "ai-pre-consultation": {
      name: "AI Pre-Consultation",
      type: "Ask before the visit",
      summary: "Asks adaptive questions before the visit, then gives the clinician a structured summary.",
      input: "What the patient says and approved history",
      intelligence: "Asks the next useful question",
      value: "A clear summary before the visit",
      visual: "A guided conversation that becomes clearer with each answer.",
      demo: {
        lead: "Ask earlier.",
        emphasis: "Arrive prepared.",
        description: "Guide the patient through adaptive questions before the visit, then hand the clinician a structured summary.",
        proofTitle: "One interview. Four proof actions.",
        steps: ["Capture the patient's concern", "Ask the next useful question", "Structure risk and history", "Deliver a clinician-ready summary"],
        note: "The interview adapts to each answer while the clinician stays in control.",
        href: "https://demo-ma-003.huihaohealth.com/pc-cdx/#/app-portal?key=pre-inquiry",
        linkText: "Open live demo"
      },
      media: {
        src: "./assets/meeting-media/atlas-ai-pre-consultation.jpg",
        video: "./assets/meeting-media/ai-pre-consultation.mp4",
        start: 18,
        alt: "AI Pre-Consultation adaptive patient interview interface"
      }
    },
    "breast-health": {
      name: "Breast Health",
      type: "Connect screening",
      summary: "Keeps risk, screening results and follow-up together instead of losing them across visits.",
      input: "Risk factors, family history and reports",
      intelligence: "Connects risk, screening and follow-up",
      value: "One continuous health pathway",
      visual: "Risk assessment becomes a personalized follow-up plan.",
      demo: {
        lead: "Connect risk.",
        emphasis: "Keep follow-up moving.",
        description: "Bring family history, screening results and risk factors into one clinician-reviewed pathway.",
        proofTitle: "One pathway. Four proof actions.",
        steps: ["Collect family and risk history", "Review screening evidence", "Stratify the next risk signal", "Define the follow-up path"],
        note: "Screening becomes a connected care plan instead of a single result.",
        linkText: "Open product video"
      },
      media: {
        src: "./assets/meeting-media/breast-health-poster.jpg",
        video: "./assets/meeting-media/breast-health.mp4",
        start: 18,
        treatment: "portrait",
        alt: "Breast Health risk assessment and follow-up interface"
      }
    },
    cdsa: {
      name: "CDSA",
      type: "See the full record",
      summary: "Brings years of scattered records into one view and keeps every conclusion linked to evidence.",
      input: "Records, tests, medications and history",
      intelligence: "Connects the facts without hiding the source",
      value: "One traceable clinical view",
      visual: "Longitudinal records become one traceable review surface.",
      demo: {
        lead: "Years of records.",
        emphasis: "One traceable view.",
        description: "Bring fragmented histories, tests and medications into a reviewable timeline with every conclusion linked to evidence.",
        proofTitle: "One record. Four proof actions.",
        steps: ["Gather the longitudinal record", "Normalize the clinical facts", "Connect the timeline", "Return a source-linked view"],
        note: "The clinician can inspect the evidence behind every useful conclusion.",
        href: "https://demo-ma-003.huihaohealth.com/mdt/",
        linkText: "Open live demo"
      },
      media: {
        src: "./assets/meeting-media/cdsa-poster.jpg",
        video: "./assets/meeting-media/cdsa.mp4",
        start: 45,
        alt: "CDSA longitudinal clinical record analysis interface"
      }
    },
    "medical-record-generation": {
      name: "Medical Record Generation",
      type: "Draft the note",
      summary: "Turns the consultation and approved data into an editable draft for clinician review and sign-off.",
      input: "The consultation and approved data",
      intelligence: "Builds a structured draft from available facts",
      value: "Less writing, with clinician ownership intact",
      visual: "The consultation becomes an editable clinical draft.",
      demo: {
        lead: "AI drafts.",
        emphasis: "The clinician reviews and signs.",
        description: "Turn the consultation into a clinician-ready draft without changing clinical accountability.",
        proofTitle: "One workflow. Four proof actions.",
        steps: ["Capture the consultation", "Structure the clinical facts", "Create an editable draft", "Review, edit and sign"],
        note: "The draft stays editable and requires clinician review and signature.",
        href: "https://demo-ma-msa.huihaohealth.com/msa/doctor/pc/medical-record-generate/#/emr-demo",
        linkText: "Open live demo"
      },
      media: {
        src: "./assets/meeting-media/medical-record-generation-poster.jpg",
        video: "./assets/meeting-media/medical-record-generation.mp4",
        start: 18,
        treatment: "cropped",
        alt: "Medical Record Generation clinician drafting interface"
      }
    },
    "medical-record-quality": {
      name: "Medical Record Quality",
      type: "Check the record",
      summary: "Finds missing, conflicting or non-compliant information while the record can still be corrected.",
      input: "The open record, local rules and context",
      intelligence: "Shows each issue with its reason",
      value: "Specific corrections before the record closes",
      visual: "Each issue is shown with its reason and a correction path.",
      demo: {
        lead: "Find the issue.",
        emphasis: "Correct it in time.",
        description: "Check omissions, conflicts and local rules while the record can still be corrected before sign-off.",
        proofTitle: "One open record. Four proof actions.",
        steps: ["Read the open clinical record", "Apply local quality rules", "Show each issue and reason", "Confirm correction before close"],
        note: "Quality control is specific, explainable and close to the moment of correction.",
        linkText: "Open product video"
      },
      media: {
        src: "./assets/meeting-media/medical-record-quality-poster.jpg",
        video: "./assets/meeting-media/medical-record-quality.mp4",
        start: 18,
        treatment: "cropped",
        alt: "Medical Record Quality issue review interface"
      }
    },
    heartengine: {
      name: "HeartEngine",
      type: "See cardiac risk",
      summary: "Brings symptoms, ECG, biomarkers and history together so high-risk signals are easier to see.",
      input: "Symptoms, ECG, biomarkers and history",
      intelligence: "Surfaces the risk signals in one place",
      value: "A traceable risk view for physician review",
      visual: "Symptoms, biomarkers and ECG signals appear in one risk view.",
      demo: {
        lead: "Bring risk signals together.",
        emphasis: "Act with context.",
        description: "Connect symptoms, ECG, biomarkers and history so high-risk signals are easier to see in time-critical care.",
        proofTitle: "One risk view. Four proof actions.",
        steps: ["Read the presenting symptoms", "Connect ECG and biomarkers", "Stratify the risk signals", "Review the urgent pathway"],
        note: "High-risk alerts remain connected to the facts that support them.",
        linkText: "Open product video"
      },
      media: {
        src: "./assets/meeting-media/heartengine-poster.jpg",
        video: "./assets/meeting-media/heartengine.mp4",
        start: 18,
        treatment: "cropped",
        alt: "HeartEngine cardiac risk analysis interface"
      }
    },
    "ai-health-assistant": {
      name: "AI Health Assistant",
      type: "Explain next steps",
      summary: "Explains approved health information in plain language and makes the next step easier to follow.",
      input: "Patient questions, reports and records",
      intelligence: "Turns clinical language into clear guidance",
      value: "Findings and next steps patients can understand",
      visual: "Approved information becomes clear patient guidance.",
      demo: {
        lead: "Explain the finding.",
        emphasis: "Make next steps clear.",
        description: "Translate approved health information into plain-language guidance patients can understand and follow.",
        proofTitle: "One question. Four proof actions.",
        steps: ["Receive the patient's question", "Retrieve approved context", "Explain the clinical finding", "Guide follow-up or escalation"],
        note: "The assistant makes the next step clearer without replacing clinical judgment.",
        linkText: "Open product video"
      },
      media: {
        src: "./assets/meeting-media/ai-health-assistant-poster.jpg",
        video: "./assets/meeting-media/ai-health-assistant.mp4",
        start: 18,
        treatment: "portrait",
        alt: "AI Health Assistant patient guidance conversation"
      }
    }
  };

  const familyKeys = Object.keys(families);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function initializeMatrix(root) {
    const stageBody = root.querySelector("[data-atlas-stage-body]");
    const showcase = root.querySelector("[data-atlas-product-showcase]");
    const productSelector = root.querySelector("[data-atlas-product-selector]");
    const chapterTabs = [...root.querySelectorAll("[data-atlas-family-tab]")];
    const stepButtons = [...root.querySelectorAll("[data-atlas-chapter-step]")];
    const activeProducts = Object.fromEntries(familyKeys.map((key) => [key, families[key].products[0]]));
    const slide = root.closest(".slide");
    let activeFamily = "before";
    let familyTween = null;
    let productTween = null;
    let pointerStart = null;

    const setText = (selector, value) => {
      const element = root.querySelector(selector);
      if (element) element.textContent = value;
    };

    const swap = (container, update, currentTween, setTween, direction = 1) => {
      currentTween?.kill();
      window.gsap?.killTweensOf(container);

      if (reduceMotion.matches || !window.gsap) {
        update();
        setTween(null);
        return;
      }

      const timeline = gsap.timeline({
        onComplete: () => {
          gsap.set(container, { clearProps: "opacity,visibility,transform" });
          setTween(null);
        }
      });
      setTween(timeline);

      timeline
        .to(container, {
          autoAlpha: 0,
          y: direction * 10,
          duration: 0.14,
          ease: "power2.in",
          force3D: true,
          onComplete: update
        })
        .fromTo(
          container,
          { autoAlpha: 0, y: direction * -10 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.32,
            ease: "power3.out",
            force3D: true
          }
        );
    };

    const productPosition = (productId) => {
      const family = families[activeFamily];
      const index = family.products.indexOf(productId);
      return `${String(index + 1).padStart(2, "0")} / ${String(family.products.length).padStart(2, "0")}`;
    };

    const syncProductMedia = () => {
      const shouldPlay = !reduceMotion.matches && slide?.classList.contains("active");
      root.querySelectorAll("video").forEach((video) => {
        if (video.dataset.atlasReady !== "true") return;
        if (shouldPlay) video.play().catch(() => {});
        else video.pause();
      });
    };

    const createProductVisual = (productId, product) => {
      if (product.media) {
        const media = document.createElement("figure");
        media.className = `product-media${product.media.treatment ? ` product-media--${product.media.treatment}` : ""}`;
        const posterUrl = new URL(product.media.src, document.baseURI).href;
        media.style.setProperty("--media-poster", `url("${posterUrl}")`);
        const image = product.media.video ? document.createElement("video") : document.createElement("img");

        if (product.media.video) {
          const start = Number(product.media.start || 0);
          image.poster = product.media.src;
          image.muted = true;
          image.playsInline = true;
          image.preload = "metadata";
          image.autoplay = false;
          image.dataset.atlasReady = "false";
          image.setAttribute("aria-label", product.media.alt);
          const readyToPlay = () => {
            image.dataset.atlasReady = "true";
            syncProductMedia();
          };
          image.addEventListener("loadedmetadata", () => {
            if (start > 0 && image.duration > start) {
              image.addEventListener("seeked", readyToPlay, { once: true });
              image.currentTime = start;
            } else {
              readyToPlay();
            }
          }, { once: true });
          image.addEventListener("ended", () => {
            image.currentTime = start;
            image.play().catch(() => {});
          });
          image.src = start > 0 ? `${product.media.video}#t=${start}` : product.media.video;
        } else {
          image.src = product.media.src;
          image.alt = product.media.alt;
          image.width = 1280;
          image.height = 720;
          image.decoding = "async";
        }

        const caption = document.createElement("figcaption");
        caption.textContent = product.visual;
        const evidence = document.createElement("span");
        evidence.className = "product-media__evidence";
        evidence.textContent = product.media.video ? "REAL PRODUCT WORKFLOW / VIDEO" : "PRODUCT INTERFACE";
        media.append(image, evidence, caption);
        return media;
      }

      const signal = document.createElement("div");
      signal.className = `signal-visual signal-visual--${productId}`;
      const nodes = document.createElement("div");
      nodes.className = "signal-nodes";
      product.visual.split(" / ").forEach((word, index) => {
        const node = document.createElement("span");
        node.textContent = word;
        node.style.setProperty("--node-index", index);
        nodes.append(node);
      });

      const trace = document.createElement("div");
      trace.className = "signal-trace";
      for (let index = 0; index < 7; index += 1) {
        const bar = document.createElement("i");
        bar.style.setProperty("--bar-index", index);
        trace.append(bar);
      }

      const caption = document.createElement("p");
      const captionLabel = document.createElement("span");
      captionLabel.textContent = "Clinical context";
      const captionProduct = document.createElement("strong");
      captionProduct.textContent = product.name;
      caption.append(captionLabel, captionProduct);
      signal.append(nodes, trace, caption);
      return signal;
    };

    const updateProduct = (productId) => {
      const family = families[activeFamily];
      const product = products[productId];
      if (!product || !family.products.includes(productId)) return;

      activeProducts[activeFamily] = productId;
      window.__rundaActiveAgent = { id: productId, ...product };
      productSelector.querySelectorAll("[data-atlas-product-id]").forEach((button) => {
        const selected = button.dataset.atlasProductId === productId;
        button.classList.toggle("is-active", selected);
        button.setAttribute("aria-selected", String(selected));
        button.tabIndex = selected ? 0 : -1;
      });

      setText("[data-atlas-product-type]", product.type);
      setText("[data-atlas-product-position]", productPosition(productId));
      setText("[data-atlas-product-title]", product.name);
      setText("[data-atlas-product-summary]", product.summary);
      setText("[data-atlas-product-input]", product.input);
      setText("[data-atlas-product-intelligence]", product.intelligence);
      setText("[data-atlas-product-value]", product.value);
      root.querySelector("[data-atlas-product-visual]").replaceChildren(createProductVisual(productId, product));
      syncProductMedia();
    };

    const selectProduct = (productId, animate = true) => {
      if (!products[productId] || !families[activeFamily].products.includes(productId)) return;
      if (!animate) {
        updateProduct(productId);
        return;
      }
      swap(showcase, () => updateProduct(productId), productTween, (value) => { productTween = value; });
    };

    const openProduct = (productId) => {
      const product = products[productId];
      if (!product || !families[activeFamily].products.includes(productId)) return;
      selectProduct(productId);
      window.dispatchEvent(new CustomEvent("runda:agent-open", {
        detail: { product: { id: productId, ...product } }
      }));
    };

    const renderProductSelector = (family) => {
      const buttons = family.products.map((productId, index) => {
        const product = products[productId];
        const button = document.createElement("button");
        button.type = "button";
        button.id = `atlas-product-${productId}-tab`;
        button.dataset.atlasProductId = productId;
        button.setAttribute("role", "tab");
        button.setAttribute("aria-controls", "atlas-product-title");
        const number = document.createElement("span");
        number.textContent = String(index + 1).padStart(2, "0");
        const name = document.createElement("strong");
        name.textContent = product.name;
        const type = document.createElement("small");
        type.textContent = product.type;
        button.append(number, name, type);
        return button;
      });
      productSelector.replaceChildren(...buttons);
    };

    const updateStepButtons = () => {
      const index = familyKeys.indexOf(activeFamily);
      stepButtons.forEach((button) => {
        button.disabled = button.dataset.atlasChapterStep === "previous" ? index === 0 : index === familyKeys.length - 1;
      });
    };

    const updateFamily = (familyKey) => {
      const family = families[familyKey];
      if (!family) return;

      activeFamily = familyKey;
      root.dataset.family = familyKey;
      setText("[data-atlas-chapter-number]", family.number);
      setText("[data-atlas-chapter-short]", family.short);
      setText("[data-atlas-chapter-count]", `${family.products.length} clinical ${family.products.length === 1 ? "agent" : "agents"}`);
      setText("[data-atlas-family-eyebrow]", family.eyebrow);
      setText("[data-atlas-family-title]", family.title);
      setText("[data-atlas-family-description]", family.description);

      chapterTabs.forEach((tab) => {
        const selected = tab.dataset.atlasFamilyTab === familyKey;
        tab.classList.toggle("is-active", selected);
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
      });

      renderProductSelector(family);
      updateProduct(activeProducts[familyKey]);
      updateStepButtons();
    };

    const selectFamily = (familyKey, animate = true) => {
      if (!families[familyKey] || familyKey === activeFamily) return;
      productTween?.kill();
      const direction = familyKeys.indexOf(familyKey) > familyKeys.indexOf(activeFamily) ? 1 : -1;
      if (!animate) {
        updateFamily(familyKey);
        return;
      }
      swap(stageBody, () => updateFamily(familyKey), familyTween, (value) => { familyTween = value; }, direction);
    };

    const stepChapter = (direction) => {
      const currentIndex = familyKeys.indexOf(activeFamily);
      const offset = direction === "previous" ? -1 : 1;
      const next = familyKeys[currentIndex + offset];
      if (next) selectFamily(next);
    };

    chapterTabs.forEach((tab, tabIndex) => {
      tab.addEventListener("click", () => selectFamily(tab.dataset.atlasFamilyTab));
      tab.addEventListener("keydown", (event) => {
        if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        event.stopPropagation();
        let nextIndex = tabIndex;
        if (event.key === "ArrowRight") nextIndex = Math.min(tabIndex + 1, chapterTabs.length - 1);
        if (event.key === "ArrowLeft") nextIndex = Math.max(tabIndex - 1, 0);
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = chapterTabs.length - 1;
        chapterTabs[nextIndex].focus();
        selectFamily(chapterTabs[nextIndex].dataset.atlasFamilyTab);
      });
    });

    productSelector.addEventListener("click", (event) => {
      const button = event.target.closest("[data-atlas-product-id]");
      if (button) openProduct(button.dataset.atlasProductId);
    });

    productSelector.addEventListener("keydown", (event) => {
      if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
      const buttons = [...productSelector.querySelectorAll("[data-atlas-product-id]")];
      const currentIndex = buttons.indexOf(event.target.closest("[data-atlas-product-id]"));
      if (currentIndex < 0) return;
      event.preventDefault();
      event.stopPropagation();
      let nextIndex = currentIndex;
      if (["ArrowDown", "ArrowRight"].includes(event.key)) nextIndex = Math.min(currentIndex + 1, buttons.length - 1);
      if (["ArrowUp", "ArrowLeft"].includes(event.key)) nextIndex = Math.max(currentIndex - 1, 0);
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = buttons.length - 1;
      buttons[nextIndex].focus();
      selectProduct(buttons[nextIndex].dataset.atlasProductId);
    });

    stepButtons.forEach((button) => {
      button.addEventListener("click", () => stepChapter(button.dataset.atlasChapterStep));
    });

    root.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse" || event.target.closest("button, a")) return;
      pointerStart = { x: event.clientX, y: event.clientY };
    });

    root.addEventListener("pointerup", (event) => {
      if (!pointerStart) return;
      const deltaX = event.clientX - pointerStart.x;
      const deltaY = event.clientY - pointerStart.y;
      pointerStart = null;
      if (Math.abs(deltaX) < 56 || Math.abs(deltaX) < Math.abs(deltaY)) return;
      stepChapter(deltaX > 0 ? "previous" : "next");
    });

    updateFamily(activeFamily);
    if (slide) new MutationObserver(syncProductMedia).observe(slide, { attributes: true, attributeFilter: ["class"] });
  }

  document.querySelectorAll("[data-atlas-matrix]").forEach(initializeMatrix);
})();
