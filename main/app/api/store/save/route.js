import { connectToDB } from "@utils/database";
import Store from '@models/store';

export const POST = async (req) => {
    try {
        const storeToSave = await req.json();
        let createdID;

        //SERVERLESS LAMBDA DYNAMODB
        await connectToDB();
        //check if store exists
        const storeExists = await Store.findOne({
            _id:storeToSave.id
        })
        //if not, create new store
         if(!storeExists){
           const result = await Store.create({
            name:storeToSave.name,
            description:storeToSave.description,
            contactnumber:storeToSave.contactnumber,
            email:storeToSave.email,
            showwhatssapicon:storeToSave.showwhatssapicon,
            image: storeToSave.image,
            user:storeToSave.user,
            address:storeToSave.address
           }) 
           createdID = result._id.toString();
         } else{
            await Store.updateOne({_id:storeToSave.id},
                {
                name:storeToSave.name,
                description:storeToSave.description,
                contactnumber:storeToSave.contactnumber,
                email:storeToSave.email,
                showwhatssapicon:storeToSave.showwhatssapicon,
                image: storeToSave.image,
                user:storeToSave.user,
                address:storeToSave.address
               });    
         }  
         return new Response(JSON.stringify({id:createdID}), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({message:error.message}), { status: 500 })
    }
    
}