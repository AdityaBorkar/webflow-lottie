import FixFilters from "./FixFilters.js";
import SetLazyLoad from "./SetLazyLoad.js";
import {
  parseProperties,
  mergeProperties,
  Properties,
  extractProperties,
} from "./properties.js";
import { isLoaded } from "./utils.js";

export default function init(props: {
  target: string;
  lazyLoadOffset: string;
  defaultProperties: Partial<Properties>;
}) {
  // Observer for lazy loading elements:
  const LazyLoadObserver = new IntersectionObserver(
    (entries) => entries.forEach((entry) => LOTTIE_handleLoad(entry)),
    { root: null, rootMargin: props.lazyLoadOffset }
  );

  // Observer for lazy playing elements:
  const LazyPlayObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        if (element.style.display !== "none" && isLoaded(element))
          LOTTIE_handlePlay(entry);
      }),
    { root: null, rootMargin: "0px" }
  );

  // Apply logic to all lottie elements:
  (document.querySelectorAll(props.target) as NodeListOf<HTMLElement>).forEach(
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

  // ----

  function LOTTIE_handlePlay(entry: IntersectionObserverEntry) {
    const element = entry.target as HTMLElement;
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

  function LOTTIE_handleLoad(entry: IntersectionObserverEntry) {
    const element = entry.target as HTMLElement;
    const flag =
      entry.isIntersecting &&
      !isLoaded(element) &&
      element.style.display !== "none";
    if (!flag) return;

    const index = element.getAttribute("webflow-lottie-index") || "";
    const properties = mergeProperties(
      props.defaultProperties,
      parseProperties(...extractProperties(element))
    );
    element.setAttribute("data-animation-type", "lottie");

    // @ts-expect-error
    const lottie = Webflow.require("lottie").createInstance(element);
    window["WebflowLottieList"][index] = lottie;

    const mutationObserver = new MutationObserver(() => {
      // ? Remove this line if your SVG changes or is removed and inserted:
      mutationObserver.disconnect();
      if (properties?.fixFilters) FixFilters(element);
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

    LazyLoadObserver.unobserve(element);
  }
}
