function reverseDate(date) {
  const [year, month, day] = date.split("-");
  const result = `${day}-${month}-${year}`;
  return result;
}

function getNewArray(resumeInfo) {
  let newData = resumeInfo;
  newData = newData.map((obj) => ({ ...obj, rating: obj.rating * 20 }));
  return newData;
}

function convertToArray(str) {
  var str1 = str.replace(/<br>/g, "");
  str1 = str1.replace(/<\/?ul>/g, "");
  str1 = str1.replace(/<\/li>/g, ",").replace(/<li>/g, "");
  str1 = str1.replace(/^,|,$/g, "");
  return str1.split(",");
}

export { reverseDate, convertToArray, getNewArray };
