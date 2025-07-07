import userIcon from "./assets/icons/user-icon.svg"
import closeIcon from "./assets/icons/close-icon.svg"
import "./UserOnlyModal.css"

function UserOnlyModal() {
  return (
    <div className="user-only-modal-background">
        <div className="main-user-only-modal">
        <div className="modal-header">
            
            <div className="icon-container">
                <img src={userIcon} alt="user-only icon" />
            </div>

            <div className="main-content">
            <h2>User-Only Feature</h2>

            <p>You'll need an account to have access to this feature</p>
            </div>

            <button 
            className="close-modal-button">
                <img src={closeIcon} alt="close modal" />
            </button>
        </div>

            <div className="user-only-modal-content">
            <button className="create">Create an Account</button>
            <button>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default UserOnlyModal