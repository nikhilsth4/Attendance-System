import React from "react"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    const users = localStorage.getItem("users")
    const user = localStorage.getItem("user")
    const attendances = localStorage.getItem("attendances")

    if (!users) {
      localStorage.setItem("users", JSON.stringify([]))
    }
    if (!user) {
      localStorage.setItem("user", JSON.stringify({}))
    }
    if (!attendances) {
      localStorage.setItem("attendances", JSON.stringify([]))
    }
  }, [])
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer hideProgressBar autoClose={3000} />
    </>
  )
}

export default MyApp
