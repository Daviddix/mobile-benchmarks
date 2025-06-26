import { useEffect, useState } from "react"
import SingleReport from "./components/SingleReport/SingleReport"
import "./Reports.css"
import { populatedReportTypeInfo } from "./types/reportTypes"

function Reports() {
    

    type reportType = {
        _id : string,
        reportType : "Games" | "Phones",
        reportTypeId : populatedReportTypeInfo,
        reasonForReport: string,
        userInfo : populatesUserInfoType
    }
    const [allReports, setAllReports] = useState<reportType[]>([])

    async function getAllReports(){
        try{
            const rawFetch = await fetch("http://localhost:3000/api/report/all-reports", {
                credentials: "include",
            })

            const responseInJson = await rawFetch.json()

            if(!rawFetch.ok){
                throw new Error(responseInJson.message)
            }

            setAllReports(responseInJson)
        }
        catch(err){
            console.error("Error fetching reports:", err)
            alert("Failed to fetch reports. Please try again later.")
        }
    }

    useEffect(()=>{
        getAllReports()
    }, [])

    const mappedReports = allReports.map((report)=>{
        return <SingleReport
        reasonForReport={report.reasonForReport}
        populatedReportTypeInfo={report.reportTypeId}
        reportType={report.reportType}
        userInfo={report.userInfo}
        key={report._id}
        />
    })
  return (
    <main className='reports-main'>
        <div className="reports-inner">
            <div className="title">
            <h1>Reports</h1>
            <small>{allReports.length}</small>
            </div>

            <div className="all-reports-container">
                
                {mappedReports}

            </div>
        </div>
    </main>
  )
}

export default Reports