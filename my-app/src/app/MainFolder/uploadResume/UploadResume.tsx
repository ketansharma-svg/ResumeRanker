"use client";

import { Upload, Users, Sparkles, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Textarea } from "../../../../components/ui/textarea";
import { useRef, useState } from "react";
import { toast } from "sonner";
import instance from "@/src/axios";
import { span } from "framer-motion/client";
import { Span } from "next/dist/trace";
import { useAppSelector } from "../../Hooks";
export function UploadResume() {


  interface RankedResume {
    fileName: string;
    finalScore: number;
    matchedSkills: string[];
    missingSkills: string[];

    experienceLevel: string

  }

  const [folder, setFolder] = useState<File[]>([]);
  const [textarea, setTextarea] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [Uploadedresumes, setUploadedResumes] = useState<RankedResume[]>([])
  const fileInputRef = useRef<HTMLInputElement | null>(null);





  function handleFolder(filelist: FileList) {
    const filesArray = Array.from(filelist);

    if (folder.length + filesArray.length > 15) {
      toast.error("You can upload maximum 15 resumes only");
      return;
    }

    const validFiles = filesArray.filter(
      (file) =>
        file.type === "application/pdf" ||
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );

    if (validFiles.length !== filesArray.length) {
      toast.error("Only PDF or DOCX files allowed");
    }

    setFolder((prev) => [...prev, ...validFiles]);

    if (validFiles.length > 0) {
      toast.success(`${validFiles.length} resume(s) added`);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }



  async function handelResume() {
    if (!textarea || folder.length === 0) return;

    setIsDownloading(true);

    const formData = new FormData();
    folder.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("jobDescription", textarea);

    try {
      let res = await instance.post(
        "/ranking/send/LoginUserOnly/Upload-Resume/Ranking/Score",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response", res.data.resumes)
      if (res.data.resumes) {
        setUploadedResumes(res.data.resumes)
        toast.success("Resumes uploaded & ranked successfully");
        setFolder([]);
        setTextarea("");
      }

    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">
      <div className="space-y-6">

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Upload Resumes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <label htmlFor="resume-upload" className="cursor-pointer">
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFolder(e.dataTransfer.files);
                }}
                className="flex h-40 flex-col items-center justify-center rounded-xl border-2 border-dashed hover:border-[#0f88ae] hover:bg-emerald-50 text-center"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <Upload className="h-6 w-6 text-emerald-600" />
                </div>

                <p className="text-sm font-medium text-slate-700">
                  Drag & drop resumes here
                </p>
                <p className="text-xs text-slate-500">
                  PDF or DOCX • Max 15 files
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  hidden
                  id="resume-upload"
                  accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={(e) => {
                    if (e.target.files) {
                      handleFolder(e.target.files);
                    }
                  }}
                />
              </div>
            </label>
          </CardContent>
        </Card>


        {folder.length > 0 && (
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                Uploaded Resumes ({folder.length}/15)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-48 overflow-y-auto">
              {folder.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-md border p-2 text-sm"
                >
                  <div>
                    <p className="font-medium truncate max-w-[220px]">
                      {file.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setFolder((prev) =>
                        prev.filter((_, i) => i !== index)
                      )
                    }
                    className="text-xs text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <Card className="rounded-2xl">
          <CardHeader className="flex flex-row items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
              <Sparkles className="h-4 w-4 text-emerald-600" />
            </div>
            <CardTitle className="text-lg font-semibold">
              Job Description
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={textarea}
              onChange={(e) => setTextarea(e.target.value)}
              placeholder="Paste job description here..."
              className="h-48 resize-none border-2 focus:border-[#0e8ca2]"
            />
          </CardContent>
        </Card>

        <Button
          onClick={handelResume}
          disabled={isDownloading || folder.length === 0 || !textarea}
          className="w-full rounded-xl bg-[#28457d] py-6 text-base font-semibold hover:bg-[#152c57]"
        >
          {isDownloading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Analyze & Rank Resumes
            </>
          )}
        </Button>
      </div>

      <Card className="flex  rounded-2xl">
        {Uploadedresumes.length > 0 ? (
          <CardContent className="w-full space-y-4">
            {Uploadedresumes.map((item, index) => (
              <div
                key={index}
                className="rounded-xl border p-4 space-y-2"
              >
                <h1 className="font-semibold text-lg">
                  {item.fileName}
                </h1>

                <p className="text-sm flex align items-center justify-between">
                 <div>
                   <strong>Final Score:</strong>{" "}
                  <span className="text-emerald-600">
                    {item.finalScore}
                  </span>
                 </div>
                 <div>
 <strong>experince level:</strong>{" "}
                  <span className="text-emerald-600">
                    {item.experienceLevel}
                  </span>
                 </div>
                 

                </p>

                <div>
                  <p className="font-medium text-sm">Matched Skills:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {item.matchedSkills.map((skill, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-medium text-sm text-red-600">
                    Missing Skills:
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {item.missingSkills.map((skill, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        ) : (
          <CardContent className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
              <Users className="h-7 w-7 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold">
              Ready to Rank Candidates
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Upload resumes and get AI-powered ranking instantly.
            </p>
          </CardContent>
        )}
      </Card>

    </div>
  );
}