  "use client"

  import Image from "next/image";
  import { Sparkles } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { Badge } from "@/components/ui/badge";
  import Resume from "@/public/Resume.png";
  import { FileTextIcon } from "../../Lucide ICons/File";
  import Link from "next/link";
  import React, { use, useEffect } from "react";
  import instance from "@/src/axios";
import { span } from "framer-motion/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../Hooks";
import { setIsOnline } from "../Features/Counter/Counter";

  export default function Header() {
      // const [isOnline,setIsoffline]=useState(false)
    let isOnline=useAppSelector(state=>state.counter.isOnline)
    console.log("isOnline value in header",isOnline)
    const dispatch=useAppDispatch()

   const router=useRouter()

  
  const checkAuth = async () => {
    try {
      const res = await instance.get("/ranking/send/protected/Athentication/User", {
        withCredentials: true
      });
      console.log("response from auth user", res.data);
      
      if (res.data.message === "User Authenticated Successfully") {
        dispatch(setIsOnline(true));
        console.log("user is authenticated")
        router.push("/");
      } else {
        dispatch(setIsOnline(false))
      }
    } catch (err) {
      dispatch(setIsOnline(false));
    }
  }

  checkAuth();

  useEffect(() => {
    checkAuth();
  }, []);



const handelLogout = async () => {
  try {
    await instance.post("/ranking/send/LoginUserOnly/Upload-Resume/Ranking/logoutsystem", {}, { withCredentials: true });
    dispatch(setIsOnline(false));
    router.push("/MainFolder/loginPage"); // redirect after logout
  } catch (err) {
    console.log("error in Logout", err);
  }
};







    return (
      <header className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur-md">
    <div className="flex items-center justify-between h-16 px-6">

      {/* Logo */}
      <Link href={"/"}>
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0e8ca2]">
          <FileTextIcon className="text-white" size={20} />
        </div>
        <h1 className="text-xl font-bold">
          Resume<span className="text-[#0e8ca2]">Ranker</span>
        </h1>
      </div>
      </Link>

      {/* Nav */}
      <div className="flex items-center gap-6 text-xs">
        <Link href="/">Home</Link>
        <Link href="/MainFolder/uploadResume">Upload Resume</Link>
      </div>

      {/* Auth */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" asChild  className="hover:text-[#23d8c6] hover:bg-[#e3fdfa]">
          { isOnline?<span onClick={handelLogout} className="cursor-pointer">Log out</span>: <Link href="/MainFolder/loginPage">Log in</Link>

          }
        </Button>

        <Button className="bg-[#23d8c6] hover:bg-[#10efd9]" asChild>
          <Link href="/MainFolder/signInPage">Sign Up</Link>
        </Button>
      </div>

    </div>
  </header>

    );
  }


