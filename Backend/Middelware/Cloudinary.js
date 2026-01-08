import { v2 as cloudinary } from 'cloudinary'
import "dotenv/config"
 cloudinary.config({ 
  cloud_name: process.env.Cloud_Name, 
  api_key: process.env.Cloudinary_API_KEY, 
  api_secret: process.env.Cloud_Secret_API_KEY
});

export default cloudinary;



// import Cloudinary from "../Middelware/Cloudinary.js";

// export function uploadToCloudinary(buffer) {
//   return new Promise((resolve, reject) => {
//     const stream = Cloudinary.uploader.upload_stream(
//       { resource_type: "auto" },
//       (error, result) => {
//         if (error) reject(error);
//         else resolve(result);
//       }
//     );

//     stream.end(buffer);
//   });
// }