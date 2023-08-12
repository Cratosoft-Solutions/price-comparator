import { redirect } from 'next/navigation';


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