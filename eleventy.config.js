export default function (eleventyConfig) {
  // The collage is a finished, self-contained page: copy it as-is
  // instead of running it through a template engine.
  eleventyConfig.ignores.add("collage/**");
  eleventyConfig.addPassthroughCopy("collage");

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
