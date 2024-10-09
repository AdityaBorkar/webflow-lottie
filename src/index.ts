import init from "./init.js";
import { parseProperties } from "./properties.js";

declare global {
  interface Window {
    WebflowLottieList: { [key: string]: any };
  }
}

window["WebflowLottieList"] = [];

const script = document.querySelector("#webflow-lottie") as HTMLScriptElement;

init({
  target: script.getAttribute("target") || "[data-animation-type='lottie']",
  lazyLoadOffset: script.getAttribute("lazy-load-offset") || "125vh",
  defaultProperties: parseProperties(
    script.getAttribute("default-attributes") || ""
  ),
});
