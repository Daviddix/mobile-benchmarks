import { useEffect, useState } from "react";
import "./AdminGameReview.css";
import SingleReview from "./Components/SingleReview/SingleReview";

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

  const mappedSubmissions = submissions.map((submission) => {
    return (
      <SingleReview 
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
          <small>{submissions.length || "Loading"}</small>
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