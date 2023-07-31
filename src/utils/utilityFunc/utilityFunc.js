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

export const {
  removeDuplicateObjects,
  removeUndefinedObj,
  numDifferentiation,
  kpiEachTotal,
  monthTotalValue,
  getMonthName,
} = utils;
