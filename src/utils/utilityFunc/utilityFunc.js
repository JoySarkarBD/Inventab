const utils = {};

//@desc remove undefined data from arr
utils.removeUndefinedObj = (arr) => {
  return arr.filter((a) => {
    if ((a.label && a.value) !== undefined) {
      return a;
    }
  });
};

//@desc remove duplicate object from arr
utils.removeDuplicateObjects = (arr) => {
  const uniqueObjects = new Set(arr.map(JSON.stringify));
  return Array.from(uniqueObjects).map(JSON.parse);
};

// @desc number Differentiation [only core]
utils.numDifferentiation = (value) => {
  const val = Math.abs(value);
  if (val) return `${(value / 10000000).toFixed(2)} Cr`;
};

// @desc kpi Each total
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

// @desc get month name by date ["01-01-2022" = "jan"]

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

//@ each month total value
utils.monthTotalValue = (arr) => {
  let t = 0;
  for (let i of arr) {
    t += i;
  }
  return t;
};

//@ indian date format
utils.formatDateToIndianVersion = (date) => {
  if (!(date instanceof Date) || isNaN(date))
    throw new Error("Invalid date object.");
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};

// @desc number to words

utils.inWords = (num) => {
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

  if (num === 0) return "Zero";

  if ((num = num.toString()).includes(".")) {
    const [wholePart, decimalPart] = num.split(".");
    return (
      inWords(parseInt(wholePart)) + " point " + inWords(parseInt(decimalPart))
    );
  }

  if (num.length > 9) return "overflow";
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
      : "only ";
  return str.trim();
};

// @desc calculate GST

utils.calculateGST = (invoiceDetails) => {
  let result = 0;
  let arr = [];
  invoiceDetails?.parts_invoice.forEach((part) => {
    // get specific country
    let gstPercent = part?.parts_no?.gst_itm?.country_gst.find(
      (gst) =>
        gst?.country_code?.id === invoiceDetails?.billing_address?.country?.id
    );

    let res =
      part?.price *
      part?.quantity *
      (parseFloat(gstPercent?.gst_percent) / 100);
    arr.push(res);
  });

  for (let i of arr) {
    result += i;
  }

  return result;
};

// @desc format chart data structure for react-recharts

utils.formatChartData = (kipPo) => {
  let data = kipPo.map((item) => {
    return {
      department: item.department,
      jan: item.jan || 0,
      feb: item.feb || 0,
      mar: item.mar || 0,
      apr: item.apr || 0,
      may: item.may || 0,
      jun: item.jun || 0,
      jul: item.jul || 0,
      aug: item.aug || 0,
      sep: item.sep || 0,
      oct: item.oct || 0,
      nov: item.nov || 0,
      dec: item.dec || 0,
      total: item.total,
    };
  });

  const months = [
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
    "jan",
    "feb",
    "mar",
  ];

  const calculateTotal = (data, month) => {
    let total = 0;
    data?.forEach((department) => {
      if (department[month] !== null) {
        total += department[month] || 0;
      }
    });
    return total;
  };

  const formattedDataWithTotal = months.map((month) => {
    const entry = { month };
    data?.forEach((department) => {
      entry[department.department] = department[month];
    });
    entry.total = calculateTotal(data, month); // Add the total for the month
    return entry;
  });

  return { data, formattedDataWithTotal };
};

//  @desc color for each department in sales dashboard charts

utils.getColorForDepartment = (index) => {
  const predefinedColors = ["#1e3799", "#3c6382", "#38ada9"];
  if (index < predefinedColors.length) {
    return predefinedColors[index];
  }
};

// @desc how many days left
utils.daysLeft = (targetDate) => {
  const currentDate = new Date();
  const targetDateTime = new Date(targetDate);

  // Calculate the difference in milliseconds between the two dates
  const differenceInMilliseconds = targetDateTime - currentDate;

  // Convert the difference to days
  const differenceInDays = differenceInMilliseconds / (24 * 60 * 60 * 1000);

  // Round the number of days and return it
  let res = Math.ceil(differenceInDays);
  if (res > 0) {
    return `+${res}`;
  }
  return res;
};

// @desc due date
utils.dueDate = (row) => {
  let date = new Date(row?.invoice_date);
  if (row?.payment_term?.id === 1) {
    return date;
  }
  if (row?.payment_term?.id === 2) {
    return date;
  }
  if (row?.payment_term?.id === 3) {
    return new Date(date.getTime() + 15 * (24 * 60 * 60 * 1000));
  }
  if (row?.payment_term?.id === 4) {
    return new Date(date.getTime() + 30 * (24 * 60 * 60 * 1000));
  }
  if (row?.payment_term?.id === 5) {
    return new Date(date.getTime() + 45 * (24 * 60 * 60 * 1000));
  }
  if (row?.payment_term?.id === 6) {
    return new Date(date.getTime() + 60 * (24 * 60 * 60 * 1000));
  }
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
  calculateGST,
  formatChartData,
  getColorForDepartment,
  daysLeft,
  dueDate,
} = utils;
