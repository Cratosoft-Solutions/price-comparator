function isEven(number) {
  if (number < 0) throw new Error("Number must be positive");
  if (typeof number !== "number") throw new Error("Number must be a number");
  return number % 2 === 0;
}

const getCurrencyExchange = (key) => {
  try {
    const { data } = localDataExists(key, true);
    axios.post(`/api/search/save`, {
      key: key,
      result: data
    });
  } catch (error) {
    //TODO Verify log management
  }
}

 module.exports = {
isEven, 
getCurrencyExchange
 }
