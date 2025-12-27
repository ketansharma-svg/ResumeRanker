import User from "../Models/Auth.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
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


    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
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
    res.clearCookie("login_access_token_wrank", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    })


    res.clearCookie("login_refresh_token_wrank",{
      httpOnly:true,
      secure:false,
      sameSite:"lax",
      maxAge:7*24*60*60*1000  
    })

    
    res.clearCookie("token",{
      httpOnly:true,
      secure:false,
      sameSite:"lax",
      maxAge:7*24*60*60*1000  
    })
    res.status(200).json({ message: "User logged out successfully" })
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error " })
  }
}