import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

export default function (eleventyConfig) {
  // The collage is a finished, self-contained page: copy it as-is
  // instead of running it through a template engine.
  eleventyConfig.ignores.add("collage/**");
  eleventyConfig.addPassthroughCopy("collage");

  // Short hash of the collage, added to its URL on the homepage so browsers
  // fetch a fresh copy whenever the file changes.
  eleventyConfig.addGlobalData("collageVersion", () =>
    createHash("sha1").update(readFileSync("collage/index.html")).digest("hex").slice(0, 8)
  );

  // Images, favicon and other static files.
  eleventyConfig.addPassthroughCopy("assets");

  // The repo README is for GitHub, not a page on the site.
  eleventyConfig.ignores.add("README.md");

  // "Oct 19, 2026"
  eleventyConfig.addFilter("readableDate", (value) =>
    new Date(value).toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric", timeZone: "UTC",
    })
  );
}
