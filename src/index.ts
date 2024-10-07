import LOTTIE_fixFilters from "./fixFilters.js";
import LOTTIE_prepare from "./prepare.js";
import parseProperties from "./properties.js";
import { isLoaded } from "./utils.js";

declare global {
  interface Window {
    Webflow: any;
    WEBFLOW_LOTTIE_LIST: any[];
  }
}

// Default Properties:
window["WEBFLOW_LOTTIE_LIST"] = [];

export default function optimizeLottie(properties?: {
  targetAll?: boolean;
  lazyLoadOffset?: string;
}) {
  // Core Properties:
  const TARGET_ALL_LOTTIE = properties?.targetAll ?? true;
  const LAZY_LOAD_OFFSET = properties?.lazyLoadOffset ?? "1250px";

  // Observer for lazy loading elements:
  const ViewOffsetObserver = new IntersectionObserver(
    (entries) => entries.forEach((entry) => LOTTIE_handleLoad(entry)),
    { root: null, rootMargin: LAZY_LOAD_OFFSET }
  );

  // Observer for lazy playing elements:
  const ViewObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        if (element.style.display !== "none" && isLoaded(element))
          LOTTIE_handlePlay(entry);
      }),
    { root: null, rootMargin: "0px" }
  );

  // Apply logic to all lottie elements:
  (
    document.querySelectorAll(
      '[data-animation-type="lottie"]'
    ) as NodeListOf<HTMLElement>
  ).forEach((element, index) => {
    const properties = parseProperties(element);
    if (!TARGET_ALL_LOTTIE && !properties) return;

    element.setAttribute("webflow-lottie-index", index.toString());

    if (properties?.fixFilters) LOTTIE_fixFilters(element);

    if (properties?.lazyLoad) {
      LOTTIE_prepare(element, properties);
      ViewOffsetObserver.observe(element);
      ViewObserver.observe(element);
    }
  });

  // ----

  function LOTTIE_handlePlay(entry: IntersectionObserverEntry) {
    const element = entry.target as HTMLElement;
    const index = element.getAttribute("webflow-lottie-index") || "";
    const properties = parseProperties(element);

    const isInView = entry.isIntersecting;

    const lottie = window["WEBFLOW_LOTTIE_LIST"][parseInt(index)];
    if (isInView) lottie.play();
    else lottie.stop();

    if (isInView && properties?.playOnce) ViewObserver.unobserve(element);
  }

  function LOTTIE_handleLoad(entry: IntersectionObserverEntry) {
    const element = entry.target as HTMLElement;
    const flag =
      entry.isIntersecting &&
      !isLoaded(element) &&
      element.style.display !== "none";
    if (!flag) return;

    const index = parseInt(element.getAttribute("webflow-lottie-index") || "");
    const properties = parseProperties(element);
    element.setAttribute("data-animation-type", "lottie");

    // @ts-expect-error
    const lottie = Webflow.require("lottie").createInstance(element);
    window["WEBFLOW_LOTTIE_LIST"][index] = lottie;

    const mutationObserver = new MutationObserver(() => {
      // ? Remove this line if your SVG changes or is removed and inserted:
      mutationObserver.disconnect();
      if (properties?.fixFilters) LOTTIE_fixFilters(element);
      if (properties?.fixTransform) element.style.position = "relative";
      element.querySelector("img")?.remove();
    });
    mutationObserver.observe(element, { childList: true, subtree: true });

    const isInView = !(
      entry.boundingClientRect.bottom < 0 ||
      entry.boundingClientRect.top -
        Math.max(document.documentElement.clientHeight, window.innerHeight) >=
        0
    );
    if (isInView) LOTTIE_handlePlay(entry);

    ViewOffsetObserver.unobserve(element);
  }
}
