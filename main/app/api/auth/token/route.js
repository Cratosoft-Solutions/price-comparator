import Parameter from "@models/parameters";
import { connectToDB } from "@utils/database";
import { genericDatabaseOperation } from "@utils/functions";
import { decryptData } from "@utils/security/utils";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";

export const POST = async (req, res) => {
  try {
    //Start Getting authorization information    
    const listHeaders = getHeaders();
    const encryptedAuthorization = listHeaders.get('Authorization');

    console.log(encryptedAuthorization);


    if(encryptedAuthorization =='undefined')
        return new Response(JSON.stringify('unauthorized'), { status: 401 });

    const decryptedAuthorization = decryptData(encryptedAuthorization.split(" ")[1]);

    if(!decryptedAuthorization.decrypted)
        return new Response(JSON.stringify('unauthorized'), { status: 401 });
   
    //Finish Getting authorization information    

    //Start validate on database
        const receivedUser = decryptedAuthorization.value.split(":")[0];
        const receivedPassword = decryptedAuthorization.value.split(":")[1];

        //DB Connection
        await connectToDB();
        //Check if store exists
        const adminUserInfo  = await genericDatabaseOperation(Parameter, {key:"WEB_ADMIN_USER"}, "FINDONE");  

        if(!adminUserInfo)
          return new Response(JSON.stringify('unauthorized'), { status: 401 });

        const decryptedAdminUser = decryptData(adminUserInfo.value);   

        if(!decryptedAdminUser.decrypted)
          return new Response(JSON.stringify('unauthorized'), { status: 401 });

        const adminDBUser = decryptedAdminUser.value.split(":")[0];
        const adminDBPassword = decryptedAdminUser.value.split(":")[1];

        if(adminDBUser != receivedUser || receivedPassword != adminDBPassword)
            return new Response(JSON.stringify('unauthorized'), { status: 401 });

    //End Validate on database

   //Authentication was ok, return token
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60, //1h
        iss: process.env.TOKEN_ISSUER,
      },
      process.env.NEXT_PUBLIC_TOKEN_SECRET
    );

    const headers = new Headers({
      'Set-Cookie': `${process.env.NEXT_PUBLIC_TOKEN_COOKIE}=${token}; Path=/;  Secure`
    });
    
    const response = new Response('OK', {
      status: 200,
      headers: headers
    });

    return response;

  } catch (error) {
    return new Response(JSON.stringify('unauthorized'), { status: 401 })
  }
};

const getHeaders = ()=>{
  const listHeaders = headers();
  return listHeaders;
}
