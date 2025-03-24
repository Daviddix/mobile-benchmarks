import { useEffect, useState } from "react";
import CompatibleGame from "../../Components/CompatibleGame/CompatibleGame";
import CompatibleGamesSectionSkeletonLoader from "./CompatibleGamesSectionSkeletonLoader/CompatibleGamesSectionSkeletonLoader";
import "./CompatibleGamesSection.css"
import ErrorComponent from "../../../../Components/ErrorComponent/ErrorComponent";

type compatibleGamesSectionProps = {
    phoneId : string | undefined
}

function CompatibleGamesSection({phoneId} : compatibleGamesSectionProps) {    
    type fetchingStateType = "loading" | "error" | "completed"

    type compatibleGame = {
        _id: string,
        phone: string,
        compatibleGamesInfo: [
          {
            gameCoverImage: string,
            gameName:string,
            gameCompatibilityRating: number,
            gameDescription:string,
            gameData: {
              fps: number,
              frameRate: string,
              playStoreDownloadLink: string,
              iosDownloadLink: string,
              graphicsQuality: string,
              batteryUsagePerHour: number,
            }
          }
        ]
      }

  const [compatibleGameFetchingState, setCompatibleGameFetchingState] = useState<fetchingStateType>("loading")
  const [compatibleGameData, setCompatibleGameData] = useState<compatibleGame | null>(null)
  const [length, setLength] = useState(0)
  
  async function getCompatibleGames(id : string | undefined){
    try{
      setCompatibleGameFetchingState("loading")
      const rawFetch = await fetch(`https://mobile-benchmarks.onrender.com/api/compatible-game/get-games/${id}`)
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

    const mappedCompatibleGames = compatibleGameData?.compatibleGamesInfo?.sort((a,b)=>b.gameCompatibilityRating - a.gameCompatibilityRating).map(({gameCompatibilityRating, gameDescription, gameData, gameCoverImage, gameName})=>{
        return <CompatibleGame 
        key={gameName}
        gameCompatibilityRating={gameCompatibilityRating}
        gameData={gameData}
        gameCoverImage={gameCoverImage}
        gameName={gameName}
        gameDescription={gameDescription}
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


        </div>
      </section>
  )
}

export default CompatibleGamesSection