const moment = require('moment');
const axios = require('axios');
const xml2js = require('xml2js');
const numeral = require('numeral');

const startDate = moment(new Date()).format("DD/MM/YYYY");
const endDate = moment(new Date()).format("DD/MM/YYYY");
const bccr_api_domain = 'https://gee.bccr.fi.cr';
const bccr_get_indicator_api_path = 'Indicadores/Suscripciones/WS/wsindicadoreseconomicos.asmx/ObtenerIndicadoresEconomicos'
const apiRequesterName = 'CratoSoft';
const apiRequesterEmail = 'maxwellmasis@gmail.com';
const apiToken = 'EMXLXIL3ES';
const DOLAR_BUY_EXCHANGE_INDICATOR = 317;
const DOLAR_SALE_EXCHANGE_INDICATOR = 318;
const TWO_DECIMAL_FORMAT = '0,0.00';

/**
 * Get Dollar sale exchante rate from BCCR
 * @returns 
 */
async function getDollarSaleExchangeRate() {
  return await getDollarExchangeRate(DOLAR_SALE_EXCHANGE_INDICATOR);
}

/**
 * Get Dollar buy exchante rate from BCCR
 * @returns 
 */
async function getDollarBuyExchangeRate() {
  return await getDollarExchangeRate(DOLAR_BUY_EXCHANGE_INDICATOR);
}

/**
 * Make connection to get exchange rate value from BCCR base on the indicator.
 * @returns numeric value
 */
async function getDollarExchangeRate(indicator) {
  let currencyValue = 0;
  try {
    const url = `${bccr_api_domain}/${bccr_get_indicator_api_path}?Indicador=${indicator}&FechaInicio=${startDate}&FechaFinal=${endDate}&Nombre=${apiRequesterName}&SubNiveles=N&CorreoElectronico=${apiRequesterEmail}&Token=${apiToken}`;
    console.log(url);
    const response = await axios.get(url);
    const data = await response.data;
    let parseResponse = await parse(data);
    const jsonData = JSON.parse(JSON.stringify(parseResponse, null, 2));
    // Get main key 
    const diffgram = jsonData.DataSet['diffgr:diffgram'];
    currencyValue = numeral(diffgram[0].Datos_de_INGC011_CAT_INDICADORECONOMIC[0].INGC011_CAT_INDICADORECONOMIC[0].NUM_VALOR[0])
      .format(TWO_DECIMAL_FORMAT);
  } catch (error) {
    console.log("Error while getting sale value", error);
    throw error;
  }
  return currencyValue;
}

/**
 * 
 * @param {*} data Information retrieved from external service 
 * @returns parsed information
 */
async function parse(data) {
  const promise = await new Promise((resolve, reject) => {
    xml2js.parseString(data, (err, result) => {
      if (err) {
        console.error('Error parsing from XML', err);
        reject(err);
      } else {
        resolve(result)
      }
    });
  });
  return promise;
}

/**
 * Get price formatted
 * @param {*} price Price
 */
function getFormattedPrice(price) {
  try {
    if (null != price) {
      return numeral(price).format(TWO_DECIMAL_FORMAT);
    }
  } catch (err) {
    console.log(err);
  }
  return price;
}

module.exports = {
  getDollarSaleExchangeRate,
  getDollarBuyExchangeRate,
  getFormattedPrice
};