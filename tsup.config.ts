import { defineConfig } from "tsup";

export default defineConfig({
  minify: process.env.MINIFY ? true : false,
  bundle: true,
  clean: true,
  dts: false,
  sourcemap: false,
  entry: ["src/index.ts"],
  format: "esm",
  outDir: "dist",
});
