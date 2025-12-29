import { createRequire } from "module";
import mammoth from "mammoth";
import {PDFDocument} from "pdf-lib"
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

export async function extractText(file) {
 try{
  
  if (file.mimetype === "application/pdf") {
    let pdfbytes=  await PDFDocument.load(file.buffer,{ignoreEncryption:true})

     const fixedpdfBytes= await pdfbytes.save();
    const data = await pdfParse(fixedpdfBytes);
    return data.text||"";
  }

  if (
    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({
      buffer: file.buffer
    });
    return result.value||"";
  }

 
 }catch(err){
  console.log("Error extracting text:", err);
 }
}
