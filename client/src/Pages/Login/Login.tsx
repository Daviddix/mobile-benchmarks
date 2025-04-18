import { Link } from "react-router"
import loginImage from "./assets/images/game-images.png"
import "./Login.css"
import logoIcon from "./assets/icons/logo.svg"
import googleIcon from "./assets/icons/google.svg"

function Login() {
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

          <form className="login">

            <div>
              <label htmlFor="email">Email address</label>
              <input required type="email" id="email" placeholder="Nsikandavid@gmail.com" />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input required type="password" id="password" />
            </div>

            <button className="primary">Login</button>
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