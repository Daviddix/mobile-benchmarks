import signupImage from "./assets/images/game-images.png"
import "./Signup.css"
import logoIcon from "./assets/icons/logo.svg"
import googleIcon from "./assets/icons/google.svg"
import { Link, useNavigate } from 'react-router'
import { useEffect, useState } from "react"

declare const google: any;

declare global {
  interface Window {
    google?: any;
  }
}


type userSignupDetails = {
  username : string; 
  password: string;
  email : string;
}
type signupFetchType = "loading" | "error" | "completed"

function Signup() {
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState<userSignupDetails >({
    username : "",
    email : "",
    password : ""
  })
  const [signupFetchStatus, setSignupFetchStatus] = useState<signupFetchType>("completed")
  const [signupErrorMessage, setSignupErrorMessage] = useState("")
  const [googleIsAvailable, setGoogleIsAvailable] = useState(true)
  
  useEffect(() => {

     if(!window.google){
      setGoogleIsAvailable(false)
      return
    }

      setGoogleIsAvailable(true)
      google.accounts.id.initialize({
        client_id:  import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });
  
      google?.accounts.id.renderButton(
        document.getElementById("googleBtn"),
        {
          theme: "outline",         // or "filled_blue", "filled_black"
          size: "large",            // "small" | "medium" | "large"
          shape: "pill",            // "rectangular" | "pill" | "circle"
          width: "100%",            // Sets the full width
          logo_alignment: "center", // or "left"
          text: "continue_with",    // or "signin_with", "signup_with"
        }
      );
 
  }, []);

  const handleCredentialResponse = async (response : any) => {
    try {
      const res = await fetch("http://localhost:3000/api/user/signup/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // This is equivalent to axios's withCredentials: true
        body: JSON.stringify({ credential: response.credential }),
      });
  
      if (res.ok) {
        // Handle success, e.g., redirect or update UI
        navigate("/")
      } else {
        console.error("Google sign-in failed with status:", res.status);
      }
    } catch (err) {
      console.error("Google login failed", err);
    }
  };

  async function signUserUp(){
    try{
      setSignupFetchStatus("loading")
      setSignupErrorMessage("")
      const rawFetch = await fetch("http://localhost:3000/api/user/signup", {
        method : "POST",
        body : JSON.stringify(userDetails),
        headers : {
          "Content-Type" : "application/json"
        },
        credentials : "include"
      })

      const responseInJson = await rawFetch.json()

      if(!rawFetch.ok){
        setSignupErrorMessage(responseInJson.message)
        throw new Error("Signup Error", {cause : responseInJson})
      }

      console.log("signup successful")
      setSignupFetchStatus("completed")
      navigate("/")
    }catch(err){
      setSignupFetchStatus("error")
    }
  }

    return (
        <main className="signup-section">
          <div className="signup-text-container">
            <div className="signup-top-text">
              <div className="logomark">
                <img src={logoIcon} alt="logo" />
                Mobile Benchmarks</div>
    
              <h1>Create an Account to Access <span>Exclusive Features</span></h1>
    
              <p>Contribute to our database of compatible phones and games, climb the leaderboard, and explore even more powerful tools available only to registered members.</p>
            </div>
    
            <img className="auth-image" src={signupImage} />
          </div>
    
          <div className="signup-form-container">
            <div className="signup-form-inner">
              <h1>Create an Account!</h1>
    
              <form
              onSubmit={(e)=>{
                e.preventDefault()
                signUserUp()
              }}
              className="signup">
              <div>
                  <label htmlFor="username">Username</label>
                  <input 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                    setUserDetails((prev)=>({
                      ...prev,
                      [e.target.name] : e.target.value
                    }))
                  }}
                  value={userDetails.username}
                  required 
                  type="text" 
                  id="username" 
                  name="username" 
                  placeholder="david445" />
                </div>
    
                <div>
                  <label htmlFor="email">Email address</label>
                  <input 
                   onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                    setUserDetails((prev)=>({
                      ...prev,
                      [e.target.name] : e.target.value
                    }))
                  }}
                  value={userDetails.email}
                  name="email"
                  required type="email" id="email" placeholder="Nsikandavid@gmail.com" />
                </div>
    
                <div>
                  <label htmlFor="password">Password</label>
                  <input 
                  required 
                   onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                    setUserDetails((prev)=>({
                      ...prev,
                      [e.target.name] : e.target.value
                    }))
                  }}
                  value={userDetails.password}
                  name="password"
                  type="password" 
                  id="password" />
                </div>

                {
                  signupErrorMessage !== "" && 
                  <p className="error">{signupErrorMessage}</p>
                }
    
                <button disabled={signupFetchStatus === "loading"} className="primary">
                  {
                    signupFetchStatus == "loading" ? 
                    "Loading..."
                    :
                    "Signup"
                  }
                  </button>
              </form>
    
              {googleIsAvailable && <div className="other-signup-form">
    
              <p className="divider">OR</p>
    
              
    
              <button id="googleBtn">
              <img src={googleIcon} alt="google icon" />Continue with Google
              </button>
    
              <p>Already have an account? <Link to="/login">Login</Link></p>
              </div>}

            </div>
          </div>
        </main>
      )
}

export default Signup