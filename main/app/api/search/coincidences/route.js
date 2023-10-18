import Tags from "@models/searchTags";
import { connectToDB } from "@utils/database";
import { genericDatabaseOperation } from "@utils/functions";

export const GET = async (req) => {
    try {
        //DB Connection
        await connectToDB();

        //Check if store exists
        const tags  = await genericDatabaseOperation(Tags, null, "FIND_NO_PARAMS");  
        return new Response(JSON.stringify(tags), { status: 200 })
         
    } catch (error) {
        return new Response(JSON.stringify({message:error.message}), { status: 500 })
    }
    
}
