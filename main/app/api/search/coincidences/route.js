import Tags from "@models/searchTags";
import { isTokenValid } from '@utils/authFunctionsServer';
import { connectToDB } from "@utils/database";
import { genericDatabaseOperation } from "@utils/functions";

export const GET = async (req) => {
    try {
        //Endpoint Token Validation
        //const tokenStatus = await isTokenValid();
        //if(!tokenStatus) return new Response("Unauthorized Access " + req.method, { status: 401});

        //DB Connection
        await connectToDB();

        //Check if store exists
        const tags  = await genericDatabaseOperation(Tags, null, "FIND_NO_PARAMS");  
        return new Response(JSON.stringify(tags), { status: 200 })
         
    } catch (error) {
        return new Response(JSON.stringify({message:error.message}), { status: 500 })
    }
    
}
