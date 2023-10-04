import { redirect } from 'next/navigation';
import { compress, decompress } from 'compress-json';
import axios from 'axios';
import { CATEGORIES } from './constants';


export const isUserAuthenticathed = (status) => {
  try {
    return status === "authenticated";
  } catch (error) {
    return false;
  }
}

export const returnToLogin = () => {
  return redirect("/api/auth/signin");
}

function isNumber(char) {
  return /^\d$/.test(char);
}


function formatNumber(monto) {
  // Eliminar cualquier separador de miles, si los hay, y reemplazar puntos decimales con comas
  monto = monto.replace(/,/g, '.');
  
  // Comprobar si el monto es un número
  if (isNaN(monto)) {
    monto = monto.replace(/\./g, '').replace(/,/g, '.');
    // Redondear el monto a dos decimales y convertirlo a una cadena
    monto = parseFloat(monto).toFixed(2);
    var partes = monto.split('.');
    var parteEntera = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var resultado = parteEntera + '.' + partes[1];
    return resultado;
  }

  // Redondear el monto a dos decimales y convertirlo a una cadena
  monto = parseFloat(monto).toFixed(2);

  var partes = monto.split('.');
  var parteEntera = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  var resultado = parteEntera + '.' + partes[1];

  return resultado;
}

export const paseStoreNumber = (number, indRoundNumber) => {
  try {
    if (indRoundNumber) {
      number = Math.round(number);
    }
    let tempNumber;
    if (typeof number == 'string') {
      tempNumber = number.trim().replace(/[^0-9,.]/g, '');
    } else {
      tempNumber = String(number);
    }
    if (tempNumber.charAt(tempNumber.length - 3) == ".") {
      //FORMATO MONTO 4000.00
      tempNumber = tempNumber.replaceAll(",", "");
    } else if (tempNumber.charAt(tempNumber.length - 3) == ",") {
      //FORMATO MONTO 4000,00
      tempNumber = tempNumber.replaceAll(".", "").replaceAll(",", ".");
    } else if (tempNumber.charAt(tempNumber.length - 2) == ".") {
      //FORMATO MONTO 2000.0
      tempNumber = tempNumber.replaceAll(",", "");
    } else if (tempNumber.charAt(tempNumber.length - 5) == ".") {
      //FORMATO MONTO 2000.0
      tempNumber = tempNumber.replaceAll(",", "");
    } else if (tempNumber.charAt(tempNumber.length - 7) == ".") {
      //FORMATO MONTO 4000.0000000
      tempNumber = tempNumber.replaceAll(",", "");
    } else if (tempNumber.charAt(tempNumber.length - 8) == ".") {
      //FORMATO MONTO 4000.0000000
      tempNumber = tempNumber.replaceAll(",", "");
    } else {
      //OTRO FORMATO
      tempNumber = tempNumber.replaceAll(".", "").replaceAll(",", "")
    }
    /*  console.log("#PASER JSON - 000 - paseStoreNumber - tempNumber", tempNumber);
     console.log("#PASER JSON - 333 - paseStoreNumber - formatNumber(tempNumber.trim())",  formatNumber(tempNumber.trim())); */
    tempNumber = formatNumber(tempNumber.trim());
    return tempNumber;
  } catch (error) {
    return -1;
  }
}

export function comparePrice(property, order) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    // Función para convertir el monto con comas en un número y poder ordenarlo
    a = parseFloat(a[property].replace(/,/g, ''));
    b = parseFloat(b[property].replace(/,/g, ''));
    var result = (a < b) ? -1 * order : (a > b) ? 1 * order : 0;
    return result * sortOrder;
  }
}

export async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 15000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => { controller.abort(); }, timeout);

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal
  });
  clearTimeout(id);

  return response;
}

export const filterArrayBySearchText = (arrayToFilter, textSearchArray) => {
  try {
    const arrayToReturn = [];
    arrayToFilter.forEach(element => {
      let fullCoincidence = true;
      textSearchArray.forEach(currentText => {
        if (fullCoincidence)
          fullCoincidence = element.productName.toUpperCase().split(" ").includes(currentText);
      })
      if (fullCoincidence)
        arrayToReturn.push(element);
    })
    return arrayToReturn;
  } catch (error) {
    alert(error);
    return [];
  }
}

export const setStorageData = (key, dataToSet) => {
  const item = window.sessionStorage.getItem(key);
  if (item == null) {
    window.sessionStorage.setItem(key, JSON.stringify([compress(dataToSet)]));
  } else {
    window.sessionStorage.setItem(key, JSON.stringify([...JSON.parse(item), compress(dataToSet)]));
  }
}

export const setStorageCoincidences = (key, dataToSet) => {
  window.sessionStorage.setItem(key, JSON.stringify([compress(dataToSet)]));
}

export const deleteStorageData = (key,) => {
  window.sessionStorage.removeItem(key);
}

export const formatKeyForStorage = (category, searchText) => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();
  return yyyy + "-" + mm + "-" + dd + "-" + category + "-" + searchText.toUpperCase().split(" ").join('.');
}

export const localDataExists = (key, resultDecompressed = false) => {
  try {
    const item = window.sessionStorage.getItem(key);
    if (item != null) {
      const decompressed = decompressObject(JSON.parse(item));
      return { localData: true, data: resultDecompressed ? item : decompressed, saveOnStorage: decompressed.length > 0 ? true : false }
    } else {
      return { localData: false, data: null, saveOnStorage: false }
    }
  } catch (error) {
    return { localData: false, data: null, saveOnStorage: null };
  }
}

const decompressObject = (storageObject) => {
  try {
    let decompressedArray = [];
    storageObject.forEach((element) => {
      decompressedArray.push(decompress(element));
    })
    return decompressedArray;
  } catch (error) {
    return [];
  }
}


export const saveSearchOnDB = (key) => {
  try {
    const { data } = localDataExists(key, true);
    axios.post(`/api/search/save`, {
      key: key,
      result: data
    });
  } catch (error) {
    //console.log("Guardando en BD" + error);
  }
}

export const getSearchDataFromDataBase = async (key) => {
  try {
    const response = await axios.post(`/api/search/validate`, {
      key: key
    });

    const compressedData = await response.data.result;
    const decompressed = decompressObject(JSON.parse(compressedData));
    return { dataBaseData: true, data: decompressed }

  } catch (error) {
    return { dataBaseData: false, data: null };
  }
}

export const searchArrayCoincidences = (tags, text) => {
  try {
    var search = new RegExp(text, 'i');
    return tags.filter(item => search.test(item.key));
  } catch (error) {
    return [];
  }
}

export const formatAutoCompletableItem = (category, text) => {
  const categoryInfo = CATEGORIES.filter(element => element.value == category);
  if (categoryInfo.length > 0) {
    return categoryInfo[0].label + " - " + text;
  } else {
    return "Unknow Category" + " - " + text;
  }
}

export const getNestedPropertyValue = (obj, path, index) => {
  try {
    //console.log("#PASER 1 - JSON - getNestedPropertyValue");
    //console.log(obj);
    //console.log("#PASER 2 - JSON - path :",path);
    //console.log(path);
    const keys = path.split('.');
    let current = obj[index];
    let productsList = [];
    let i = 0;
    /*     console.log('#####################################');
        console.log("#PASER 3 - JSON - iteracion :", index); */
    for (const key of keys) {
      //console.log('iteracion',i);  
      //console.log(typeof current);
      //console.log("#PASER 4 - JSON - typeof current :", typeof current);
      if (typeof current == "object" && current.hasOwnProperty(key)) {
        //console.log("#PASER 4.1 - JSON - tiene propiedad - key :", key);
        //console.log("0 tiene propiedad " + key);
        current = current[key];
        if (Array.isArray(current)) {
          // Si encontramos un array, asumimos que queremos el primer elemento.
          //console.log("#PASER 5 - JSON - tiene propiedad - encontramos un array - current :", current.length);
          productsList = current;
          //console.log("#PASER 5 - JSON - tiene propiedad - encontramos un array - product :",product);
          /*           productsList.forEach((product, index) => {
                      console.log('#PASER 5.1 - JSON - forEach - index: ' + index + ' - product.productName :', product.productName);
                    });
          
                    for (let i = 0; i < productsList.length; i++) {
                      console.log('#PASER 5.2 - JSON - for - index: ' + i + '  product.productName :', productsList[1].productName);
                    } */
          current = current[0];
          //console.log("0.1 tiene propiedad " + key.length);
          //console.log("#PASER 7 - JSON - tiene propiedad :", key.length);
        }
      } else if (typeof current == "string" && JSON.parse(current).hasOwnProperty(key)) {
        current = JSON.parse(current)[key];
        //console.log("1. tiene propiedad " + key.length);  
        //console.log("#PASER 8 - JSON - tiene propiedad :", key.length);
        /*current = getNestedPropertyValue  (current, key);
          console.log("1.1 tiene propiedad " + current);   */
      }
      else {
        // console.log("no tiene propiedad " + key);
        //console.log("#PASER 9 - JSON - no tiene propiedad :", key);
        //console.log(current);
        return undefined; // Devuelve undefined si la pr0 opiedad no existe en la ruta.
      }
      //i = i + 1;
    }

    return current;
  } catch (error) {
    console.log(error)
  }
}

export const getProductList = (obj, path) => {

  try {
    //console.log("#PASER 1 - JSON - getProductList");
    //console.log(obj);
    //console.log("#PASER 2 - JSON - path :", path);
    //console.log(path);
    const keys = path.split('.');
    let current = obj;
    let productsLength = 0;
    let productsList = [];
    let elementList = [];
    let i = 0;
    //console.log("#PASER 2.1 - JSON - keys.length :", keys.length);
    for (const key of keys) {
      //console.log('##################################### key', key);
      //console.log("#PASER 3 - JSON - iteracion :", i);
      //console.log("#PASER 4 - JSON - typeof current :", typeof current);
      //console.log("#PASER 4 - JSON - current :", current);
      //console.log("#PASER 4 - JSON - current.length :", current.length);
      //console.log("#PASER 4.0 - JSON - typeof current.hasOwnProperty(key) :", current.hasOwnProperty(key));
      if (typeof current == "object" && current != null && current.hasOwnProperty(key)) {
        //console.log("#PASER 4.1 - JSON - tiene propiedad - key :", key);
        //console.log("0 tiene propiedad " + key);
        current = current[key];
        if (Array.isArray(current)) {
          // Si encontramos un array, asumimos que queremos el primer elemento.
          //console.log("#PASER 5 - JSON - tiene propiedad - encontramos un array - current :", current.length);
          // COn este if valido que estoy evaluando el ultimo elemento de la cadena para retornar la longitud del arreglo de productos
          if (key == keys[keys.length - 1]) {
            //console.log("#PASER 5.0 - JSON - getProductList- encontramos un array - current :", current.length);
            productsLength = current.length;
            productsList = current;
            //console.log("#PASER 5.0 - JSON - tiene propiedad - encontramos un array - productsList :", productsList);
          } /* else {
            //console.log("#PASER 6 - JSON - getProductList - key:", key);
          } */
          current = current[0];
          //console.log("#PASER 7 - JSON - tiene propiedad :", current);
        }
      } else if (typeof current == "string" && JSON.parse(current).hasOwnProperty(key)) {
        current = JSON.parse(current)[key];
        //console.log("#PASER 8 - JSON - tiene propiedad :", current);
      }
      else {
        //console.log("#PASER 8 - JSON - no tiene propiedad :", key);
        return undefined; // Devuelve undefined si la pr0 opiedad no existe en la ruta.
      }
      i = i + 1;
    }
    //console.log("#PASER 9 - JSON - tiene propiedad productsLength:", productsLength);
    return productsList;
  } catch (error) {
    //console.log('#PASER 10 - JSON - ERROR',error)
  }
}


export async function checkImage(url) {
  let apiRes = true;
  try {
    const response = await axios.get(url);
    if (response.status == 200) //if(statusText == OK)
    {
      //console.log("image exists");
      apiRes = true;
    } else {
      //console.log("image doesn't exist");
      apiRes = false;
    }
  } catch (err) {
    //console.error("Error response:",apiRes);
    //console.error(err.response.data);    // ***
    apiRes = false;
    //console.error(err.response.status);  // ***
    //console.error(err.response.headers); // ***
  } finally {
    //console.log('image exist:', apiRes);
    return apiRes;
  }
}