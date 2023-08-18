import { redirect } from 'next/navigation';
import { compress, decompress } from 'compress-json';

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
            console.log(tempNumber +" queda asi "+ tempNumber.replaceAll(",", "") + " Se separa por .");
            tempNumber=tempNumber.replaceAll(",", "");
        }else if(tempNumber.charAt(tempNumber.length-3)==","){
            console.log(tempNumber +" queda asi "+ tempNumber.replaceAll(".", "").replaceAll(",",".") + " Se separa por ,");
            tempNumber = tempNumber.replaceAll(".", "").replaceAll(",",".");
        }else{
            console.log(tempNumber +" queda asi "+ tempNumber.replaceAll(".", "").replaceAll(",", "") + " No se separa");
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
    const { timeout = 15000 } = options;
    
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

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
            console.log(element.productName);
            let fullCoincidence = true;
            textSearchArray.forEach(currentText => {
                console.log(currentText);
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

  export const formatKeyForStorage = (category, searchText)=>{
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    return yyyy +"-"+ mm +"-"+ dd + "-" + category+ "-" +searchText.toUpperCase().split(" ").join('.');
  }

  export const localDataExists = (key) => {
    try {
        const item = window.sessionStorage.getItem(key);
        
        if(item != null){
           const decompressed = decompressObject(JSON.parse(item)); 
           return {localData:true, data: decompressed, saveOnStorage: decompressed.length >0?true:false}     
        }else{
            return {localData: false, data:null, saveOnStorage: false}
        }
    } catch (error) {
        return {localData: false, data:null, saveOnStorage:bull};
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