const utils = {};

// remove undefined data from arr
utils.removeUndefinedObj = (arr) => {
  return arr.filter((a) => {
    if ((a.label && a.value) !== undefined) {
      return a;
    }
  });
};

utils.removeDuplicateObjects = (arr) => {
  const uniqueObjects = new Set(arr.map(JSON.stringify));
  return Array.from(uniqueObjects).map(JSON.parse);
};

export const { removeDuplicateObjects, removeUndefinedObj } = utils;
