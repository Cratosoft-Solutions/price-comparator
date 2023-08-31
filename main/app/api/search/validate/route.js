import { connectToDB } from "@utils/database";
import Search from '@models/search';

export const POST = async (req) => {
    try {
        const searchToSearch = await req.json();
         //DB
         await connectToDB();

        //Check if Searchs exists
        const SearchExists = await Search.findOne({
                                key: searchToSearch.key
                            });
                            
        return new Response(JSON.stringify(SearchExists? SearchExists: {}), { status: 200 })
         
    } catch (error) {
        return new Response(JSON.stringify({message:error.message}), { status: 500 })

    }
    
}