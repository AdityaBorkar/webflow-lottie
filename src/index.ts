const LAZY_LOAD_MARGIN_PX = 1250;

const LOTTIE_LIST_FIX_FILTER = document.querySelectorAll(
  '[fix-filters="true"]'
) as NodeListOf<HTMLElement>;

if (LOTTIE_LIST_FIX_FILTER.length) {
  LOTTIE_LIST_FIX_FILTER.forEach((element) => {
    element.querySelectorAll("filter")?.forEach((filter) => {
      filter.setAttribute("x", "-50%");
      filter.setAttribute("y", "-50%");
      filter.setAttribute("width", "200%");
      filter.setAttribute("height", "200%");
    });
  });
}

const LOTTIE_LIST_LAZY_LOAD = document.querySelectorAll(
  '[data-loading="lazy"]'
) as NodeListOf<HTMLElement>;

if (LOTTIE_LIST_LAZY_LOAD.length) {
  // Prepare all lazy elements:
  LOTTIE_LIST_LAZY_LOAD.forEach((element) => LOTTIE_prepare(element));

  // Observer for lazy loading elements:
  const lazyLottieLoader = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) =>
        LOTTIE_handleLoad(entry, lazyLottieLoader, lazyLottiePlayer)
      ),
    { root: null, rootMargin: `${LAZY_LOAD_MARGIN_PX}px` }
  );
  LOTTIE_LIST_LAZY_LOAD.forEach((element) => lazyLottieLoader.observe(element));

  // Observer for lazy playing elements:
  const lazyLottiePlayer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        if (element.style.display !== "none" && LOTTIE_isLoaded(element))
          LOTTIE_handlePlay(entry, lazyLottiePlayer);
      }),
    { root: null, rootMargin: "0px" }
  );
  LOTTIE_LIST_LAZY_LOAD.forEach((element) => lazyLottiePlayer.observe(element));
}

function LOTTIE_isLoaded(element: HTMLElement) {
  return (
    element.children.length &&
    (element.children[0].tagName.toLowerCase() === "svg" ||
      element.children[0].tagName.toLowerCase() === "canvas")
  );
}

function LOTTIE_prepare(element: HTMLElement) {
  console.log({ dataset: element.dataset, element });
  //   TODO - FIX THIS

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

  if (element.dataset.placeholder) {
    element.style.position !== "absolute" &&
      (element.style.position = "relative");
    element.appendChild(
      Object.assign(document.createElement("img"), {
        src: element.dataset.placeholder,
        loading: "eager",
        ariaHidden: "true",
        style: "position:absolute;left:50%;transform:translate(-50%,-50%);",
      })
    );
  }

  if (element.dataset.willTransform) {
    element.style.left = "0px";
    element.style.top = "0px";
    element.style.position = "absolute";
  }
}

function LOTTIE_handleLoad(
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver,
  playObserver: IntersectionObserver
) {
  const element = entry.target as HTMLElement;

  const flag =
    entry.isIntersecting &&
    !LOTTIE_isLoaded(element) &&
    element.style.display !== "none";
  if (!flag) return;

  element.dataset.animationType = "lottie";
  element.dataset.src = element.dataset.defaultSrc;
  // TODO - INSERT CODE HERE

  // @ts-expect-error
  Webflow.require("lottie").createInstance(element);

  if (element.dataset.willTransform) element.style.position = "relative";
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

function LOTTIE_handlePlay(
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver
) {
  const element = entry.target as HTMLElement;
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

  if (isInView && element.dataset.playOnce === "true")
    observer.unobserve(element);
}
