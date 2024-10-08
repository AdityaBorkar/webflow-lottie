export default function SetLazyLoad(
  element: HTMLElement,
  placeholder?: string
) {
  // Set lazy load:
  element.setAttribute("data-animation-type", "lazy-lottie");
  element.style.overflow = "hidden";

  // Set placeholder:
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
