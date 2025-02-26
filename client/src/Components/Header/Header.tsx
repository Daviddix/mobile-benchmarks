import searchIcon from "./assets/icons/search-icon.svg"
import cameraIcon from "./assets/icons/camera-icon.svg"
import logo from "./assets/icons/logo.svg"
import { Outlet } from "react-router"
import "./Header.css"

function Header() {
  return (
    <>
    <header>
    <div className="homepage-inner-top">
        <img src={logo} alt="mobile benchmarks logo" />
        <h1>Discover Games That Run Perfectly on Your Phone</h1>
    </div>

    <form>
    <div className="homepage-inner-top">
        <div className="form-left">
        <img src={searchIcon} alt="search-icon" />

        <input type="text" placeholder="Search for games" />
        </div>

        <div className="form-right">
        <select name="page" id="page">
            <option value="Games">Games</option>
            <option value="Phones">Phones</option>
        </select>

        <button type="button">
        <img src={cameraIcon} alt="camera-icon" />
        </button>
        </div>

        </div>
    </form>
    </header>
    
    <Outlet />
    </>
  )
}

export default Header