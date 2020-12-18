const format = require("date-fns/format");
module.exports = {
  format_date_1: (date) => {
    return format(new Date(date), "yyyy-MM-dd");
  },
  format_date_2: (pickup_date) => {
    return format(new Date(pickup_date), "MMM dd, yyyy");
  },
  format_url: (url) => {
    return url
      .replace("http://", "")
      .replace("https://", "")
      .replace("www.", "")
      .split("/")[0]
      .split("?")[0];
  },
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }

    return word;
  },
};
