import signupImage from "./assets/images/game-images.png"
import "./Signup.css"
import logoIcon from "./assets/icons/logo.svg"
import googleIcon from "./assets/icons/google.svg"
import { Link } from 'react-router'

function Signup() {
    return (
        <section className="signup-section">
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
    
              
    
              <button>
              <img src={googleIcon} alt="google icon" />Continue with Google</button>
    
              <p>Already have an account? <Link to="/login">Login</Link></p>
              </div>
            </div>
          </div>
        </section>
      )
}

export default Signup