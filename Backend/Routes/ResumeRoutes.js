import express from "express";
import { Resumes } from "../Controllers/ResumeRanker.js"
import { Login, Register } from "../Controllers/Auth.js";
import JwtVerify from "../Middelware/JwtVerify.js";
import { UserAuthenticated ,LogOutUser} from "../Controllers/Auth.js";
// import { upload } from "../Middelware/Multer.js";
import upload from "../Middelware/Multer.js";
import { ControllerGoogleAuth } from "../Controllers/Auth.js"
const router = express.Router();


router.post("/send/LoginUserOnly/Upload-Resume/Ranking/Score",JwtVerify,upload.array('files'), Resumes);
router.post("/send/Register",Register)
router.post("/send/get/login",Login)
router.get("/send/protected/Athentication/User",JwtVerify,UserAuthenticated)
router.post("/send/LoginUserOnly/Upload-Resume/Ranking/logoutsystem",JwtVerify,LogOutUser);
router.post("/send/LoginUserOnly/Upload-Resume/Ranking/google-auth",ControllerGoogleAuth)
export default router;
