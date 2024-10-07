# webflow-lottie

You can check out this page on [JSDeliver](https://www.jsdelivr.com/package/gh/athlonstudio/webflow-lottie-lazy-loader)

## Introduction

> [!TIP]
> Forked from [library-webflow_lottie-lazy-loaderer v2.5](https://github.com/athlonstudio/library-webflow_lottie-lazy-loaderer)

Improvements and fixes to Lottie Extension for Webflow.
<!-- TODO - Add more documentation -->

This package is maintained by

- Aditya Borkar (Full Stack Developer) [[GitHub Profile]](https://github.com/adityaborkar) [[Email]](mailto:aditya.borkar.programs@gmail.com)
<!-- [Website](https://adityaborkar.com) [Email](mailto:hi@adityaborkar.com) -->
- Onkar Jadhav (Webflow Developer and Designer). [[Website]](https://onkarjadhav.com) [[Email]](mailto:hi@onkarjadhav.com)

## Usage

1. Add this script to the page's body or the site's footer.
    ```html
    <script type='module' src='https://cdn.jsdelivr.net/gh/adityaborkar/webflow-lottie@0.1.0/dist/index.js' />
    ```

2. Add the `webflow-lottie="true"` custom attribute to the Lottie element.

3. Use attributes to control the properties of the Lottie element.

## Custom Attributes

- `webflow-lottie="[properties]"` - Enables this library for Webflow. `properties` field does not support `placeholder`
- `lazy-load=""` - Enables lazy loading on that Lottie element.
- `play-once=""` - Makes it so that the Lottie element only plays one time and remains static after that first play.
- `placeholder="[image-URL]"` - Generates a placeholder image that loads with the page, and persists until you scroll and the Lottie element lazy loads in. This attribute may affect performance if you use large or there are too many lotties on your page. Small SVGs or WEBP reccomended.
- `fix-filters=""` - Fixes the filters and shadows on the Lottie element so that it can be rendered properly and play correctly. (May affect loading and performance)
- `fix-transform=""` - Flags an element that is inside of a carousel or other transforming parent so that it can be rendered properly and play correctly. (May affect loading and performance)

<!-- 

## TODO

[] Attach images
[] 2 branches - `main` and `develop`
[] Auto Publish to NPM and Release on GitHub 
[] Development Guide using an anonymous cloudflare tunnel

-->
