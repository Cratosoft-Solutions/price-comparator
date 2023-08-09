import { CATEGORY_DEFAULT_LIST, CURRENCY_LIST, IMAGES_FORMAT_ACCEPTED, IMAGE_PRINCIPAL_STORE_DIMENSION } from "./constants";
import InputMask from 'react-input-mask';
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
