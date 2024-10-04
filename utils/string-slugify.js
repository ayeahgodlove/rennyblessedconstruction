const slugify = require("slugify");

function stringSlugify(str) {
    return slugify(str.toLowerCase());
  }
  
  module.exports = stringSlugify;
  