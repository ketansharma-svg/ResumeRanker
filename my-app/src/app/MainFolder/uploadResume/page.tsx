
"use client";

import { redirect } from "next/navigation";
import { UploadResume } from "./UploadResume"; 
import { useAppSelector } from "../../Hooks";
export default function ProtectedUploadResumePage() {
  

  let value=useAppSelector((state)=>state.counter.isOnline)

  if(!value){

    redirect("/MainFolder/loginPage"); 
  }

 
  

  return(
    <>
       <UploadResume/>
    </>
  )
}
