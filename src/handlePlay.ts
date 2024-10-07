export default function LOTTIE_handlePlay(
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver
) {
  const element = entry.target as HTMLElement;
  const properties = (element.getAttribute("webflow-lottie") || "").split(" ");

  const isInView = entry.isIntersecting;

  element.dataset.state = isInView ? "playing" : "paused";
  element.dataset.loop = isInView ? element.dataset.defaultLoop : "0";
  element.dataset.autoplay = isInView ? element.dataset.defaultAutoplay : "0";
  element.dataset.duration = isInView
    ? element.dataset.defaultDuration
    : "0.01";

  element.querySelectorAll("filter")?.forEach((filter) => {
    filter.setAttribute("x", "-50%");
    filter.setAttribute("y", "-50%");
    filter.setAttribute("width", "200%");
    filter.setAttribute("height", "200%");
  });

  // @ts-expect-error
  Webflow.require("lottie").createInstance(element);

  if (
    isInView &&
    (element.hasAttribute("play-once") || properties.includes("play-once"))
  )
    observer.unobserve(element);
}
