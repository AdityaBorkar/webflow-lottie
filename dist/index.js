// src/FixFilters.ts
function FixFilters(element) {
  element.querySelectorAll("filter").forEach((filter) => {
    filter.setAttribute("x", "-50%");
    filter.setAttribute("y", "-50%");
    filter.setAttribute("width", "200%");
    filter.setAttribute("height", "200%");
  });
}

// src/SetLazyLoad.ts
function SetLazyLoad(element, placeholder) {
  element.setAttribute("data-animation-type", "lazy-lottie");
  element.style.overflow = "hidden";
  if (placeholder) {
    if (element.style.position !== "absolute")
      element.style.position = "relative";
    const PlaceholderEl = document.createElement("img");
    PlaceholderEl.setAttribute("src", placeholder || "");
    PlaceholderEl.setAttribute("loading", "eager");
    PlaceholderEl.setAttribute("aria-hidden", "true");
    PlaceholderEl.setAttribute(
      "style",
      "position:absolute;left:50%;transform:translate(-50%,-50%);"
    );
    element.appendChild(PlaceholderEl);
  }
}

// src/properties.ts
var ValidProperties = [
  "lazyLoad",
  "playOnce",
  "fixFilters",
  "fixTransform",
  "placeholder"
];
function extractProperties(element) {
  const properties = element.getAttribute("webflow-lottie") || "";
  const placeholder = element.getAttribute("placeholder") || "";
  return [properties, placeholder];
}
function parseProperties(property, placeholder) {
  let properties = {};
  property.split(" ").forEach((property2) => {
    const negation = property2.startsWith("no-");
    const name = negation ? property2.slice(3) : property2;
    if (ValidProperties.includes(name)) properties[name] = !negation;
  });
  if (placeholder) properties["placeholder"] = placeholder;
  return properties;
}
function mergeProperties(...properties) {
  return properties.reduce((oldProp, newProp) => {
    return { ...oldProp, ...newProp };
  }, {});
}

// src/utils.ts
function isLoaded(element) {
  return element.children.length && (element.children[0].tagName.toLowerCase() === "svg" || element.children[0].tagName.toLowerCase() === "canvas");
}

// src/init.ts
function init(props) {
  const LazyLoadObserver = new IntersectionObserver(
    (entries) => entries.forEach((entry) => LOTTIE_handleLoad(entry)),
    { root: null, rootMargin: props.lazyLoadOffset }
  );
  const LazyPlayObserver = new IntersectionObserver(
    (entries) => entries.forEach((entry) => {
      const element = entry.target;
      if (element.style.display !== "none" && isLoaded(element))
        LOTTIE_handlePlay(entry);
    }),
    { root: null, rootMargin: "0px" }
  );
  document.querySelectorAll(props.target).forEach(
    (element, index) => {
      const properties = mergeProperties(
        props.defaultProperties,
        parseProperties(...extractProperties(element))
      );
      element.setAttribute("webflow-lottie-index", (index + 1).toString());
      if (properties?.fixFilters) FixFilters(element);
      if (properties?.fixTransform) {
        element.style.top = "0px";
        element.style.left = "0px";
        element.style.position = "absolute";
      }
      if (properties?.lazyLoad) {
        SetLazyLoad(element, properties.placeholder);
        LazyLoadObserver.observe(element);
        LazyPlayObserver.observe(element);
      }
    }
  );
  function LOTTIE_handlePlay(entry) {
    const element = entry.target;
    const index = element.getAttribute("webflow-lottie-index") || "";
    const properties = mergeProperties(
      props.defaultProperties,
      parseProperties(...extractProperties(element))
    );
    const isInView = entry.isIntersecting;
    const lottie = window["WebflowLottieList"][index];
    if (isInView) lottie.play();
    else lottie.stop();
    if (isInView && properties?.playOnce) LazyPlayObserver.unobserve(element);
  }
  function LOTTIE_handleLoad(entry) {
    const element = entry.target;
    const flag = entry.isIntersecting && !isLoaded(element) && element.style.display !== "none";
    if (!flag) return;
    const index = element.getAttribute("webflow-lottie-index") || "";
    const properties = mergeProperties(
      props.defaultProperties,
      parseProperties(...extractProperties(element))
    );
    element.setAttribute("data-animation-type", "lottie");
    const lottie = Webflow.require("lottie").createInstance(element);
    window["WebflowLottieList"][index] = lottie;
    const mutationObserver = new MutationObserver(() => {
      mutationObserver.disconnect();
      if (properties?.fixFilters) FixFilters(element);
      if (properties?.fixTransform) element.style.position = "relative";
      element.querySelector("img")?.remove();
    });
    mutationObserver.observe(element, { childList: true, subtree: true });
    const isInView = !(entry.boundingClientRect.bottom < 0 || entry.boundingClientRect.top - Math.max(document.documentElement.clientHeight, window.innerHeight) >= 0);
    if (isInView) LOTTIE_handlePlay(entry);
    LazyLoadObserver.unobserve(element);
  }
}

// src/index.ts
window["WebflowLottieList"] = [];
var script = document.querySelector("#webflow-lottie");
init({
  target: script.getAttribute("target") || "[data-animation-type='lottie']",
  lazyLoadOffset: script.getAttribute("lazy-load-offset") || "125vh",
  defaultProperties: parseProperties(
    script.getAttribute("default-attributes") || ""
  )
});
