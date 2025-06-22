import dbConnect from "@/lib/connectdb";
import UserModel from "@/model/User";

export async function POST(request:Request){
    await dbConnect();
    try {
        const {username,code}=await request.json();
    const decodedUsername=decodeURIComponent(username);
    const user=await UserModel.findOne({
        username:decodedUsername
    });
    if(!user){
        return Response.json(
            {
                success:false,
                message:"User not found"
            },
            {
                status:500
            }
        )
    }
    const isVerifyCodeCorrect=user.verifyCode===code;
    const isCodeNotExpired=new Date(user.verifyCodeExpiry)>new Date();
    if(isVerifyCodeCorrect&&isCodeNotExpired){
        user.isVerified=true;
        await user.save();
        return Response.json(
            {
                success:true,
                message:"User verified successfully"
            },
            {status:200}
        )
    }else if(!isCodeNotExpired){
        return Response.json(
            {
                success:true,
                message:"Verification code expired,Please signIn again"
            },
            {
                status:400
            }
        )
    }else{
        return Response.json(
            {
                success:true,
                message:"Incorrect verification code"
            },
            {
                status:400
            }
        )
    }
    } catch (error) {
        console.log("Error verifying user",error)
        return Response.json(
            {
                success:false,
                message:"Error verifying user"
            },
            {
                status:500
            }
        )
    }
    

}