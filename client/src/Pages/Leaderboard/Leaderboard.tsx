import { Link } from "react-router"
import SingleLeader from "./components/SingleLeader/SingleLeader"
import "./Leaderboard.css"

function Leaderboard() {
  return (
    <main className="leaderboard-main">
        <div className="leaderboard-inner">
            <h1 style={{opacity : .7, fontWeight : 500}}>This feature is coming soon. Stay Tuned</h1>

            <Link to="/" className="back-to-home">
                <p>Back to Home</p>
            </Link>

            {/* <div className="all-leader-container">
                <div className="title">
                    <p>Rank</p>
                    <p>User</p>
                    <p>Verified Reviews</p>
                </div>

                <SingleLeader userName="Nsikan" userRank={1} userPoints={12} />

                <SingleLeader userName="James Daniel" userRank={2} userPoints={10} />

                <SingleLeader userName="Ade Balogun" userRank={3} userPoints={6} />

                <SingleLeader userName="Abdul Jay" userRank={4} userPoints={4} />
            </div> */}
        </div>
    </main>
  )
}

export default Leaderboard