"use client"
import axios from "axios"
const isProduction = process.env.NODE_ENV === "production"
console.log("Running in production?", isProduction)
// Pick the base URL depending on environment
const baseURL = isProduction
  ? "https://resumeranker-jxh5.onrender.com"
  : "http://localhost:5000"

console.log("Axios baseURL:", baseURL)

const instance = axios.create({
  baseURL,          
  withCredentials: true, 
})

export default instance
