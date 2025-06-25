import "./ReportModal.css"
import reportIcon from "./assets/icons/report-icon.svg"
import closeIcon from "./assets/icons/close-icon.svg"

function ReportModal() {
  return (
    <div className="report-modal-background">
        <div className="main-report-modal">
        <div className="modal-header">
            
            <div className="icon-container">
                <img src={reportIcon} alt="report icon" />
            </div>

            <div className="main-content">
            <h2>Report  Issue</h2>

            <p>Report an issue with the information provided about <b>Need for Speed: No Limits</b></p>
            </div>

            <button className="close-modal-button">
                <img src={closeIcon} alt="close modal" />
            </button>
        </div>

            <div className="report-modal-content">
            <form>
                <label htmlFor="report-reason">Reason for Report:</label>
                
                <textarea name="report-reason" placeholder="There's an issue with..."></textarea>

                <button className="submit-report-button">Submit Report</button>   
            </form>
            </div>
        </div>
    </div>
  )
}

export default ReportModal