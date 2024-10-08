export type Properties = {
  lazyLoad: boolean;
  playOnce: boolean;
  fixFilters: boolean;
  fixTransform: boolean;
  placeholder: string;
};

const ValidProperties: (keyof Properties)[] = [
  "lazyLoad",
  "playOnce",
  "fixFilters",
  "fixTransform",
  "placeholder",
];

export function extractProperties(element: HTMLElement): [string, string] {
  const properties = element.getAttribute("webflow-lottie") || "";
  const placeholder = element.getAttribute("placeholder") || "";
  return [properties, placeholder];
}

export function parseProperties(property: string, placeholder?: string) {
  let properties = {} satisfies Partial<Properties>;

  property.split(" ").forEach((property) => {
    const negation = property.startsWith("no-");
    const name = (negation ? property.slice(3) : property) as keyof Properties;
    // @ts-expect-error
    if (ValidProperties.includes(name)) properties[name] = !negation;
  });

  // @ts-expect-error
  if (placeholder) properties["placeholder"] = placeholder;

  return properties;
}

export function mergeProperties(...properties: Partial<Properties>[]) {
  return properties.reduce((oldProp, newProp) => {
    return { ...oldProp, ...newProp };
  }, {} as Partial<Properties>);
}
