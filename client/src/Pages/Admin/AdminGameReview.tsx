import { useEffect, useState } from "react";
import "./AdminGameReview.css";
import SingleSubmission from "./Components/SingleSubmission/SingleSubmission";

function AdminGameReview() {
  const [submissions, setSubmissions] = useState<submissionData[]>([]);

  async function getAllSubmissions(){
    try{
      const rawFetch = await fetch("http://localhost:3000/api/admin/submissions",  {
        credentials : "include"
      })

      const response : submissionData[] = await rawFetch.json()

      setSubmissions(response)
    }catch(err){
      console.log(err)
    }
  }

  async function approveSubmission(submissionId: string){
    try{
      const rawFetch = await fetch(`http://localhost:3000/api/admin/submissions/approve/${submissionId}`, {
        method : "DELETE",
        credentials : "include"
      })
      const responseInJson = await rawFetch.json()
      if(!rawFetch.ok){
        throw new Error("Error approving submission", {cause : responseInJson})
      }
      console.log("Submission approved successfully")
      getAllSubmissions() // Refresh the list after approval
    }catch(err){
      console.log("Error approving submission")
      console.log(err)
  }}

  async function declineSubmission(submissionId: string){
    try{
      const rawFetch = await fetch(`http://localhost:3000/api/admin/submissions/approve/${submissionId}`, {
        method : "DELETE",
        credentials : "include"
      })
      const responseInJson = await rawFetch.json()
      if(!rawFetch.ok){
        throw new Error("Error declining submission", {cause : responseInJson})
      }
      console.log("Submission approved successfully")
      getAllSubmissions() // Refresh the list after approval
    }catch(err){
      console.log("Error declining submission")
      console.log(err)
  }}

  const mappedSubmissions = submissions.map((submission) => {
    return (
      <SingleSubmission 
      approveFunction={approveSubmission}
      declineFunction={declineSubmission}
      submissionId={submission._id}
      phoneName={submission.phoneInfo.phoneName}
      numberOfGames={submission.gameInfo.length}
      fpsImage={submission.gameInfo[0].gameFps[1]}
      graphicsImage={submission.gameInfo[0].gameGraphics[1]}
      frameRateImage={submission.gameInfo[0].gameFrameRate[1]}
      username={submission.userInfo.username}

        key={submission._id}
      />
    )
  })

  useEffect(()=>{
    getAllSubmissions()
  }, [])
  return (
    <main className="admin-panel">
      <div className="admin-panel-inner">
        <div className="title">
          <h1>Games for Review</h1>
          <small>{submissions.length || 0}</small>
        </div>

        <div className="all-games-to-review-container">
          {mappedSubmissions.length > 0 ? (
            mappedSubmissions
          ) : (
            <p className="no-submissions">No submissions to review</p>
          ) }
        </div>
        
      </div>
    </main>
  )
}

export default AdminGameReview