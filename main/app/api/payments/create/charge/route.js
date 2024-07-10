import axios from "axios"
export const POST = async (req) => {
    try {
        const reqBody = await req.json();
        
        const { data, status } = await axios.post('https://api.onvopay.com/v1/payment-intents',
            {
              currency: reqBody.currency,
              amount: reqBody.amount*100, //AS REQUESTED BY ONVO
              description: reqBody.description,
            },
            {
              headers: {
                Authorization: "Bearer "+ process.env.GATEWAY_SK,
              },
            },
          );
          
          if (status == 201) {
            return new Response(JSON.stringify({created:true, id:data.id, message:"Precargo creado correctamente"}), { status: 200 })
          }else{
            return new Response(JSON.stringify({created:false, id:null, message:"Error al iniciar el pago, favor intente más tarde."}), { status: 200 })
          }

    } catch (error) {
        return new Response(JSON.stringify({created:false, id:null, message:error.message}), { status: 200 })
    }
    
}