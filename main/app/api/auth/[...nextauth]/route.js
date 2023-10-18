import { connectToDB } from "@utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from '@models/user';

const handler = NextAuth(
    {
        providers: [
            GoogleProvider(
                {
                    clientId:process.env.GOOGLE_ID,
                    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
                }
            )
        ],
        callbacks:{
            async session({session}){
                const sessionUser = await User.findOne({
                    email:session.user.email
                });
                session.user.id = sessionUser._id.toString();
                return session;
            },
            async signIn({profile}){
                try {
                    //SERVERLESS LAMBDA DYNAMODB
                    await connectToDB();
                    //check if user exists
                    const userExits = await User.findOne({
                        email:profile.email
                    })
                    //if not, create new user
                     if(!userExits){
                       await User.create({
                        email: profile.email, 
                        username:profile.name.replace(" ", "").toLowerCase(),
                        image:profile.picture
                       }) 
                     }   
                    return true;
                } catch (error) {
                    return false;
                }
            }
        },
        secret: process.env.NEXTAUTH_URL_SECRET
    }
)

export {handler as GET, handler as POST};