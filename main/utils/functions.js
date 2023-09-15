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

export const returnToLogin=()=>{
    return redirect("/api/auth/signin");
}

export const paseStoreNumber=(number)=>{
    try {
        let tempNumber = number.trim().replace(/[^a-zA-Z0-9,.]/g, '');
       if(tempNumber.charAt(tempNumber.length-3)=="."){
            tempNumber=tempNumber.replaceAll(",", "");
        }else if(tempNumber.charAt(tempNumber.length-3)==","){
            tempNumber = tempNumber.replaceAll(".", "").replaceAll(",",".");
        }else{
            tempNumber = tempNumber.replaceAll(".", "").replaceAll(",", "")
        }
        return tempNumber.trim();
    } catch (error) {
        return -1;
    }
}

export function comparePrice( property, order ) {  
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1*order : (a[property] > b[property]) ? 1*order : 0;
        return result * sortOrder;
    }
  }

  export async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 25000 } = options;
    
    const controller = new AbortController();
    const id = setTimeout(() => {controller.abort();}, timeout);

    const response = await fetch(resource, {
      ...options,
      signal: controller.signal  
    });
    clearTimeout(id);
  
    return response;
  }

  export const filterArrayBySearchText=(arrayToFilter, textSearchArray)=>{
    try {
        const arrayToReturn = [];
        arrayToFilter.forEach(element => {
            let fullCoincidence = true;
            textSearchArray.forEach(currentText => {
                if(fullCoincidence)
                    fullCoincidence = element.productName.toUpperCase().split(" ").includes(currentText);
            })
            if(fullCoincidence)
                arrayToReturn.push(element);
        })
        return arrayToReturn;
    } catch (error) {
        alert(error);
       return []; 
    }
  }

  export const setStorageData = (key, dataToSet)=>{
    const item = window.sessionStorage.getItem(key);
      if (item == null){      
        window.sessionStorage.setItem(key, JSON.stringify([compress(dataToSet)]));
      }else{
        window.sessionStorage.setItem(key, JSON.stringify([...JSON.parse(item), compress(dataToSet)]));
      } 
  }

  export const setStorageCoincidences = (key, dataToSet)=>{
        window.sessionStorage.setItem(key, JSON.stringify([compress(dataToSet)]));
  }

  export const deleteStorageData = (key,)=>{
     window.sessionStorage.removeItem(key);
  }

  export const formatKeyForStorage = (category, searchText)=>{
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    return yyyy +"-"+ mm +"-"+ dd + "-" + category+ "-" +searchText.toUpperCase().split(" ").join('.');
  }

  export const localDataExists =  (key, resultDecompressed=false) => {
    try {
        const item =  window.sessionStorage.getItem(key);
        if(item != null){
           const decompressed = decompressObject(JSON.parse(item)); 
           return {localData:true, data: resultDecompressed? item: decompressed, saveOnStorage: decompressed.length >0?true:false}     
        }else{       
              return {localData:false, data: null, saveOnStorage: false}     
        }
    } catch (error) {
        return {localData: false, data:null, saveOnStorage:null};
    }
  }

  const decompressObject = (storageObject)=> {
    try {
        let decompressedArray = [];
        storageObject.forEach((element)=>{
            decompressedArray.push(decompress(element));
        })
        return decompressedArray;
    } catch (error) {
      return [];  
    }
  }


  export const saveSearchOnDB =  (key) => {
    try {
      const { data } =  localDataExists(key, true);
          axios.post(`/api/search/save`, {
            key:key,
            result:data
          });
    } catch (error) {
      //console.log("Guardando en BD" + error);
    }
  }

  export const getSearchDataFromDataBase = async (key) => {
    try {
      const response = await axios.post(`/api/search/validate`, {
        key:key
      });

      const compressedData = await response.data.result;
      const decompressed = decompressObject(JSON.parse(compressedData)); 
      return {dataBaseData: true, data:decompressed}
    
    } catch (error) {
      return {dataBaseData: false, data:null};
    }
  }

export const searchArrayCoincidences = (tags, text) =>{
  try {
    var search = new RegExp(text , 'i');
    return tags.filter(item => search.test(item.key));
  } catch (error) {
    return [];
  }
}

export const formatAutoCompletableItem = (category, text) => {
  const categoryInfo = CATEGORIES.filter(element => element.value == category);
  if (categoryInfo.length > 0){
    return categoryInfo[0].label + " - " + text;
  }else{
    return "Unknow Category" + " - " + text;
  }
}

export const getNestedPropertyValue = (obj, path) => {

  try {
    console.log("RANDALL OBJETO:");
    console.log(obj);
    console.log("RANDALL PATH:");
  
    console.log(path);
    
  
    const keys = path.split('.');
    let current = obj;
  
   for (const key of keys) {
    console.log(typeof current);  
    if (typeof current =="object" && current.hasOwnProperty(key)) {
        console.log("tiene propiedad" + key);
        current = current[key];
        if (Array.isArray(current)) {
          // Si encontramos un array, asumimos que queremos el primer elemento.
          current = current[0];
        }
      }else if(typeof current == "string" && JSON.parse(current).hasOwnProperty(key)){
        current = JSON.parse(current)[key];        
      } 
      else {
        
        console.log("no tiene propiedad" + key);
        console.log(current);
        return undefined; // Devuelve undefined si la propiedad no existe en la ruta.
      }
    } 
    
    return current;
  } catch (error) {
    console.log(error)
  }
}