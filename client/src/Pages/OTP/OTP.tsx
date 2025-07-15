import { useState } from "react";
import "./OTP.css";
import { useSetAtom } from "jotai";
import { userInfoAtom } from "../../globals/states";
import { useNavigate } from "react-router";

type verificationStatusType = "completed" | "error" | "verifying"

function OTP() {
  const [userEmail, setUserEmail] = useState(() =>
    localStorage.getItem("otp-email")
  );
  const [otp, setOtp] = useState<number | undefined>(undefined);
  const [verificationStatus, setVerificationStatus] = useState<verificationStatusType>("completed")
  const setUserInfo = useSetAtom(userInfoAtom)
  const [otpError, setOtpError] = useState("")
  const navigate = useNavigate()

  async function verifyOtp(){
    try {
        setVerificationStatus("verifying")
        const response = await fetch("http://localhost:3000/api/user/verify-otp", {
            credentials : "include",
            method : "POST",
            headers : {
                "Content-Type" : "Application/json"
            },
            body : JSON.stringify({otpEntered : otp})
        })

        const responseInJson = await response.json()

        if(!response.ok){
            setOtpError(responseInJson)
            throw new Error("Couldn't verify OTP", {cause : responseInJson})
        }

        console.log("OTP has been verified")
        setVerificationStatus("completed")

        const createdInfo : userInfo = {
        username : responseInJson.username,
        _id : responseInJson._id ,
        error : false,
        loading : false
      }

      setUserInfo(createdInfo)
      navigate("/")

    } catch (error) {
        setVerificationStatus("error")
        console.log("otp error", error)
    }
  }
  return (
    <main className="otp-main">
      <div className="otp-inner">
        <div className="otp-title">
          <h1>Enter Verification Code</h1>
          <p>{`A 6 digit verification code has been sent to your email address(${userEmail}). Please enter the code below to complete your account setup`}</p>
        </div>

        <form 
        onSubmit={(e)=>{
            e.preventDefault()
            verifyOtp()
        }}
        className="otp-form">
          <label htmlFor="otp-input">Verification Code</label>

          <input
            placeholder="Enter code"
            pattern="[0-9]*"
            value={otp === undefined ? "" : otp}
            onChange={(e) => {
              const value = e.target.value.replace(/[^\d]/g, "");
              setOtp(value ? Number(value) : undefined);
            }}
            required
            maxLength={6}
            minLength={6}
            type="text"
            id="otp-input"
            className="otp-input"
          />

          <button
          disabled={otp == undefined || otp.toString().length < 6 || verificationStatus == "verifying"}
          >
            {verificationStatus == "verifying" ? "Verifying..." : "Verify"}
          </button>
        </form>

        <p className="otp-expire">
          Your verification code will expire in <strong>5 Minutes</strong>
        </p>
      </div>
    </main>
  );
}

export default OTP;
