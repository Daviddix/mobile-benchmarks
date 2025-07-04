import "./RequestItemModal.css"
import closeIcon from "./assets/icons/close-icon.svg"
import controllerIcon from "./assets/icons/controller-icon.svg"
import phoneIcon from "./assets/icons/phone-icon.svg"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

type requestItemModalProps = {
    closeFn: () => void
    requestType: "Phone" | "Game"
}


function RequestItemModal ({closeFn, requestType} : requestItemModalProps) {
    type requestStatus = "submitted" | "submitting" | "error"
    const [requestItem, setRequestItem] = useState("")
    const [submittingRequestStatus, setSubmittingRequestStatus] = useState<requestStatus>("submitted")

    async function submitRequest(){
        if(requestItem.trim() == "") return
        setSubmittingRequestStatus("submitting")
        try{
            const requestInformation = {
                requestType,
                requestItem
            }

            const rawFetch = await fetch("http://localhost:3000/api/request/make-request", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestInformation)
            })

            const responseInJson = await rawFetch.json()

            if(!rawFetch.ok){
                throw new Error(responseInJson.message || "An error occurred while requesting the issue.")
            }
            toast(`Your request for for ${requestItem} has successfully been submitted. Thank you for your feedback!`, {
                duration: 5000,
            })
            setSubmittingRequestStatus("submitted")
            closeFn()

        }catch(err){
            setSubmittingRequestStatus("error")
            console.error("Error requesting issue:", err);
            alert("An error occurred while requesting the issue. Please try again later.");
        }
    }


  return (
    <div className="request-modal-background">
        <div className="main-request-modal">
        <div className="modal-header">
            
            <div className="icon-container">
                <img src={requestType == "Phone"? phoneIcon : controllerIcon} />
            </div>

            <div className="main-content">
            <h2>Request a {requestType == "Phone" ? "Phone" : "Game"}</h2>

            <p>Tell us a {requestType == "Phone" ? "phone" : "game"} you'll like to see and we'll add it</p>
            </div>

            <button 
            onClick={() => closeFn()}
            className="close-modal-button">
                <img src={closeIcon} alt="close modal" />
            </button>
        </div>

            <div className="request-modal-content">
            <form
            onSubmit={(e)=>{
                e.preventDefault()
                submitRequest()
            }}
            >
                <label htmlFor="request-reason">{requestType == "Phone" ? "Phone" : "Game"} you'll like to see</label>
                
                <input type="text" name="phone name" 
                maxLength={50}
                required
                onChange={(e)=>{
                    setRequestItem(e.target.value)
                }}
                value={requestItem}
                placeholder={requestType == "Phone" ? "Samsung Galaxy S25 Ultra" : "Fortnite"} />

                <button className="submit-request-button">
                    {
                        submittingRequestStatus == "submitting" ?
                        <div className="circular-loader"></div>
                        :
                        "Submit Request"
                    }
                    
                    </button>   
            </form>
            </div>
        </div>
    </div>
  )
}

export default RequestItemModal