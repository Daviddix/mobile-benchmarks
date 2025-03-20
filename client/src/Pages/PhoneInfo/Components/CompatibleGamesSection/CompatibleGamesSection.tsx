import { useEffect, useState } from "react";
import CompatibleGame from "../../Components/CompatibleGame/CompatibleGame";
import CompatibleGamesSectionSkeletonLoader from "./CompatibleGamesSectionSkeletonLoader/CompatibleGamesSectionSkeletonLoader";
import "./CompatibleGamesSection.css"

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
  
  async function getCompatibleGames(id : string | undefined){
    try{
      setCompatibleGameFetchingState("loading")
      const rawFetch = await fetch(`http://localhost:3000/api/compatible-game/get-games/${id}`)
      const responseInJson = await rawFetch.json()

      if(!rawFetch.ok){
        throw new Error("Fetching Error" , {cause : responseInJson})
      }
      setCompatibleGameData(responseInJson)
      setCompatibleGameFetchingState("completed")
    }
    catch(err){
      console.log("An error occurred", err)
      setCompatibleGameFetchingState("error")
    }
  }

    const mappedCompatibleGames = compatibleGameData?.compatibleGamesInfo?.map(({gameCompatibilityRating, gameDescription, gameData, gameCoverImage, gameName})=>{
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
                <div>An error ocurred</div>
                </>
                :
                mappedCompatibleGames

            }
          

          </div>


        </div>
      </section>
  )
}

export default CompatibleGamesSection