export type Properties = {
  fixFilters: boolean;
  lazyLoad: boolean;
  playOnce: boolean;
  placeholder: string | undefined;
  fixTransform: boolean;
};

export default function parseProperties(element: HTMLElement) {
  const properties = (element.getAttribute("webflow-lottie") || "").split(" ");
  if (properties.length <= 0) return undefined;
  return {
    fixFilters:
      element.hasAttribute("fix-filters") || properties.includes("fix-filters"),
    lazyLoad:
      element.hasAttribute("lazy-load") || properties.includes("lazy-load"),
    playOnce:
      element.hasAttribute("play-once") || properties.includes("play-once"),
    placeholder:
      element.hasAttribute("placeholder") || properties.includes("placeholder")
        ? element.getAttribute("placeholder") || undefined
        : undefined,
    fixTransform:
      element.hasAttribute("fix-transform") ||
      properties.includes("fix-transform"),
  } satisfies Properties;
}
