import * as esbuild from "esbuild";

import { bundleAsync } from "lightningcss";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

import { writeFileSync, watch as fsWatch, mkdirSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);
const watch = args.includes("--watch");
const deploy = args.includes("--deploy");

const loader = {
  ".svg": "file",
  ".png": "file",
  ".jpg": "file",
  ".jpeg": "file",
  ".gif": "file",
  ".woff": "file",
  ".woff2": "file",
  ".ttf": "file",
  ".eot": "file",
};

const plugins = [];

const config = {
  entryPoints: ["js/app.js"],
  bundle: true,
  target: "es2022",
  outdir: resolve(__dirname, "../priv/output/assets/js"),
  logLevel: "info",
  loader,
  plugins,
  sourcemap: deploy ? false : watch ? "inline" : "external",
  minify: deploy,
  splitting: true,
  format: "esm",
  chunkNames: "chunks/[name]-[hash]",
  define: {
    "process.env.NODE_ENV": deploy ? '"production"' : '"development"',
  },
  external: ["/fonts/*", "/images/*"],
};

// CSS build function
async function buildCSS() {
  try {
    // Build main app.css
    const { code: appCode, map: appMap } = await bundleAsync({
      filename: resolve(__dirname, "css/app.css"),
      minify: deploy,
      sourceMap: !deploy,
      targets: {
        chrome: 90,
        firefox: 88,
        safari: 14,
      },
    });

    const appOutPath = resolve(__dirname, "../priv/output/assets/css/app.css");
    const cssDir = dirname(appOutPath);
    mkdirSync(cssDir, { recursive: true });
    writeFileSync(appOutPath, appCode);

    const sizeKB = (appCode.length / 1024).toFixed(1);
    console.log(`  ../priv/output/assets/css/app.css  ${sizeKB}kb`);

    if (!deploy && appMap) {
      writeFileSync(appOutPath + ".map", appMap.toString());
      const mapSizeKB = (appMap.toString().length / 1024).toFixed(1);
      console.log(`  ../priv/output/assets/css/app.css.map  ${mapSizeKB}kb`);
    }

    if (watch) {
      console.log("CSS build complete ✓");
    }
  } catch (error) {
    console.error("CSS build failed:", error);
  }
}

// Build both JS and CSS
if (watch) {
  // Build CSS initially
  await buildCSS();

  // Watch CSS files
  fsWatch(
    resolve(__dirname, "css"),
    { recursive: true },
    (eventType, filename) => {
      if (filename?.endsWith(".css")) {
        buildCSS();
      }
    },
  );

  // Watch JS files
  const ctx = await esbuild.context(config);
  await ctx.watch();
  console.log("Watching for changes...");
} else {
  // Build both for production
  await Promise.all([esbuild.build(config), buildCSS()]);
}
