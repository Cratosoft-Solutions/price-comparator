import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export const isTokenValid = async ()=> {
    try{
       const cookieStore = cookies()
       const cratosAuthCookie = cookieStore.get(process.env.NEXT_PUBLIC_TOKEN_COOKIE);
       return jwt.verify(cratosAuthCookie?.value, process.env.NEXT_PUBLIC_TOKEN_SECRET, function(err, decoded) {
        //Errores como expiración, token firmado incorrectamente, etc
        if (err)
          return false;
  
        if(decoded.iss != process.env.TOKEN_ISSUER)
          return false;
  
          return true;
      });
    
    }catch(e){
      return false;
    }
      
  };