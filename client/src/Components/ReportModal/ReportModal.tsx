import "./ReportModal.css"
import reportIcon from "./assets/icons/report-icon.svg"
import closeIcon from "./assets/icons/close-icon.svg"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

    type reportModalProps = {
        reportType : "Games" | "Phones",
        closeFn : Function,
        reportTypeName : string,
        reportTypeId : string
    }

function ReportModal({reportTypeName, reportType, reportTypeId, closeFn} : reportModalProps) {
    type reportStatus = "submitted" | "submitting" | "error"
    const [reasonForReport, setReasonForReport] = useState("")
    const [submittingReportStatus, setSubmittingReportStatus] = useState<reportStatus>("submitted")
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    async function submitReport(){
        const regex = /^(?=.*[A-Za-z]).+$/

        if(reasonForReport.trim() == "" || !regex.test(reasonForReport.trim())) return
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
            if (err instanceof Error) {
                setErrorMessage(err.message)
            } else {
                setErrorMessage("An unknown error occurred.")
            }
        }
    }


  return (
    <div className="report-modal-background">
        <div className="main-report-modal">
        <div className="modal-header">
            
            <div className="icon-container">
                <img src={reportIcon} alt="report icon" />
            </div>

            <div className="main-content">
            <h2>Report  Issue</h2>

            <p>Report an issue with the information provided about <b>{reportTypeName}</b></p>
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
                <label htmlFor="report-reason">Reason for Report:</label>
                
                <textarea 
                minLength={5}
                maxLength={1000}
                required
                disabled={submittingReportStatus == "submitting"}
                value={reasonForReport}
                onChange={(e)=>{
                    if(errorMessage) setErrorMessage(null)

                    setReasonForReport(e.target.value)
                }}
                name="report-reason" placeholder="There's an issue with..."></textarea>

                <button 
                disabled={submittingReportStatus == "submitting"}
                className={reasonForReport.trim() == ""? "submit-report-button empty" : "submit-report-button"}>
                    {
                        submittingReportStatus == "submitting" ?
                        <div className="circular-loader"></div>
                        :
                        "Submit Report"
                    }
                    
                    </button>   
            </form>
            </div>

           {errorMessage && <div className="report-error-message-container">
                <p className="error">{errorMessage}</p>
            </div>}
        </div>
    </div>
  )
}

export default ReportModal