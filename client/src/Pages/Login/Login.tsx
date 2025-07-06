import { Link, useNavigate } from "react-router"
import loginImage from "./assets/images/game-images.png"
import "./Login.css"
import logoIcon from "./assets/icons/logo.svg"
import googleIcon from "./assets/icons/google.svg"
import { useEffect, useState } from "react"

declare const google: any;

declare global {
  interface Window {
    google?: any;
  }
}

type userLoginDetails = {
  password: string;
  email : string;
}

type loginFetchType = "loading" | "error" | "completed"

function Login() {
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState<userLoginDetails >({
    email : "",
    password : ""
  })
  const [loginFetchStatus, setLoginFetchStatus] = useState<loginFetchType>("completed")
  const [loginErrorMessage, setLoginErrorMessage] = useState("")
    const [googleIsAvailable, setGoogleIsAvailable] = useState(true)

  async function logUserIn(){
    try{
      setLoginFetchStatus("loading")
      setLoginErrorMessage("")
      const rawFetch = await fetch("http://localhost:3000/api/user/login", {
        method : "POST",
        body : JSON.stringify(userDetails),
        headers : {
          "Content-Type" : "application/json"
        },
        credentials : "include"
      })

      const responseInJson = await rawFetch.json()

      if(!rawFetch.ok){
        setLoginErrorMessage(responseInJson.message)
        throw new Error("Signup Error", {cause : responseInJson})
      }

      console.log("signup successful")
      setLoginFetchStatus("completed")
      navigate("/")
    }catch(err){
      setLoginFetchStatus("error")
    }
  }

  useEffect(() => {
    /* global google */
    if(!window.google){
      setGoogleIsAvailable(false)
      return
    }

      setGoogleIsAvailable(true)
    
    google.accounts.id.initialize({
      client_id:  import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("loginGoogleBtn"),
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
      const res = await fetch("http://localhost:3000/api/user/login/google", {
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
        console.error("Google log-in failed with status:", res.status);
      }
    } catch (err) {
      console.error("Google login failed", err);
    }
  };


  return (
    <main className="login-section">
      <div className="login-text-container">
        <div className="login-top-text">
          <div className="logomark">
            <img src={logoIcon} alt="logo" />
            Mobile Benchmarks</div>

          <h1>Create an Account to Access <span>Exclusive Features</span></h1>

          <p>Contribute to our database of compatible phones and games, climb the leaderboard, and explore even more powerful tools available only to registered members.</p>
        </div>

        <img className="auth-image" src={loginImage} />
      </div>

      <div className="login-form-container">
        <div className="login-form-inner">
          <h1>Welcome Back</h1>

          <form 
          onSubmit={(e)=>{
            e.preventDefault()
            logUserIn()
          }}
          className="login">

            <div>
              <label htmlFor="email">Email address</label>
              <input 
              value={userDetails.email}
               onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                setUserDetails((prev)=>({
                  ...prev,
                  [e.target.name] : e.target.value
                }))
              }}
              required 
              name="email"
              type="email" 
              id="email" 
              placeholder="Nsikandavid@gmail.com" />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input 
              value={userDetails.password}
               onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                setUserDetails((prev)=>({
                  ...prev,
                  [e.target.name] : e.target.value
                }))
              }}
              name="password"
              required 
              type="password" 
              id="password" />
            </div>

            {
                  loginErrorMessage !== "" && 
                  <p className="error">{loginErrorMessage}</p>
            }

            <button disabled={loginFetchStatus === "loading"} className="primary">
              {
                loginFetchStatus == "loading" ?
                "Loading..."
                :
                "Login"
              }
              </button>
          </form>

          { googleIsAvailable && <div className="other-login-form">

          <p className="divider">OR</p>

          

          <button id="loginGoogleBtn">
          <img src={googleIcon} alt="google icon" />Continue with Google</button>

          <p>Don't have an account? <Link to="/signup">Signup</Link></p>
          </div>}
        </div>
      </div>
    </main>
  )
}

export default Login