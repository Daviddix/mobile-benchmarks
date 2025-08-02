import { useEffect, useState } from "react";
import CompatibleGame from "../../Components/CompatibleGame/CompatibleGame";
import CompatibleGamesSectionSkeletonLoader from "./CompatibleGamesSectionSkeletonLoader/CompatibleGamesSectionSkeletonLoader";
import "./CompatibleGamesSection.css"
import ErrorComponent from "../../../../Components/ErrorComponent/ErrorComponent";
import { Link } from "react-router";

type compatibleGamesSectionProps = {
    phoneId : string | undefined
}

function CompatibleGamesSection({phoneId} : compatibleGamesSectionProps) {    
    type fetchingStateType = "loading" | "error" | "completed"


  const [compatibleGameFetchingState, setCompatibleGameFetchingState] = useState<fetchingStateType>("loading")
  const [compatibleGameData, setCompatibleGameData] = useState<compatibleGame | null>(null)
  const [length, setLength] = useState(0)
  
  async function getCompatibleGames(id : string | undefined){
    try{
      setCompatibleGameFetchingState("loading")
      const rawFetch = await fetch(`http://localhost:3000/api/compatible-game/get-games/${id}`)
      const responseInJson : compatibleGame = await rawFetch.json()

      if(!rawFetch.ok){
        throw new Error("Fetching Error" , {cause : responseInJson})
      }
      setCompatibleGameData(responseInJson)
      setLength(responseInJson?.compatibleGamesInfo.length)
      setCompatibleGameFetchingState("completed")
    }
    catch(err){
      console.log("An error occurred", err)
      setCompatibleGameFetchingState("error")
    }
  }

    const mappedCompatibleGames = compatibleGameData?.compatibleGamesInfo?.sort((a,b)=>b.gameCompatibilityRating - a.gameCompatibilityRating).map(({gameCompatibilityRating, game, gamePerformanceStats})=>{
        return <CompatibleGame 
        key={game.gameName}
        gameCompatibilityRating={gameCompatibilityRating}
        gamePerformanceStats={gamePerformanceStats}
        gameCoverImage={game.gameCoverImage}
        gameName={game.gameName}
        gameIosLink={game.iosDownloadLink}
        gameAndroidLink={game.androidDownloadLink}
        gameDescription={game.gameDescription}
        />
      })

      useEffect(()=>{
        getCompatibleGames(phoneId)
      }, [])

  return (
    <section className="compatible-games">
        <div className="compatible-games-inner">
          <h1>Compatible Games</h1>

          <div className="compatible-games-container">
            {
                compatibleGameFetchingState == "loading"?
                <>
                <CompatibleGamesSectionSkeletonLoader />
                <CompatibleGamesSectionSkeletonLoader />
                </>
                :
                compatibleGameFetchingState == "error"?
                <>
                <ErrorComponent
                errorHeading="An Error Occurred"
                errorMessage="Oops! We couldn’t get the compatible games. Please check your connection and try again. If you feel it isn't caused by your internet connection, click the retry button"
                refreshFunction={getCompatibleGames}
                id={phoneId}
                />
                </>
                :
                length > 0?
                mappedCompatibleGames
                :
                <div className="empty">No items</div>

            }

          

          </div>
          <div className="disclaimer-text">
            <h4>Disclaimer</h4>
            <p>
              Game compatibility and FPS data are manually gathered from YouTube gameplay videos and public sources. Accuracy may vary.
            </p>

            <Link to="/disclaimer">
            Learn more
            </Link>

          </div>


        </div>
      </section>
  )
}

export default CompatibleGamesSection