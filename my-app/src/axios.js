"use client"
import axios from "axios"


const baseURL = process.env.NEXT_PUBLIC_RENDER_BACKEND 
console.log("baseURL",baseURL)
const instance = axios.create({
   baseURL: "https://resumeranker-jxh5.onrender.com",
  withCredentials: true
})

export default instance
