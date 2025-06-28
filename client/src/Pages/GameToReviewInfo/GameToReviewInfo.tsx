import { useNavigate, useParams } from "react-router";
import "./GameToReviewInfo.css";
import { useEffect, useState } from "react";
import SingleGameSubmission from "./SingleGameSubmission/SingleGameSubmission";

function GameToReviewInfo() {
    const {gameId} = useParams();
    const [info, setInfo] = useState<submissionData | null>(null);
    const navigate = useNavigate();
    const mappedSingleGamesSubmissions = info?.gameInfo.map((game) => {
        return (
            <SingleGameSubmission 
                gameName={game.gameName}
                gameFps={game.gameFps}
                gameFrameRate={game.gameFrameRate}
                gameGraphics={game.gameGraphics}
                gameBatteryDrain={game.gameBatteryDrain}
                gameCompatibility={game.gameCompatibility}
                key={game.gameName}
            />
        )
    })

    async function getGamesFromSubmission() {
        try{
            const rawFetch = await fetch(`http://localhost:3000/api/admin/submissions/${gameId}`, {
                credentials: "include"
            });

            const responseInJson = await rawFetch.json();

            if(!rawFetch.ok){
                throw new Error("Failed to fetch games from submission", {cause : responseInJson});
            }

            setInfo(responseInJson)
        }
        catch(err){
            console.log("An error occurred while trying to get the submitted games");
            console.log(err);
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
      navigate(-1) // Refresh the list after approval
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
      navigate(-1) // Refresh the list after approval
    }catch(err){
      console.log("Error declining submission")
      console.log(err)
  }}

    useEffect(() => {
        getGamesFromSubmission()
    }, [gameId]);
  return (
    !info? <p>sd</p>
    :
    <main className="single-game-to-review">
        <div className="single-game-to-review-inner">
            <div className="top-info">
                <div className="left">
                    <h2>{info.phoneInfo.phoneName}</h2>
                    <p>{info.phoneInfo.phoneRam}GB RAM - {info.phoneInfo.phoneRom}GB ROM</p>
                    <small>By {info.userInfo.username}</small>
                </div>

                <div className="right">
                    <button onClick={()=> approveSubmission(gameId as string)} className="approve">Approve</button>
                    
                    <button onClick={()=> declineSubmission(gameId as string)} className="decline">Decline</button>
                </div>
            </div>
        </div>

        <section className="all-games-from-submission">

            <div className="all-games-from-submission-inner">
                  <div className="heading">
                <h2>Games</h2>
                <small>{info.gameInfo.length}</small>
                </div>

                <div className="all-submitted-games-container">
                    {mappedSingleGamesSubmissions}
                </div>
            </div>
              
        </section>
    </main>
  )
}

export default GameToReviewInfo