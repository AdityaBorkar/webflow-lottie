export default function debounce(func: Function, delay: number) {
  let debounceTimer: any;
  return function () {
    // @ts-expect-error
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
}
