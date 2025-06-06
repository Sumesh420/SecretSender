import {z} from "zod";

export const messageSchema=z.object({
    content:z.string()
    .min(10,{message:"message should contain atleast 10 characters"})
});