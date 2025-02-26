import "./Homepage.css"
import SingleGame from "./Components/SingleGame/SingleGame"
import SinglePhone from "./Components/SinglePhone/SinglePhone"

function Homepage() {
  return (
    <main className="homepage-main">
        <div className="homepage-body-inner">
        {/* <div className="popular-games">
            <h2>Popular Games</h2>

            <div className="all-games-container">
                <SingleGame />
                <SingleGame />
                <SingleGame />
                <SingleGame />
            </div>
        </div> */}

        <div className="popular-phones">
            <h2>Popular Phones</h2>

            <div className="all-phones-container">
            <SinglePhone />
            <SinglePhone />
            <SinglePhone />
            <SinglePhone />

            </div>
        </div>

        </div>

    </main>
  )
}

export default Homepage