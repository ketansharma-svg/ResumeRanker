"use client"
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Resume from "@/public/Resume.png";
import { FileTextIcon } from "../../Lucide ICons/File";
import Link from "next/link";

export default function Header() {
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
        <Link href="/MainFolder/loginPage">Log in</Link>
      </Button>

      <Button className="bg-[#23d8c6] hover:bg-[#10efd9]" asChild>
        <Link href="/MainFolder/signInPage">Sign Up</Link>
      </Button>
    </div>

  </div>
</header>

  );
}


