
import { connectToDB } from "@utils/database";
import { METATAGS } from "@utils/meta";

export const GET = async (req) => {
    try {
        //Endpoint Token Validation
        //const tokenStatus = await isTokenValid();
        //if(!tokenStatus) return new Response("Unauthorized Access " + req.method, { status: 401});

        //DB Connection
        await connectToDB();

        //Check if store exists
         const convertedTags = METATAGS.map(element => ({category:element.category, key:element.text}));
        
        return new Response(JSON.stringify(convertedTags), { status: 200 })
         
    } catch (error) {
        return new Response(JSON.stringify({message:error.message}), { status: 500 })
    }
    
}
