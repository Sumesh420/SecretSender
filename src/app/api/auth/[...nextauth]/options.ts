import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/connectdb";
import UserModel from "@/model/User";
import  CredentialsProvider  from "next-auth/providers/credentials";

export const authOptions:NextAuthOptions={
    providers:[
        CredentialsProvider({
            id:"credentials",
            name:"Credentials",
            credentials:{
                email:{label:"Email",type:"text",placeholder:"Enter your username"},
                password:{label:"Password",type:"password"}
            },
            async authorize(credentials:any):Promise<any>{
                await dbConnect();
                try {
                    const user=await UserModel.findOne({
                        $or:[
                            {
                                email:credentials.identifier
                            },
                            {
                                username:credentials.indentifier
                            }
                        ]
                    });
                    if(!user){
                        throw new Error("No user exist with this email or username")
                    }
                    if(!user.isVerified){
                        throw new Error("Please verify your account before login")
                    }
                    const isPasswordCorrect=await bcrypt.compare(credentials.password,user.password);
                    if(isPasswordCorrect){
                       return user;
                    }else{
                         throw new Error("Incorrect Password");
                    }

                } catch (error:any) {
                    throw new Error(error)
                }
            }
        })
    ],
    callbacks:{
        async jwt({token,user}){
            if(user){
                token._id=user._id?.toString();
                token.isVerified=user.isVerfied;
                token.isAcceptingMessages=user.isAcceptingMessages;
                token.username=user.username;

            }
            return token;
        },
        async session({session,token}){
            if(token){
                session.user._id=token._id?.toString();
                session.user.isVerified=token.isVerified??false;
                session.user.isAcceptingMessages=token.isAcceptingMessages??true;
                session.user.username=token.username?? "guest";
            }
            return session;
        }
    },
    pages:{
        signIn:"/sign-in"
    },
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET
        
    
}