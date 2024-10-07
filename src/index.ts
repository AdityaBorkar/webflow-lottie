import LOTTIE_handleLoad from "./handleLoad.js";
import LOTTIE_handlePlay from "./handlePlay.js";
import LOTTIE_prepare from "./prepare.js";
import { isLoaded } from "./utils.js";

// Default Properties:
const LAZY_LOAD_MARGIN_PX = 1250;

// Observer for lazy loading elements:
const lazyLottieLoader = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) =>
      LOTTIE_handleLoad(entry, lazyLottieLoader, lazyLottiePlayer)
    ),
  { root: null, rootMargin: `${LAZY_LOAD_MARGIN_PX}px` }
);

// Observer for lazy playing elements:
const lazyLottiePlayer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      const element = entry.target as HTMLElement;
      if (element.style.display !== "none" && isLoaded(element))
        LOTTIE_handlePlay(entry, lazyLottiePlayer);
    }),
  { root: null, rootMargin: "0px" }
);

// Apply properties:
const LOTTIE_LIST = document.querySelectorAll(
  "[webflow-lottie]"
) as NodeListOf<HTMLElement>;
if (LOTTIE_LIST.length) {
  LOTTIE_LIST.forEach((element) => {
    const properties = (element.getAttribute("webflow-lottie") || "").split(
      " "
    );

    if (
      element.hasAttribute("fix-filters") ||
      properties.includes("fix-filters")
    ) {
      element.querySelectorAll("filter")?.forEach((filter) => {
        filter.setAttribute("x", "-50%");
        filter.setAttribute("y", "-50%");
        filter.setAttribute("width", "200%");
        filter.setAttribute("height", "200%");
      });
    }

    if (element.hasAttribute("lazy-load") || properties.includes("lazy-load")) {
      LOTTIE_prepare(element);
      lazyLottieLoader.observe(element);
      lazyLottiePlayer.observe(element);
    }
  });
}

// TODO - INSPECT FOR DURATION AND FINAL PUBLISH AND CHECK
