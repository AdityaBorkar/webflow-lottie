// src/fixFilters.ts
function LOTTIE_fixFilters(element) {
  element.querySelectorAll("filter").forEach((filter) => {
    filter.setAttribute("x", "-50%");
    filter.setAttribute("y", "-50%");
    filter.setAttribute("width", "200%");
    filter.setAttribute("height", "200%");
  });
}

// src/prepare.ts
function LOTTIE_prepare(element, properties) {
  element.setAttribute("data-animation-type", "lazy-lottie");
  element.style.overflow = "hidden";
  if (properties.placeholder) {
    if (element.style.position !== "absolute")
      element.style.position = "relative";
    const placeholder = document.createElement("img");
    placeholder.setAttribute("src", properties.placeholder || "");
    placeholder.setAttribute("loading", "eager");
    placeholder.setAttribute("aria-hidden", "true");
    placeholder.setAttribute(
      "style",
      "position:absolute;left:50%;transform:translate(-50%,-50%);"
    );
    element.appendChild(placeholder);
  }
  if (properties.fixTransform) {
    element.style.top = "0px";
    element.style.left = "0px";
    element.style.position = "absolute";
  }
}

// src/properties.ts
function parseProperties(element) {
  const properties = (element.getAttribute("webflow-lottie") || "").split(" ");
  if (properties.length <= 0) return void 0;
  return {
    fixFilters: element.hasAttribute("fix-filters") || properties.includes("fix-filters"),
    lazyLoad: element.hasAttribute("lazy-load") || properties.includes("lazy-load"),
    playOnce: element.hasAttribute("play-once") || properties.includes("play-once"),
    placeholder: element.hasAttribute("placeholder") || properties.includes("placeholder") ? element.getAttribute("placeholder") || void 0 : void 0,
    fixTransform: element.hasAttribute("fix-transform") || properties.includes("fix-transform")
  };
}

// src/utils.ts
function isLoaded(element) {
  return element.children.length && (element.children[0].tagName.toLowerCase() === "svg" || element.children[0].tagName.toLowerCase() === "canvas");
}

// src/index.ts
window["WEBFLOW_LOTTIE_LIST"] = [];
function optimizeLottie(properties) {
  const TARGET_ALL_LOTTIE = properties?.targetAll ?? true;
  const LAZY_LOAD_OFFSET = properties?.lazyLoadOffset ?? "1250px";
  const ViewOffsetObserver = new IntersectionObserver(
    (entries) => entries.forEach((entry) => LOTTIE_handleLoad(entry)),
    { root: null, rootMargin: LAZY_LOAD_OFFSET }
  );
  const ViewObserver = new IntersectionObserver(
    (entries) => entries.forEach((entry) => {
      const element = entry.target;
      if (element.style.display !== "none" && isLoaded(element))
        LOTTIE_handlePlay(entry);
    }),
    { root: null, rootMargin: "0px" }
  );
  document.querySelectorAll(
    '[data-animation-type="lottie"]'
  ).forEach((element, index) => {
    const properties2 = parseProperties(element);
    if (!TARGET_ALL_LOTTIE && !properties2) return;
    element.setAttribute("webflow-lottie-index", index.toString());
    if (properties2?.fixFilters) LOTTIE_fixFilters(element);
    if (properties2?.lazyLoad) {
      LOTTIE_prepare(element, properties2);
      ViewOffsetObserver.observe(element);
      ViewObserver.observe(element);
    }
  });
  function LOTTIE_handlePlay(entry) {
    const element = entry.target;
    const index = element.getAttribute("webflow-lottie-index") || "";
    const properties2 = parseProperties(element);
    const isInView = entry.isIntersecting;
    const lottie = window["WEBFLOW_LOTTIE_LIST"][parseInt(index)];
    if (isInView) lottie.play();
    else lottie.stop();
    if (isInView && properties2?.playOnce) ViewObserver.unobserve(element);
  }
  function LOTTIE_handleLoad(entry) {
    const element = entry.target;
    const flag = entry.isIntersecting && !isLoaded(element) && element.style.display !== "none";
    if (!flag) return;
    const index = parseInt(element.getAttribute("webflow-lottie-index") || "");
    const properties2 = parseProperties(element);
    element.setAttribute("data-animation-type", "lottie");
    const lottie = Webflow.require("lottie").createInstance(element);
    window["WEBFLOW_LOTTIE_LIST"][index] = lottie;
    const mutationObserver = new MutationObserver(() => {
      mutationObserver.disconnect();
      if (properties2?.fixFilters) LOTTIE_fixFilters(element);
      if (properties2?.fixTransform) element.style.position = "relative";
      element.querySelector("img")?.remove();
    });
    mutationObserver.observe(element, { childList: true, subtree: true });
    const isInView = !(entry.boundingClientRect.bottom < 0 || entry.boundingClientRect.top - Math.max(document.documentElement.clientHeight, window.innerHeight) >= 0);
    if (isInView) LOTTIE_handlePlay(entry);
    ViewOffsetObserver.unobserve(element);
  }
}
export {
  optimizeLottie as default
};
