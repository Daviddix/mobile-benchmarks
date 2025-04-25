import signupImage from "./assets/images/game-images.png"
import "./Signup.css"
import logoIcon from "./assets/icons/logo.svg"
import googleIcon from "./assets/icons/google.svg"
import { Link } from 'react-router'
import { useEffect } from "react"

function Signup() {
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:  import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("googleBtn"),
      { theme: "outline", size: "large" }
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
        console.log("Google sign-in successful");
      } else {
        console.error("Google sign-in failed with status:", res.status);
      }
    } catch (err) {
      console.error("Google login failed", err);
    }
  };

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
    
              <form className="signup">
              <div>
                  <label htmlFor="username">Username</label>
                  <input required type="text" id="username" placeholder="david445" />
                </div>
    
                <div>
                  <label htmlFor="email">Email address</label>
                  <input required type="email" id="email" placeholder="Nsikandavid@gmail.com" />
                </div>
    
                <div>
                  <label htmlFor="password">Password</label>
                  <input required type="password" id="password" />
                </div>
    
                <button className="primary">Signup</button>
              </form>
    
              <div className="other-signup-form">
    
              <p className="divider">OR</p>
    
              
    
              <button id="googleBtn">
              <img src={googleIcon} alt="google icon" />Continue with Google
              </button>
    
              <p>Already have an account? <Link to="/login">Login</Link></p>
              </div>
            </div>
          </div>
        </main>
      )
}

export default Signup