"use client"
import { useSession,signIn,signOut } from "next-auth/react";
export default function SignInPage(){
    const {data:session}=useSession()
    if(session){
        return (
            <>
            Signed as {session.user.email}
            <button onClick={()=>signOut()}>Sign Out</button>
            </>
        )
    }
    return (
        <>
        Not Signed In
        <button className="bg-orange-500 px-3 py-1 mt-3 rounded" onClick={()=>signIn()}>SignIn</button>
        </>
    )
}