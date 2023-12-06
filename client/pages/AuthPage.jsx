import { useState, useEffect } from "react"
import Auth from "../components/Auth"

export default function AuthPage(){


  return (
    <div className="d-flex gap-5">
      <div>
        <Auth usage="signup" />
      </div>

      <div>
        <Auth usage="login" />
      </div>
    </div>
  )
}