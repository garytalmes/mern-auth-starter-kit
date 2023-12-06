import { useEffect } from "react"
import Cookie from "js-cookie"


export default function Logout(){
  

  useEffect(() => {
    Cookie.remove("auth-cookie")
    window.location.href="/"
  },[])

  return (
    <>
    </>
  )
}