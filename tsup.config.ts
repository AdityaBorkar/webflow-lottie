import { defineConfig } from "tsup";

export default defineConfig({
  minify: true,
  bundle: true,
  clean: true,
  dts: false,
  sourcemap: false,
  entry: ["src/**/*.ts", "!src/**/*.test.*"],
  format: "esm",
  outDir: "dist",
});
