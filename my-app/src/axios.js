"use client"
import axios from "axios"

// Pick the base URL depending on environment
const baseURL = process.env.NEXT_PUBLIC_RENDER_BACKEND || "http://localhost:5000"
console.log("Axios baseURL:", baseURL)

const instance = axios.create({
  baseURL,          // dynamic URL (Render or localhost)
  withCredentials: true, // send cookies for auth
})

export default instance
