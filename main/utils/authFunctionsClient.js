import { jwtVerify } from "jose";

export const verifyTokenWithJose = async (jwtToVerify) => {
  try {
    const secret = new TextEncoder().encode(
     process.env.NEXT_PUBLIC_TOKEN_SECRET
      );

    await jwtVerify(jwtToVerify, secret);

    return true;
  } catch (error) {
    return false;
  }
}