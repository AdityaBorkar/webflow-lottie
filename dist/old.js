// src/fixFilters.ts
function LOTTIE_fixFilters(element) {
  element.querySelectorAll("filter").forEach((filter) => {
    filter.setAttribute("x", "-50%");
    filter.setAttribute("y", "-50%");
    filter.setAttribute("width", "200%");
    filter.setAttribute("height", "200%");
  });
}

// src/handlePlay.ts
function LOTTIE_handlePlay(entry, observer) {
  const element = entry.target;
  const index = element.getAttribute("webflow-lottie-index") || "";
  const properties = (element.getAttribute("webflow-lottie") || "").split(" ");
  const isInView = entry.isIntersecting;
  const lottie = window["WEBFLOW_LOTTIE_LIST"][parseInt(index)];
  if (isInView) lottie.play();
  else lottie.stop();
  if (
    isInView &&
    (element.hasAttribute("play-once") || properties.includes("play-once"))
  )
    observer.unobserve(element);
}

// src/utils.ts
function isLoaded(element) {
  return (
    element.children.length &&
    (element.children[0].tagName.toLowerCase() === "svg" ||
      element.children[0].tagName.toLowerCase() === "canvas")
  );
}

// src/handleLoad.ts
function LOTTIE_handleLoad(entry, observer, playObserver) {
  const element = entry.target;
  const flag =
    entry.isIntersecting &&
    !isLoaded(element) &&
    element.style.display !== "none";
  if (!flag) return;
  const index = parseInt(element.getAttribute("webflow-lottie-index") || "");
  const properties = (element.getAttribute("webflow-lottie") || "").split(" ");
  element.setAttribute("data-animation-type", "lottie");
  const lottie = Webflow.require("lottie").createInstance(element);
  window["WEBFLOW_LOTTIE_LIST"][index] = lottie;
  const mutationObserver = new MutationObserver(() => {
    mutationObserver.disconnect();
    if (
      element.hasAttribute("fix-filters") ||
      properties.includes("fix-filters")
    )
      LOTTIE_fixFilters(element);
    if (
      element.hasAttribute("fix-transform") ||
      properties.includes("fix-transform")
    )
      element.style.position = "relative";
  });
  mutationObserver.observe(element, { childList: true, subtree: true });
  element.querySelector("img")?.remove();
  const isInView = !(
    entry.boundingClientRect.bottom < 0 ||
    entry.boundingClientRect.top -
      Math.max(document.documentElement.clientHeight, window.innerHeight) >=
      0
  );
  if (isInView) {
    LOTTIE_handlePlay(entry, playObserver);
  }
  observer.unobserve(element);
}

// src/prepare.ts
function LOTTIE_prepare(element, properties) {
  element.setAttribute("data-animation-type", "lazy-lottie");
  element.style.overflow = "hidden";
  if (element.hasAttribute("placeholder")) {
    if (element.style.position !== "absolute")
      element.style.position = "relative";
    const src = element.getAttribute("placeholder");
    const placeholder = document.createElement("img");
    placeholder.setAttribute("src", src || "");
    placeholder.setAttribute("loading", "eager");
    placeholder.setAttribute("aria-hidden", "true");
    placeholder.setAttribute(
      "style",
      "position:absolute;left:50%;transform:translate(-50%,-50%);"
    );
    element.appendChild(placeholder);
  }
  if (
    element.hasAttribute("fix-transform") ||
    properties.includes("fix-transform")
  ) {
    element.style.top = "0px";
    element.style.left = "0px";
    element.style.position = "absolute";
  }
}

// src/index.ts
var TARGET_ALL_LOTTIE = true;
var LAZY_LOAD_MARGIN_PX = 1250;
var lazyLottiePlayer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      const element = entry.target;
      if (element.style.display !== "none" && isLoaded(element))
        LOTTIE_handlePlay(entry, lazyLottiePlayer);
    }),
  { root: null, rootMargin: "0px" }
);
var lazyLottieLoader = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) =>
      LOTTIE_handleLoad(entry, lazyLottieLoader, lazyLottiePlayer)
    ),
  { root: null, rootMargin: `${LAZY_LOAD_MARGIN_PX}px` }
);
window["WEBFLOW_LOTTIE_LIST"] = [];
var LOTTIE_WRAPPER_LIST = Array.from(
  document.querySelectorAll('[data-animation-type="lottie"]')
);
LOTTIE_WRAPPER_LIST.forEach((element, index) => {
  const properties = (element.getAttribute("webflow-lottie") || "").split(" ");
  if (!TARGET_ALL_LOTTIE && !properties.length) return;
  element.setAttribute("webflow-lottie-index", index.toString());
  if (element.hasAttribute("fix-filters") || properties.includes("fix-filters"))
    LOTTIE_fixFilters(element);
  if (element.hasAttribute("lazy-load") || properties.includes("lazy-load")) {
    LOTTIE_prepare(element, properties);
    lazyLottieLoader.observe(element);
    lazyLottiePlayer.observe(element);
  }
});
