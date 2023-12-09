import { connectToDB } from "@utils/database";
import Product from '@models/product';

export const POST = async (req) => {
    try {
        const productToSave = await req.json();
        let createdID;
        //SERVERLESS LAMBDA DYNAMODB
        await connectToDB();

        //check if Product exists
        const productExists = await Product.findOne({
            _id:productToSave.id
        })
      

        //if not, create new product
         if(!productExists){
            const result = await Product.create({
            store:productToSave.store,
            name:productToSave.name,
            description:productToSave.description,
            indexedField:productToSave.name.toUpperCase() + " " + productToSave.description.toUpperCase(),
            category:productToSave.category,
            price:productToSave.price,
            especialprice:productToSave.especialPrice,
            currency:productToSave.currency,
            image: productToSave.image
           });
           createdID = result._id.toString(); 
         } else{
            console.log("ingrese aca")
            await Product.updateOne({_id:productToSave.id},
                {
                store:productToSave.store,
                name:productToSave.name,
                description:productToSave.description,
                iindexedField:productToSave.name.toUpperCase() + " " + productToSave.description.toUpperCase(),
                category:productToSave.category,
                price:productToSave.price,
                especialprice:productToSave.especialPrice,
                currency:productToSave.currency,
                image: productToSave.image
               });    
         }  
         return new Response(JSON.stringify({id:createdID}), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({message:error.message}), { status: 500 })

    }
    
}