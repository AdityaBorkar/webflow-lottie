import { Properties } from "./properties.js";

export default function LOTTIE_prepare(
  element: HTMLElement,
  properties: Properties
) {
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
