import dbConnect from "@/lib/connectdb";
import UserModel from "@/model/User";
import {z} from "zod";
import { usernamevalidation } from '../../../schemas/signUpSchema';


const UsernameQuerySchema=z.object({
    username:usernamevalidation
})
export async function GET(request:Request){
    await dbConnect()
    try {
        const {searchParams}=new URL(request.url);
        const QueryParam={
            username:searchParams.get("username")
        }
        const result=UsernameQuerySchema.safeParse(QueryParam);
        console.log(result);
        if(!result.success){
            const usernameError=result.error.format().username?._errors || [];
            return Response.json(
                {
                    success:false,
                    message:usernameError.length>0?usernameError.join(", "):"Invalid username"
                },
                {
                    status:400
                }
            )

        }
        const {username}=result.data;
        const existingVerifiedUser=await UserModel.findOne({username,isVerified:true});
        if(existingVerifiedUser){
            return Response.json(
                {
                    success:false,
                    message:"Username is already taken"
                },
                {
                    status:400
                }
            )
        }
        return Response.json(
            {
                success:true,
                message:"Username is unique"
            },
            {
                status:200
            }
        )
    } catch (error) {
        console.log("Error in checking username");
        return Response.json(
            {
                success:false,
                message:"Error checking username"
            },
            {
                status:500
            }
        )
    }
}