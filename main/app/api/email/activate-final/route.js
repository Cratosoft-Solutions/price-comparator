import { genericDatabaseOperation } from "@utils/functions";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const PUT = async (req) => {
    try {
        const userToActivate = await req.json();

            //SERVERLESS LAMBDA DYNAMODB
            await connectToDB();

            //check if user exists
                const UserExists = await User.findById({
                    _id: userToActivate.id,
                });


        if(UserExists && UserExists.active){
            return new Response(JSON.stringify({updated:false, message: "Cuenta ya se encuentra activa, favor verifica nuevamente."}), { status: 200 })
        }

        // Try to activate user
        const result = await genericDatabaseOperation(User,{ _id: userToActivate.id } , "UPDATEONE", {active:true})
        
        if (result){
            return new Response(JSON.stringify({updated:true, message: "Tu cuenta ha sido activada, gracias por utilizar nuestra plataforma."}), { status: 200 })
        }else{
            return new Response(JSON.stringify({updated:false, message:"Cuenta suministrada no existe en nuestros registros, favor verifica tu email."}), { status: 200 })
        }

    } catch (error) {
        return new Response(JSON.stringify({updated:false, message:"Tuvimos un error al tratar de actualizar tu cuenta. Favor intenta más tarde o verifica nuevamente el Link de activación."}), { status: 200 })
    }
    
}