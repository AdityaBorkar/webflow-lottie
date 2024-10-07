export function isLoaded(element: HTMLElement) {
  return (
    element.children.length &&
    (element.children[0].tagName.toLowerCase() === "svg" ||
      element.children[0].tagName.toLowerCase() === "canvas")
  );
}
