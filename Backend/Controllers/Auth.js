import User from "../Models/Auth.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { OAuth2Client } from "google-auth-library";
import sgmail from "@sendgrid/mail"

const client = new OAuth2Client(process.env.GOOGLE_ID)
sgmail.setApiKey(process.env.SENDGRID_API_KEY);


export async function Register(req, res) {
  try {
    const { name, email, password } = req.body
    console.log(name, email, password)
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10)
    console.log("salt", salt)
    let hash = await bcrypt.hash(password, salt)
    console.log("hash", hash)








    const user = await User.create({
      username: name,
      email,
      password: hash
    });
    console.log("user", user)
const msg = {
  to:email ,
  from:sgmail, 
  replyTo: 'ketan.sharma@W3eraa.com',
  subject: 'Sending the email only for Fun basis',
  text: 'WELCOME to resumeRanker',
  html: '<strong>and easy to do anywhere</strong>',
};
sgmail
  .send(msg)
  .then(() => {}, error => {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  });


    res.status(201).json({ message: "User created succesfuylly" })

  } catch (err) {
    res.status(500).json({ message: "Internal Server Error " })
  }

}


export async function Login(req, res) {
  try {
    const { email, password } = req.body


    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: "Unauthorized User" })
    }


    const checkAuth = await bcrypt.compare(password, user.password)
    if (!checkAuth) {
      return res.status(400).json({ message: "Password does not match" })
    }


    const token = jwt.sign(
      { id: user._id },
      process.env.Secret_Key,
      { expiresIn: "7d" }
    )

const isProduction = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: isProduction,
      secure: isProduction,
      sameSite: isProduction? "none":"lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.json({ success: true })

  } catch (err) {
    console.error("LOGIN ERROR:", err)
    return res.status(500).json({ message: "Internal Server Error" })
  }
}


export async function UserAuthenticated(req, res) {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized User" })
    }
    res.status(200).json({ message: "User Authenticated Successfully" })
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error " })
  }
}


export async function LogOutUser(req, res) {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    res.clearCookie("login_access_token_wrank", {
      httpOnly: isProduction,
      secure: isProduction,
      sameSite: isProduction? "none":"lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    })


    res.clearCookie("login_refresh_token_wrank", {
      httpOnly:isProduction,
      secure: isProduction,
      sameSite: isProduction? "none":"lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    })


    res.clearCookie("token", {
      httpOnly: isProduction,
      secure: isProduction,
      sameSite: isProduction? "none":"lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.status(200).json({ message: "User logged out successfully" })
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error " })
  }
}





// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function ControllerGoogleAuth(req, res) {
  try {
    const { token } = req.body;

   console.log("token",token)
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

  
    let user = await User.findOne({ email });

    if (!user) {
     
      user = await User.create({
        email,
        username:name,
        avatar: picture,
        googleId: payload.sub,
      });
    }

    
    const authToken = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

   const isProduction = process.env.NODE_ENV === "production";
    res.cookie("token", authToken, {
      httpOnly: isProduction,
      secure: isProduction,
      sameSite: isProduction? "none":"lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

  
    return res.status(200).json({
      message: "Google login successful",
      user,
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Google auth failed" });
  }
}
