import "./Homepage.css"
import logo from "./assets/icons/logo.svg"
import searchIcon from "./assets/icons/search-icon.svg"
import cameraIcon from "./assets/icons/camera-icon.svg"
import SingleGame from "./Components/SingleGame/SingleGame"

function Homepage() {
  return (
    <main className="homepage-main">
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

                <button>
                <img src={cameraIcon} alt="camera-icon" />
                </button>
                </div>

                </div>
            </form>
        </header>

        <div className="homepage-body-inner">
        <div className="popular-games">
            <h2>Popular Games</h2>

            <div className="all-games-container">
                <SingleGame />
                <SingleGame />
                <SingleGame />
                <SingleGame />
            </div>
        </div>

        </div>

    </main>
  )
}

export default Homepage