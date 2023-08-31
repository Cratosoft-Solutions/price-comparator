import Tags from "@models/searchTags";
import { connectToDB } from "@utils/database";



export const GET = async (req) => {
    try {
        let invertedIndex = {}
        //DB
        await connectToDB();

        //Check if store exists
        const tags  = await Tags.find(/*{key: { $regex: '.*' + params.text + '.*' } }*/)/*.limit(5)*/;  
        return new Response(JSON.stringify(tags), { status: 200 })
         
    } catch (error) {
        return new Response(JSON.stringify({message:error.message}), { status: 500 })
    }
    
}
