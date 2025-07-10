import "./SingleReport.css"
import { populatedReportTypeInfo } from "../../types/reportTypes"
import { Link } from "react-router"

type singleReportProps = {
        reportType : "Games" | "Phones",
        reasonForReport: string,
        populatedReportTypeInfo : populatedReportTypeInfo
        userInfo : populatesUserInfoType
        resolveFunction : (reportId: string, reportInfo: populatedReportTypeInfo) => void
}

function SingleReport({reportType, resolveFunction, reasonForReport, userInfo, populatedReportTypeInfo} : singleReportProps) {
  return (
    <div className="single-report">
                    <div className="report-top">
                        {
                        reportType == "Games" ?
                            <img src={populatedReportTypeInfo.gameCoverImage} alt="game cover" />
                            :
                            <img src={populatedReportTypeInfo.phoneCoverImage} alt="phone cover" />
                            }
                        <div className="report-top-right">
                            {
                                reportType == "Games" ?
                                <h2>{populatedReportTypeInfo.gameName}</h2>
                                :
                                <h2>{populatedReportTypeInfo.phoneName}</h2>
                            }
                            <div className="report-chips-container">
                                <span>{reportType}</span>
                                <span>By {userInfo.username}</span>
                            </div>
                        </div>
                    </div>

                    <div className="report-reason">
                        <div className="report-reason-header">
                            <h3>Reason for Report</h3>
                        </div>

                        <p>{reasonForReport}</p>
                    </div>

                    <div className="report-buttons">
                        {
                            reportType == "Games" ?
                            <Link to={`/game/info/${populatedReportTypeInfo._id}`}>
                                    <button className='report-button-view'>View Game</button>
                            </Link>
                            :
                            <Link to={`/phone/info/${populatedReportTypeInfo._id}`}>
                                    <button className='report-button-view'>View Phone</button>
                            </Link>
                        }
                        
                        <button
                       onClick={() => resolveFunction(populatedReportTypeInfo._id, populatedReportTypeInfo)}
                        className='report-button-resolved'>Resolved</button>
                    </div>
                </div>
  )
}

export default SingleReport