import { connectToDB } from "@utils/database";
import Store from '@models/store';

export const GET = async (req, { params }) => {
    try {
        //DB
        await connectToDB();

        //Check if store exists
        let storeExists;
        storeExists = await Store.findOne({user:params.id});
        return new Response(JSON.stringify(storeExists? storeExists: {}), { status: 200 })
         
    } catch (error) {
        return new Response(JSON.stringify({message:error.message}), { status: 500 })

    }
    
}