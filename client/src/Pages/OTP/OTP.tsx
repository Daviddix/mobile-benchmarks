import { useState, useEffect } from "react";
import "./OTP.css";
import { useSetAtom } from "jotai";
import { userInfoAtom } from "../../globals/states";
import { Navigate, useNavigate, useSearchParams } from "react-router";

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
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from") as "login" | "signup" | null
  
  // Add countdown timer state
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  // Timer effect to count down from 5 minutes
  useEffect(() => {
    // Only run if we have a valid email (user is on the OTP page)
    if (!userEmail) return;
    
    // Set up the interval to decrement the timer
    const timerId = setInterval(() => {
      setTimeLeft(prevTime => {
        // When the timer reaches 0, set the error
        if (prevTime <= 1) {
          clearInterval(timerId);
          setOtpError("Verification code has expired. Please request a new one.");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    // Clean up the interval when component unmounts
    return () => clearInterval(timerId);
  }, [userEmail]);
  
  // Helper function to format the remaining time as MM:SS
  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  async function verifyOtp(){
    if(!from) return
    try {
        setOtpError("")
        setVerificationStatus("verifying")
        const otpFetchUrl = from == "login" ? "http://localhost:3000/api/user/login/verify-otp" : "http://localhost:3000/api/user/signup/verify-otp"

        const response = await fetch(otpFetchUrl, {
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
      localStorage.removeItem("otp-email")
      navigate("/")

    } catch (error : any) {
        setVerificationStatus("error")
        setOtpError(error.message)
        console.log("otp error", error)
    }
  }

  if(!userEmail) return <Navigate to={"/"} />
  
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
              setOtpError("")
              const value = e.target.value.replace(/[^\d]/g, "");
              setOtp(value ? Number(value) : undefined);
            }}
            required
            maxLength={6}
            minLength={6}
            type="text"
            id="otp-input"
            className="otp-input"
            disabled={timeLeft === 0}
          />

          {otpError && <p className="error">{otpError}</p>}

          <button
          disabled={otp == undefined || otp.toString().length < 6 || verificationStatus == "verifying" || !!otpError || timeLeft === 0}
          >
            {verificationStatus == "verifying" ? "Verifying..." : "Verify"}
          </button>
        </form>

        <p className="otp-expire">
          Your verification code will expire in <strong>{formatTimeLeft()}</strong>
        </p>
      </div>
    </main>
  );
}

export default OTP;
