"use client"
import instance from "@/src/axios"
import { GoogleLogin } from "@react-oauth/google"
import { toast } from "sonner"
import { useAppDispatch } from "../../Hooks"
import { setIsOnline } from "../../Features/Counter/Counter"









export default function LoginButton() {

const dispatch=useAppDispatch()
async function handelLogin(res){
          console.log("res",res.credential)
          try{
      let result =await instance.post("/ranking/send/LoginUserOnly/Upload-Resume/Ranking/google-auth",{token:res.credential},{withCredentials:true})
      console.log(result)
      if(result.status==200){
        toast("User Log in")
         
        dispatch(setIsOnline(true))

      }
          }catch(err){
            
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
