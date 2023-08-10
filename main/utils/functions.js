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

export function comparePrice( property ) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
  }