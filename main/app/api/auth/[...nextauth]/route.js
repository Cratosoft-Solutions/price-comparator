import { connectToDB } from "@utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider  from "next-auth/providers/credentials";
import User from '@models/user';
import { signIn } from "next-auth/react";

const googleProvider = GoogleProvider(
    {
        name:"google",
        id:"google",
        clientId:process.env.GOOGLE_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    }
);

const credentialsProvider = CredentialsProvider({
  // The name to display on the sign in form (e.g. "Sign in with...")
  name: "Credentials",
  id: "credentials",
  // `credentials` is used to generate a form on the sign in page.
  // You can specify which fields should be submitted, by adding keys to the `credentials` object.
  // e.g. domain, username, password, 2FA token, etc.
  // You can pass any HTML attribute to the <input> tag through the object.
  credentials: {
    username: {
      label: "Email",
      type: "text",
      placeholder: "ejemplo@dominio.com",
    },
    password: { label: "Contraseña", type: "contraseña" },
  },
  async authorize(credentials, req) {
    //SERVERLESS LAMBDA DYNAMODB
    await connectToDB();
    let userExits;
    if (credentials.isLogin == 'false') {
      //check if user exists
      userExits = await User.findOne({
        email: credentials.email,
      });

      //if not, create new user
      if (!userExits) {
        userExits = await User.create({
          email: credentials.email,
          username: credentials.email,
          provider: "credentials",
          password: credentials.password,
        });
        return userExits;
      } else {
        return Promise.reject(new Error('UserDoesExist'));
      }
    } else {
      userExits = await User.findOne({
        email: credentials.email,
      });

      if (!userExits) {
        return Promise.reject(new Error('UserDoesNotExist'));
      } else {
        //Validate user conditions
        if (userExits.provider != "credentials") {
            return Promise.reject(new Error('AuthBadProvider'));
        } else if (userExits.password != credentials.password) {
          return Promise.reject(new Error('BadPassword'));
        } else {
          return userExits;
        }
      }
    }
  },
});

const handler = NextAuth(
    {
        providers: [
            credentialsProvider,
            googleProvider
        ],
        pages:{
            signIn:"/login"
        },
        callbacks:{
            async session({session}){
                const sessionUser = await User.findOne({
                    email:session.user.email
                });
                session.user.id = sessionUser._id.toString();
                return session;
            },
            async signIn({account, profile}){
                try {
                    if(account.type === "credentials")
                        return true;

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
                        image:profile.picture,
                        password:null,
                        provider:account.provider
                       }) 
                     }   
                    return true;
                } catch (error) {
                    return false;
                }
            },
        },
        secret: process.env.NEXTAUTH_URL_SECRET
    }
)



export {handler as GET, handler as POST};