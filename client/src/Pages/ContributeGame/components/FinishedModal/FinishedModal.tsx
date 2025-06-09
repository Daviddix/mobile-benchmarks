import { Link } from "react-router"
import "./FinishedModal.css"

function FinishedModal() {
  return (
    <div className="finished-modal-bg">
        <div className="finished-modal">
            <div className="icon">
                🥳
            </div>

            <h3>Submitted for Review</h3>

            <p>Thanks for contributing! Your submission is under review and will appear on the site soon</p>

            <Link to="/contribute">
            <button>Add Another Game</button>
            </Link>
            
            <Link to="/">
            <button>Go Home</button>
            </Link>
        </div>
    </div>
  )
}

export default FinishedModal