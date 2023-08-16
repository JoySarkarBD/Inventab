const utils = {};

// remove undefined data from arr
utils.removeUndefinedObj = (arr) => {
  return arr.filter((a) => {
    if ((a.label && a.value) !== undefined) {
      return a;
    }
  });
};

// remove duplicate object from arr
utils.removeDuplicateObjects = (arr) => {
  const uniqueObjects = new Set(arr.map(JSON.stringify));
  return Array.from(uniqueObjects).map(JSON.parse);
};

// number Differentiation
utils.numDifferentiation = (value) => {
  const val = Math.abs(value);
  if (val >= 10000000) return `${(value / 10000000).toFixed(2)} Cr`;
  if (val >= 100000) return `${(value / 100000).toFixed(2)} Lac`;
  return value;
};

// kpi Each total
utils.kpiEachTotal = (kpi) => {
  return (
    (parseFloat(kpi?.jan) || 0) +
    (parseFloat(kpi?.feb) || 0) +
    (parseFloat(kpi?.mar) || 0) +
    (parseFloat(kpi?.apr) || 0) +
    (parseFloat(kpi?.may) || 0) +
    (parseFloat(kpi?.jun) || 0) +
    (parseFloat(kpi?.jul) || 0) +
    (parseFloat(kpi?.aug) || 0) +
    (parseFloat(kpi?.sep) || 0) +
    (parseFloat(kpi?.oct) || 0) +
    (parseFloat(kpi?.nov) || 0) +
    (parseFloat(kpi?.dec) || 0)
  );
};

utils.getMonthName = (dateString) => {
  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  // Split the dateString into year, month, and day parts
  const [year, month, day] = dateString.includes("-")
    ? dateString.split("-")
    : dateString.split("/");

  // Convert the month part (which is 0-indexed) to a number and subtract 1 (since months in JS are 0-11)
  const monthIndex = parseInt(month) - 1;

  // Return the month name
  return months[monthIndex];
};

// month total value
utils.monthTotalValue = (arr) => {
  let t = 0;
  for (let i of arr) {
    t += i;
  }
  return t;
};

// indian date format
utils.formatDateToIndianVersion = (date) => {
  if (!(date instanceof Date) || isNaN(date))
    throw new Error("Invalid date object.");
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};

utils.inWords = (num) => {
  console.log(num);
  let a = [
    "",
    "One ",
    "Two ",
    "Three ",
    "Four ",
    "Five ",
    "Six ",
    "Seven ",
    "Eight ",
    "Nine ",
    "Ten ",
    "Eleven ",
    "Twelve ",
    "Thirteen ",
    "Fourteen ",
    "Fifteen ",
    "Sixteen ",
    "Seventeen ",
    "Eighteen ",
    "Nineteen ",
  ];
  let b = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  if ((num = num.toString()).length > 9) return "overflow";
  let n = ("000000000" + num)
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return;
  var str = "";
  str +=
    n[1] != 0
      ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "crore "
      : "";
  str +=
    n[2] != 0
      ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "lakh "
      : "";
  str +=
    n[3] != 0
      ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "thousand "
      : "";
  str +=
    n[4] != 0
      ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "hundred "
      : "";
  str +=
    n[5] != 0
      ? (str != "" ? "and " : "") +
        (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) +
        "only "
      : "";
  return str;
};

export const {
  removeDuplicateObjects,
  removeUndefinedObj,
  numDifferentiation,
  kpiEachTotal,
  monthTotalValue,
  getMonthName,
  formatDateToIndianVersion,
  inWords,
} = utils;
