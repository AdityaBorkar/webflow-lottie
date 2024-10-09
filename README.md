# webflow-lottie

<!-- [![jsDelivr](https://data.jsdelivr.com/v1/package/gh/adityaborkar/webflow-lottie/badge?style=rounded)](https://www.jsdelivr.com/package/gh/adityaborkar/webflow-lottie) -->

> [!TIP]
> You can check out this page on [JSDeliver](https://www.jsdelivr.com/package/gh/adityaborkar/webflow-lottie)

## Introduction

Enhance your Webflow projects with optimized Lottie animations using this lightweight library. Key features:

- ✨ Lazy loading
- 🔁 Single-play option
- 📏 Layout shift prevention
- 🖼️ Placeholder support
- 🎨 Filter and shadow fixes
- 🔧 Transform corrections
- 📦 Minified size: < 3KB

> [!NOTE]
> Need help or have questions? Open an issue on GitHub or contact the maintainers:
> - Aditya Borkar (Full Stack Developer)
>   [[GitHub]](https://github.com/adityaborkar) [[Email]](mailto:aditya.borkar.programs@gmail.com)
> - Onkar Jadhav (Webflow Developer and Designer)
>   [[Website]](https://onkarjadhav.com) [[Email]](mailto:hi@onkarjadhav.com)

## Usage

1. Add the script to your Webflow project:
   - Place in the page's body or site's footer
   - Include the comment for future reference

   ```html
   <!-- Webflow Lottie Library: https://github.com/adityaborkar/webflow-lottie -->
   <script type='module' src='https://cdn.jsdelivr.net/gh/adityaborkar/webflow-lottie@0.2.0/dist/index.js'
           id="webflow-lottie" default-attributes="fix-filters lazy-load"></script>
   ```

   Note: To target specific Lottie elements, use `target="[webflow-lottie]"` in the script tag.

2. Apply to Lottie elements:
   - Add `webflow-lottie="[properties]"` attribute to each Lottie element
   - `[properties]` can be left blank or filled with specific options

3. Customize behavior:
   - Use additional attributes to control Lottie element properties
   - See "Custom Attributes" section below for details

## Custom Attributes

### Script Element Attributes

1. **`target="<selectors>"`**
   - Purpose: Selects Lottie elements on the page.
   - Default: `[data-animation-type='lottie']`
   - Example: Use `[webflow-lottie]` to select elements with the `webflow-lottie` attribute.
   - Note: Accepts any valid CSS selector. [Learn more about selectors](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll#selectors)

2. **`lazy-load-offset=""`**
   - Purpose: Sets the threshold for lazy loading Lottie elements.
   - Default: `125vh` (applies to all directions)
   - Format: Follows CSS `margin` property syntax.
   - Example: `"100px 0"` (top and bottom, right and left)
   - [More about CSS margin syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/margin)

3. **`default-attributes="[property separated by spaces]"`**
   - Purpose: Sets default attributes for all Lottie elements.
   - Note: Can be overridden by inline attributes on individual elements.
   - Example: `default-attributes="lazy-load play-once"`

### Lottie Element Attributes

1. **`webflow-lottie="[property separated by spaces]"`**
   - Purpose: Enables this library for the Lottie element.
   - Note: Also referred to as "inline attributes".
   - Example: `webflow-lottie="no-lazy-load fix-filters"`

2. **`placeholder="[image-URL]"`**
   - Purpose: Sets a placeholder image until the Lottie element lazy loads.
   - Best Practice: Use small SVGs or WebP images for optimal performance.
   - Caution: Large or numerous placeholders may impact page load times.
   - Example: `placeholder="https://example.com/placeholder.png"`

### Properties

- `lazy-load`: Enables lazy loading for the Lottie element.
- `no-lazy-load`: Disables lazy loading for the Lottie element.
- `play-once`: Plays the Lottie animation once and remains static afterwards.
- `no-play-once`: Allows the Lottie animation to play each time it enters the viewport.
- `fix-filters`: Corrects filters and shadows for proper rendering and playback.
- `no-fix-filters`: Disables filter correction for the Lottie element.
- `fix-transform`: Ensures proper rendering for elements inside carousels or other transforming parents.
- `no-fix-transform`: Disables transform correction for the Lottie element.

### Property Precedence

Properties are applied in the following order:

1. Default properties (set in the script tag)
2. Inline properties (set on individual Lottie elements)

The last specified value for each property takes precedence.

<!--
## Examples

[] Attach images
-->

<!--
## TODO

[] 2 branches - `main` and `develop`
[] Auto Publish to NPM and Release on GitHub 
[] Development Guide using an anonymous cloudflare tunnel
-->
