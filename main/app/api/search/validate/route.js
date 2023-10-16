import { connectToDB } from "@utils/database";
import Search from '@models/search';
import Tags from "@models/searchTags";
import UserSearch from "@models/userSearch";
import { saveUserSearch } from "@utils/functions";


export const POST = async (req) => {
    try {
        const searchToSearch = await req.json();
         //DB
         await connectToDB();

        //Check if Searchs exists
        const SearchExists = await Search.findOne({
                                key: searchToSearch.key
                            });
         
        const tagData =  searchToSearch.key.replaceAll(".", " ").split("-").slice(-2);
        await saveUserSearch(Tags, UserSearch, tagData, searchToSearch.user)   

        return new Response(JSON.stringify(SearchExists? SearchExists: {}), { status: 200 })
         
    } catch (error) {
        return new Response(JSON.stringify({message:error.message}), { status: 500 })

    }
    
}