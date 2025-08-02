import userIcon from "./assets/icons/user-icon.svg"
import closeIcon from "./assets/icons/close-icon.svg"
import "./UserOnlyModal.css"
import { Link } from "react-router"

type userOnlyModalProps = {
    closeFn : Function
}

function UserOnlyModal({closeFn} : userOnlyModalProps) {
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
            onClick={()=>{
                closeFn()
            }}
            className="close-modal-button">
                <img src={closeIcon} alt="close modal" />
            </button>
        </div>

            <div className="user-only-modal-content">

                <Link onClick={()=> closeFn()} to={"/signup"}>
            <button className="create">Create an Account</button>
                </Link>

            <button
            onClick={()=>{
                closeFn()
            }}
            >Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default UserOnlyModal