"use client"
import instance from "@/src/axios"
import { GoogleLogin } from "@react-oauth/google"
import { toast } from "sonner"
import { useAppDispatch } from "../../Hooks"
import { setIsOnline } from "../../Features/Counter/Counter"
import { useRouter } from "next/navigation"








export default function LoginButton() {
let router=useRouter()
const dispatch=useAppDispatch()
async function handelLogin(res:any){
          console.log("res",res.credential)
          try{
  
      let result =await instance.post("/ranking/send/LoginUserOnly/Upload-Resume/Ranking/google-auth",{token:res.credential},{withCredentials:true})
      console.log(result,"hello")
      if(result.status==200){
        toast("User Log in")
         
        dispatch(setIsOnline(true))
         router.push("/MainFolder/uploadResume")
      }
          }catch(err){
              
              console.log("login error")
          }
  
    }



  return (
    
      <GoogleLogin
        onSuccess={(res)=>handelLogin(res)}
        onError={() => {
          console.log("Failed");
        }}
      />

  )
}
