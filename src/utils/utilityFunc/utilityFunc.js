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
  const total =
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
    (parseFloat(kpi?.dec) || 0);

  return { department: kpi.department, total };
};

export const {
  removeDuplicateObjects,
  removeUndefinedObj,
  numDifferentiation,
  kpiEachTotal,
} = utils;
