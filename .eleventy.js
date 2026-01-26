module.exports = function(eleventyConfig) {
  // Pass through static files
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("qr-codes");

  // Create collection of all garments
  eleventyConfig.addCollection("garments", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/garments/*.md");
  });

  // Add a filter for safe output (handle newlines in certificate text)
  eleventyConfig.addFilter("nl2br", function(str) {
    if (!str) return str;
    return str.replace(/\n/g, "<br>");
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
