import { connectToDB } from "@utils/database";
import Store from '@models/store';

export const GET = async (req, { params }) => {
    try {
        //DB
        await connectToDB();

        //Check if store exists
        let storeExists;
        console.log(params);
        if(params.field =='store'){
            storeExists = await Store.findOne({_id:params.id});
        }else{
            storeExists = await Store.find({user:params.id});
        }
        return new Response(JSON.stringify(storeExists? storeExists: {}), { status: 200 })
         
    } catch (error) {
        return new Response(JSON.stringify({message:error.message}), { status: 500 })

    }
    
}