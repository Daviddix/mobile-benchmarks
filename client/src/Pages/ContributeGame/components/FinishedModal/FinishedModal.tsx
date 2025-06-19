import { Link } from "react-router"
import "./FinishedModal.css"
import { useSetAtom } from "jotai"
import { showFinishedModalAtom } from "../../shared_state/state"

function FinishedModal() {
  const setShowFinishedModal = useSetAtom(showFinishedModalAtom)

  return (
    <div className="finished-modal-bg">
        <div className="finished-modal">
            <div className="icon">
                🥳
            </div>

            <h3>Submitted for Review</h3>

            <p>Thanks for contributing! Your submission is under review and will appear on the site soon</p>

            <Link onClick={()=>{
              setShowFinishedModal(false)
            }} 
            to="/contribute/game">
            <button className="add">Add Another Game</button>
            </Link>
            
            <Link
            onClick={()=>{
              setShowFinishedModal(false)
            }} 
            to="/">
            <button>Go Home</button>
            </Link>
        </div>
    </div>
  )
}

export default FinishedModal