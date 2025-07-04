import "./RequestItemModal.css"
import reportIcon from "./assets/icons/report-icon.svg"
import closeIcon from "./assets/icons/close-icon.svg"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"


function RequestItemModal () {
    type reportStatus = "submitted" | "submitting" | "error"
    const [reasonForReport, setReasonForReport] = useState("")
    const [submittingReportStatus, setSubmittingReportStatus] = useState<reportStatus>("submitted")

    async function submitReport(){
        if(reasonForReport.trim() == "") return
        setSubmittingReportStatus("submitting")
        try{
            const reportInformation = {
                reportType,
                reportTypeId,
                reasonForReport
            }

            const rawFetch = await fetch("http://localhost:3000/api/report/make-report", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reportInformation)
            })

            const responseInJson = await rawFetch.json()

            if(!rawFetch.ok){
                throw new Error(responseInJson.message || "An error occurred while reporting the issue.")
            }
            toast("Your report has successfully been submitted. Thank you for your feedback!", {
                duration: 5000,
            })
            setSubmittingReportStatus("submitted")
            closeFn()

        }catch(err){
            setSubmittingReportStatus("error")
            console.error("Error reporting issue:", err);
            alert("An error occurred while reporting the issue. Please try again later.");
        }
    }


  return (
    <div className="request-item-modal-background">
        <div className="main-report-modal">
        <div className="modal-header">
            
            <div className="icon-container">
                <img src={reportIcon} alt="report icon" />
            </div>

            <div className="main-content">
            <h2>Request Phone</h2>

            <p>Request a phone you want to see <b>{reportTypeName}</b></p>
            </div>

            <button 
            onClick={() => closeFn()}
            className="close-modal-button">
                <img src={closeIcon} alt="close modal" />
            </button>
        </div>

            <div className="report-modal-content">
            <form
            onSubmit={(e)=>{
                e.preventDefault()
                submitReport()
            }}
            >
                <label htmlFor="report-reason">Phone Name</label>
                
                <input type="text" name="phone name" placeholder="Samsung Galaxy S25 Ultra" />

                <button className="submit-report-button">
                    {
                        submittingReportStatus == "submitting" ?
                        <div className="circular-loader"></div>
                        :
                        "Submit Report"
                    }
                    
                    </button>   
            </form>
            </div>
        </div>
    </div>
  )
}

export default RequestItemModal