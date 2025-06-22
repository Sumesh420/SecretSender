import {z} from "zod";
export const usernamevalidation=z.string()
.min(3,"username contain atleast three characters")
.max(20,"Exceeds length 20 characters")
.regex(/^[A-Za-z0-9_]+$/,"Username must not contain special characters")

export const signUpSchema=z.object({
    username:usernamevalidation,
    email:z.string().email({message:"Please provide a valid email"}),
    password:z.string().min(6,"Password should contain atleast 6 characters")
});