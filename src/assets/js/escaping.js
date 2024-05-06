const escape = (str) => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/'/g, "&#39;")
    .replace(/`/g, "&#96;")
    .replace(/"/g, "&quot;")
    .replace(/\n/g, "<br />");
};

const unescape = (str) => {
  return str
    .replace(/&lt;/g, "<")
    .replace(/&#39;/g, "'")
    .replace(/&#96;/g, "`")
    .replace(/&quot;/g, '"')
    .replace(/<br>/g, "\n")
    .replace(/&amp;/g, "&");
};

module.exports = { escape, unescape };
