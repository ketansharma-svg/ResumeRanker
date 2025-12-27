"use client";

import { Upload, Users, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Textarea } from "../../../../components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import instance from "@/src/axios";
// import { useRef } from "react";

export default function uploadResume() {
  const [folder, setFolder] = useState<File[]>([])
  const [textarea, setTextarea] = useState<string>("")

  // let  inputRef=useRef<HTMLInputElement|null>(null)
  function handleFolder(filelist: FileList) {
    const value = Array.from(filelist).filter(
      (item) =>
        item.type === "application/pdf" ||
        item.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    console.log("value", value)
    if (value.length !== filelist.length) {
      alert("Only PDF or DOCX files allowed");
    }

    setFolder(value);
  }
  console.log("folder", folder)



  async function handelResume() {
    if (textarea) {
      let formData = new FormData()
      folder.forEach(files => {
        formData.append("files", files)
      })

      formData.append("textarea", textarea)
      console.log(formData)


      try {

        let res = await instance.post("/ranking/send/LoginUserOnly/Upload-Resume/Ranking/Score", formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        console.log("response", res)
      } catch (err) {
        toast("Error Found")
      }




    }

  }










  return (
    <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">

      <div className="space-y-6">

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Upload Resumes</CardTitle>
          </CardHeader>
          <CardContent >
            <label htmlFor="resume-upload" className="cursor-pointer">
              <div


                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  handleFolder(e.dataTransfer.files)
                  console.log(e.dataTransfer.files)
                }}
              >


                <div className="flex h-40 flex-col items-center justify-center rounded-xl border-2 border-dashed hover:border-[#0f88ae] hover:bg-emerald-50 text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                    <Upload className="h-6 w-6 text-emerald-600 transition transition-transform duration-300" />
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      id="resume-upload"
                      accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={(e) => {
                        if (e.target.files) {
                          handleFolder(e.target.files);
                        }
                      }}
                    />

                  </div>
                  <p className="text-sm font-medium text-slate-700">
                    Drag & drop resumes here
                  </p>
                  <p className="text-xs text-slate-500">
                    or click to browse • PDF files only
                  </p>
                </div>
              </div>
            </label>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader className="flex flex-row items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
              <Sparkles className="h-4 w-4 text-emerald-600" />
            </div>
            <CardTitle className="text-lg font-semibold">Job Description</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea

              required

              onChange={(e) => setTextarea(e.target.value)}
              placeholder={`Paste the job description here...

Example:
We are looking for a Frontend Developer with:
• 3+ years of experience with React
• Strong TypeScript skills
• Experience with REST APIs
• Knowledge of modern CSS frameworks`}
              className="h-48                 
    w-full              
    border-2 border-gray-300
    rounded-md
    p-2
    overflow-y-auto     
    overflow-x-hidden    
    resize-none           
    focus:outline-none
    focus:border-[#0e8ca2]
    focus:ring-0 "
            />
            <p className="text-xs text-slate-500">
              Include required skills, experience level, and key responsibilities for better matching accuracy.
            </p>
          </CardContent>
        </Card>

        {/* CTA Button */}
        <Button className="w-full rounded-xl bg-[#28457d] py-6 text-base font-semibold transition transition-transform duration-300
                hover:translate-y-0.5 hover:bg-[#152c57]"   onClick={handelResume}>
          <Sparkles className="mr-2 h-4 w-4" /> Analyze & Rank Resumes
        </Button>
      </div>

      {/* RIGHT COLUMN */}
      <Card className="flex items-center justify-center rounded-2xl">
        <CardContent className="flex flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
            <Users className="h-7 w-7 text-emerald-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">
            Ready to Rank Candidates
          </h3>
          <p className="mt-2 max-w-xs text-sm text-slate-500">
            Upload resumes and provide a job description to see AI-powered rankings and insights.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
