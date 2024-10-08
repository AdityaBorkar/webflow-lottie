# webflow-lottie

You can check out this page on [JSDeliver](https://www.jsdelivr.com/package/gh/athlonstudio/webflow-lottie-lazy-loader)

## Introduction

Improvements and fixes to Lottie Extension for Webflow. Better performance for Lottie elements.
<!-- TODO - Add more documentation -->

Features:

- Lazy load Lottie elements
- Play Lottie elements once
- Placeholder images for Lottie elements
- Fix filters and shadows on Lottie elements
- Fix transform on Lottie elements
- <5Kb minified and gzipped

>> [!IMPORTANT]
>> Facing issues with the library? Or, you have other problems related to After Effects, Lottie, or Webflow? Feel free to open an issue on GitHub OR contact the maintainers below.

This package is maintained by

- Aditya Borkar (Full Stack Developer) [[GitHub Profile]](https://github.com/adityaborkar) [[Email]](mailto:aditya.borkar.programs@gmail.com)
<!-- [Website](https://adityaborkar.com) [Email](mailto:hi@adityaborkar.com) -->
- Onkar Jadhav (Webflow Developer and Designer). [[Website]](https://onkarjadhav.com) [[Email]](mailto:hi@onkarjadhav.com)

## Usage

1. Add this script to the page's body or the site's footer. Also add the comments, so that your teammates or the developers who take over your code in the future can understand the custom script.

    ```html
    <!-- To understand this custom script, follow: https://github.com/adityaborkar/webflow-lottie -->
    <script type='module' src='https://cdn.jsdelivr.net/gh/adityaborkar/webflow-lottie@0.2.0/dist/index.js'
        id="webflow-lottie" default-attributes="fix-filters lazy-load" />
    ```

    To target selective lottie elements, use `target="[webflow-lottie]"`

2. Add the `webflow-lottie="[properties]"` custom attribute to the Lottie element. Tip - `properties` can be blank

3. Use attributes to control the properties of the Lottie element.

## Custom Attributes

### Script Element

- `target="*"` - Enables this library for all Lottie elements on the page. Currently it supports only two values = "" or "*"
- `lazy-load-offset=""` - Sets the offset for the lazy load feature. Defaults to `1250px`.
- `default-properties="[properties]"` - Sets the default attributes for the Lottie elements.

### Lottie Element

- `webflow-lottie="[property]"` - Enables this library for Webflow. `properties` field does not support `placeholder`
- `placeholder="[image-URL]"` - Generates a placeholder image that loads with the page, and persists until you scroll and the Lottie element lazy loads in. This attribute may affect performance if you use large or there are too many lotties on your page. Small SVGs or WEBP reccomended.

### Properties

- `lazy-load=""` - Enables lazy loading on that Lottie element.
- `no-lazy-load=""` - Prevents the Lottie element from being lazy loaded.
- `play-once=""` - Makes it so that the Lottie element only plays one time and remains static after that first play.
- `no-play-once=""` - Makes it so that the Lottie element plays when it comes into the viewport.
- `fix-filters=""` - Fixes the filters and shadows on the Lottie element so that it can be rendered properly and play correctly. (May affect loading and performance)
- `no-fix-filters=""` - Prevents the Lottie element from being fixed.
- `fix-transform=""` - Flags an element that is inside of a carousel or other transforming parent so that it can be rendered properly and play correctly. (May affect loading and performance)
- `no-fix-transform=""` - Prevents the Lottie element from being fixed.

### Order of precedence

Default properties are applied first, then the inline properties. Whichever values comes LAST shall be taken into account.

<!--
## TODO

[] Attach images
[] 2 branches - `main` and `develop`
[] Auto Publish to NPM and Release on GitHub 
[] Development Guide using an anonymous cloudflare tunnel
-->
