// import multer from "multer";
// import path from "path"
// import fs from "fs"

// import { fileURLToPath } from "url";

// // __filename and __dirname in ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// let uploadStorage=path.join(__dirname,"my-uploads")

// // if(!fs.existsSync(uploadStorage)){
//     fs.mkdirSync(uploadStorage,{recursive:true})
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadStorage)
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//   }
// })

// const upload = multer({ storage: storage ,
//     limits:{fileSize:25*1024*1024}
// })

// export default upload



import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024
  }
});

export default upload;
