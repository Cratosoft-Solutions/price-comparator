import { connectToDB } from "@utils/database";
import UserSearch from "@models/userSearch";
import Tags from "@models/searchTags";
import { genericDatabaseOperation } from "@utils/functions";
import { isTokenValid } from '@utils/authFunctionsServer';


export const GET = async (req, { params }) => {
    try {

        //Endpoint Token Validation
        const tokenStatus = await isTokenValid();
        if(!tokenStatus) return new Response("Unauthorized Access " + req.method, { status: 401});

         //DB
        await connectToDB();
        //Check if Searchs exists
        const SearchExists = await genericDatabaseOperation(UserSearch, {user: params.user}, "FIND");
        const searches = await getTagsDescription(SearchExists);

        return new Response(JSON.stringify(searches), { status: 200 })
         
    } catch (error) {
        return new Response(JSON.stringify({message:error.message}), { status: 500 })

    }
    
}

const getTagsDescription = async (tagsArray)=>{
    try {
        const searches = [];   
        for (const currentSearch of tagsArray) {
                const tagInfo = await genericDatabaseOperation(Tags, {_id:currentSearch.tagID}, "FINDONE");
                searches.push(tagInfo);
        };
        return searches;
    } catch (error) {
        return [];
    }
}