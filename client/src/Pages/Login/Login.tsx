import { Link, useNavigate } from "react-router"
import loginImage from "./assets/images/game-images.png"
import "./Login.css"
import logoIcon from "./assets/icons/logo.svg"
import googleIcon from "./assets/icons/google.svg"
import { useState } from "react"

function Login() {
  type userLoginDetails = {
    password: string;
    email : string;
  }

  type loginFetchType = "loading" | "error" | "completed"

  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState<userLoginDetails >({
    email : "",
    password : ""
  })
  const [loginFetchStatus, setLoginFetchStatus] = useState<loginFetchType>("completed")
  const [loginErrorMessage, setLoginErrorMessage] = useState("")

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

          <div className="other-login-form">

          <p className="divider">OR</p>

          

          <button>
          <img src={googleIcon} alt="google icon" />Continue with Google</button>

          <p>Don't have an account? <Link to="/signup">Signup</Link></p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login