"use client"
import { Sparkles, ZapIcon, Target } from "lucide-react";
import { useEffect } from 'react'
import { Button } from "@/components/ui/button";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from "next/link";

export default function Home() {

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: false,        // scroll pe baar-baar aaye
      mirror: false,

    })
  }, [])


  return (
    <>
      <section className="relative overflow-hidden bg-white min-h-144" >


        <div className="pointer-events-none absolute bottom-0 inset-x-0 h-56
        bg-gradient-to-t from-[#f3fdfd] via-[#f5fcfc] to-transparent" />


        <div className="relative z-10 mx-auto max-w-4xl px-6 py-28 text-center">


          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full
          bg-[#e3fdfa] px-4 py-2 text-sm text-[#0d968b]" data-aos="zoom-in">
            <Sparkles size={14} />
            AI-Powered Resume Analysis
          </div>


          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Find the{" "}
            <span className="text-[#0d968b]">Perfect Candidate</span>{" "}
            in Seconds
          </h1>


          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-500 mb-5" data-aos="fade-up">
            Upload resumes and your job description. Our AI analyzes,
            scores, and ranks candidates based on skill match, experience,
            and relevance.
          </p>

          <div  data-aos="fade-up">
            <span className="mr-5">
               <Link href="/MainFolder/uploadResume">
              <Button  className="bg-[#28457d] text-white font-bold p-2 hover:bg-[#152c57]  transition transition-transform duration-300 ease-in-out hover:translate-y-0.5" size="lg">
             
                Analyze My Resume
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              
              </Button>
            </Link>

            </span>

            
            <span>

              <Link href={"/MainFolder/signInPage"}>
                <Button variant='outline' className="hover:bg-white hover:text-[#0d968b] font-bold p-2 w-30 h-10 border-2 hover:border-[#0d968b]">
              Sign In
            </Button>
</Link>
            </span>
                      </div>


          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-600">

            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e3fdfa]">
                <ZapIcon size={16} className="text-emerald-600" />
              </span>
              Instant Analysis
            </div>

            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e3fdfa]">
                <Target size={16} className="text-emerald-600" />
              </span>
              Accurate Match
            </div>

            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e3fdfa]">
                <Sparkles size={16} className="text-emerald-600" />
              </span>
              AI Insights
            </div>

          </div>
        </div>
      </section>

      <section className="bg-white py-28" data-aos="zoom-in">
        <div className="mx-auto max-w-6xl px-6 text-center">

          
          <h2 className="text-4xl font-bold text-slate-900">
            How It Works
          </h2>

          <p className="mt-4 text-lg text-slate-500">
            Three simple steps to transform your resume into a job-winning document
          </p>

         
          <div className="mt-16 grid gap-12 sm:grid-cols-3" >

            
            <div className="flex flex-col items-center group">
              <div className="flex h-16 w-16 items-center justify-center
              rounded-full bg-[#1f3b6d] text-xl font-bold text-white transition transition-transform duration-300 ease-in-out  group-hover:scale-110  shadow-lg">
                1
              </div>

              <h3 className="mt-6 text-lg font-semibold text-slate-900">
                Upload Resume
              </h3>

              <p className="mt-2 max-w-xs text-sm text-slate-500 cursor-pointer font-thin">
                Drag and drop your resume in PDF or DOCX format
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center group">
              <div className="flex h-16 w-16 items-center justify-center
              rounded-full bg-[#1f3b6d] text-xl font-bold text-white transition transition-transform duration-300 ease-in-out group-hover:scale-110 shadow-lg">
                2
              </div>

              <h3 className="mt-6 text-lg font-semibold text-slate-900">
                AI Analysis
              </h3>

              <p className="mt-2 max-w-xs text-sm text-slate-500 cursor-pointer font-thin">
                Our AI scans and evaluates your resume instantly
              </p>
            </div>

        
            <div className="flex flex-col items-center group">
              <div className="flex h-16 w-16 items-center justify-center
              rounded-full bg-[#1f3b6d] text-xl font-bold text-white transition transition-transform duration-300 ease-in-out group-hover:scale-110 shadow-lg">
                3
              </div>

              <h3 className="mt-6 text-lg font-semibold text-slate-900">
                Get Results
              </h3>

              <p className="mt-2 max-w-xs text-sm text-slate-500 cursor-pointer font-thin">
                Receive detailed scores and improvement tips
              </p>
            </div>

          </div>
        </div>
      </section>

      <div className="py-16 px-8" data-aos="zoom-in">
        <h2 className="text-3xl font-bold text-center mb-2">
          Powerful Features
        </h2>
        <p className="text-center text-gray-500 mb-12" data-aos="fade-up">
          Everything you need to create a resume that gets noticed
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-md" data-aos="fade-up" data-aos-delay="0">
            <div className="w-12 h-12 bg-teal-400 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-file-search-corner-icon lucide-file-search-corner text-white" ><path d="M11.1 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.589 3.588A2.4 2.4 0 0 1 20 8v3.25" className="text-white" /><path d="M14 2v5a1 1 0 0 0 1 1h5" className="text-white" /><path d="m21 22-2.88-2.88" className="text-white" /><circle cx="16" cy="17" r="3" className="text-white" /></svg>
            </div>
            <h3 className="font-medium text-lg mb-2">Smart Analysis</h3>
            <p className="text-gray-500 text-sm">
              AI-powered resume parsing that understands context and identifies key strengths.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md" data-aos="fade-up" data-aos-delay="100">
            <div className="w-12 h-12 bg-teal-400 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chart-column-increasing-icon lucide-chart-column-increasing text-white" ><path d="M13 17V9" className="text-white" /><path d="M18 17V5" className="text-white" /><path d="M3 3v16a2 2 0 0 0 2 2h16" className="text-white" /><path d="M8 17v-3" className="text-white" /></svg>
            </div>
            <h3 className="font-medium text-lg mb-2">Detailed Scoring</h3>
            <p className="text-gray-500 text-sm">
              Get comprehensive scores across multiple categories with actionable insights.
            </p>
          </div>



          <div className="p-6 bg-white rounded-xl shadow-md" data-aos="fade-up" data-aos-delay="0">
            <div className="w-12 h-12 bg-teal-400 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-target-icon lucide-target text-white" ><circle cx="12" cy="12" r="10" className="text-white" /><circle cx="12" cy="12" r="6" className="text-white" /><circle cx="12" cy="12" r="2" className="text-white" /></svg>
            </div>
            <h3 className="font-medium text-lg mb-2">ATS Optimization</h3>
            <p className="text-gray-500 text-sm">
              Ensure your resume passes Applicant Tracking Systems with our keyword analysis..
            </p>
          </div>


          <div className="p-6 bg-white rounded-xl shadow-md" data-aos="fade-up" data-aos-delay="0">
            <div className="w-12 h-12 bg-teal-400 rounded-lg flex items-center justify-center mb-4">
              <ZapIcon size={24} className="text-white" />
            </div>
            <h3 className="font-medium text-lg mb-2">Instant Results</h3>
            <p className="text-gray-500 text-sm">
              Receive detailed feedback within seconds of uploading your resume.
            </p>
          </div>


          <div className="p-6 bg-white rounded-xl shadow-md" data-aos="fade-up" data-aos-delay="0">
            <div className="w-12 h-12 bg-teal-400 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shield-icon lucide-shield text-white"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" className="text-white" /></svg>
            </div>
            <h3 className="font-medium text-lg mb-2">Secure & Private</h3>
            <p className="text-gray-500 text-sm">
              Your data is encrypted and never shared. We prioritize your privacy.
            </p>
          </div>


          <div className="p-6 bg-white rounded-xl shadow-md" data-aos="fade-up" data-aos-delay="0">
            <div className="w-12 h-12 bg-teal-400 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trending-up-icon lucide-trending-up text-white" ><path d="M16 7h6v6" className="text-white" /><path d="m22 7-8.5 8.5-5-5L2 17" className="text-white" /></svg>
            </div>
            <h3 className="font-medium text-lg mb-2">Career Insights</h3>
            <p className="text-gray-500 text-sm">
              Discover trending skills in your industry and optimize your profile.
            </p>
          </div>

        
        </div>
      </div>

    </>

  );
}
