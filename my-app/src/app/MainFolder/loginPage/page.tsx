"use client"
import { Button } from "@/components/ui/button"
import { FileTextIcon } from "lucide-react"
import Link from "next/link"
export default function LoginPage() {
  return (
    <div className="h-[91vh] bg-[#f6f8f9] flex items-center justify-center">
      <div>
         
      </div>
      <div className="flex flex-col items-center gap-6">

        {/* Logo */}
        <div className="flex items-center gap-2 text-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0e8ca2]">
            <FileTextIcon className="text-white" size={20} />
          </div>
          <h1 className="text-xl font-bold">
            Resume<span className="text-[#0e8ca2]">Ranker</span>
          </h1>
        </div>

     
        <div className="w-[400px] bg-white p-6 rounded-xl shadow-md">

          <form className="flex flex-col gap-4">
            <div className="text-center">
              <h2 className="font-bold text-lg text-[#0F1729]">
                Welcome Back
              </h2>
              <p className="text-[#8491a3] text-sm">
                Sign in to continue to your dashboard
              </p>
            </div>

     
            <div className="flex flex-col gap-1 mt-5">
              <label className="text-sm font-normal text-[#0F1729] ">Email Address</label>
              <input
                type="text"
                placeholder="you@example.com"
                className="
                  border border-gray-300 rounded-md
                  px-3 py-2
                  outline-none
                  focus:border-[#23d8c6]
                  focus:ring-1 focus:ring-[#23d8c6]/40
                "
              />
            </div>


            <div className="flex flex-col gap-1">
              <label className="text-sm font-normal text-[#0F1729]">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="
                  border border-gray-300 rounded-md
                  px-3 py-2
                  outline-none
                  focus:border-[#23d8c6]
                  focus:ring-1 focus:ring-[#23d8c6]/40
                "
              />
            </div>

          
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-[#65756B]">
                <input type="checkbox" id="rememberme" />
                Remember me
              </label>
              <a className="text-[#1DAFA1] underline cursor-pointer">
                Forgot password?
              </a>
            </div>

            {/* Button */}
            <Button
              className="
                bg-[#254076] text-white
                transition-transform duration-300
                hover: translate-y-0.5 hover:bg-[#152c57]
              "
            >
              Sign In
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 flex flex-col items-center gap-2">
            <span className="text-[#65758B] text-xs mb-10 mt-5">
              or continue with
            </span>
            <p className="text-[#65758B] text-sm">
              Don&apos;t have an account?{" "}
              <span className="text-[#1DAFA1] underline cursor-pointer">
                <Link href="/MainFolder/signInPage">
                Sign up free
                </Link>
              </span>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
