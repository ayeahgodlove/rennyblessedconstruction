function stringLimiter(str, maxLength) {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + "..."; // Add ellipsis if the string is trimmed
  }
  return str;
}

module.exports = stringLimiter;
