import LOTTIE_handlePlay from "./handlePlay.js";
import { isLoaded } from "./utils.js";

export default function LOTTIE_handleLoad(
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver,
  playObserver: IntersectionObserver
) {
  const element = entry.target as HTMLElement;
  const properties = (element.getAttribute("webflow-lottie") || "").split(" ");

  const flag =
    entry.isIntersecting &&
    !isLoaded(element) &&
    element.style.display !== "none";
  if (!flag) return;

  element.dataset.animationType = "lottie";
  element.dataset.src = element.dataset.defaultSrc;

  // @ts-expect-error
  Webflow.require("lottie").createInstance(element);

  if (
    element.hasAttribute("fix-transform") ||
    properties.includes("fix-transform")
  )
    element.style.position = "relative";

  element.querySelector("img")?.remove();

  const isInView = !(
    entry.boundingClientRect.bottom < 0 ||
    entry.boundingClientRect.top -
      Math.max(document.documentElement.clientHeight, window.innerHeight) >=
      0
  );
  if (isInView) LOTTIE_handlePlay(entry, playObserver);
  observer.unobserve(element);
}
