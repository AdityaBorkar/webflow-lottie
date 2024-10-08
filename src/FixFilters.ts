export default function FixFilters(element: HTMLElement) {
  element.querySelectorAll("filter").forEach((filter) => {
    filter.setAttribute("x", "-50%");
    filter.setAttribute("y", "-50%");
    filter.setAttribute("width", "200%");
    filter.setAttribute("height", "200%");
  });
}
