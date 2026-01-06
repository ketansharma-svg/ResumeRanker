"use client"
import axios from "axios"


const baseURL = process.env.NEXT_PUBLIC_RENDER_BACKEND || "http://localhost:5000"

const instance = axios.create({
  baseURL,
  withCredentials: true
})

export default instance
