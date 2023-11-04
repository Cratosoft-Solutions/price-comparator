import jwt from "jsonwebtoken";

export const GET = async (req, res) => {
  try {    
    //Validar usuario en BD
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60, //1h
        iss: process.env.TOKEN_ISSUER,
      },
      process.env.NEXT_PUBLIC_TOKEN_SECRET
    );

    return new Response(JSON.stringify({ jwt:token }), { status: 200})

  } catch (error) {
    return new Response(JSON.stringify('unauthorized'), { status: 401 })
  }
};
