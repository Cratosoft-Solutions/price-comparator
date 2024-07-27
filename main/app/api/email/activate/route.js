import ActivateEmailTemplate from '@components/templates/activateEmail';
import { Resend } from 'resend';
import User from "@models/user";
import { connectToDB } from "@utils/database";

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (req) => {
    
  const reqBody = await req.json();

  //SERVERLESS LAMBDA DYNAMODB
  await connectToDB();

  const UserExists = await User.findOne({
    email: reqBody.to,
  });

  const { data, error } = await resend.emails.send({
    from: 'no-reply@encuentralofacilcr.com',
    to: [reqBody.to],
    subject: 'Encuéntralo Fácil CR - Activa tu cuenta',
    react:<ActivateEmailTemplate to={reqBody.to} guid={UserExists._id}/>,
  });

  if (error) {
    return new Response(JSON.stringify({send:false, message:error.message}), { status: 200 })
    }

  return new Response(JSON.stringify({send:true, data:data, message:"Correo de activación enviado correctamente"}), { status: 200 })

};