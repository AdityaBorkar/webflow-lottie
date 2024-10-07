export default function LOTTIE_prepare(element: HTMLElement) {
  const properties = (element.getAttribute("webflow-lottie") || "").split(" ");

  element.dataset.defaultSrc = element.dataset.src;
  element.dataset.defaultLoop = element.dataset.loop;
  element.dataset.defaultAutoplay = element.dataset.autoplay;
  element.dataset.state = "paused";
  element.dataset.src = "";
  element.dataset.loop = "0";
  element.dataset.animationType = "lazy-lottie";
  element.dataset.duration = element.dataset?.duration || "0.01";
  element.dataset.autoplay = "0";
  element.style.overflow = "hidden";

  if (element.hasAttribute("placeholder")) {
    if (element.style.position !== "absolute")
      element.style.position = "relative";
    element.appendChild(
      Object.assign(document.createElement("img"), {
        src: element.getAttribute("placeholder"),
        loading: "eager",
        ariaHidden: "true",
        style: "position:absolute;left:50%;transform:translate(-50%,-50%);",
      })
    );
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
