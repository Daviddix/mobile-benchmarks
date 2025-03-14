import { useAtom } from "jotai"
import SingleGame from "../SingleGame/SingleGame"
import { allPopularGamesAtom, searchingState } from "../../../../globals/states"
import { useEffect, useState } from "react"
import "./AllGamesSection.css"
import AllGamesSkeletonLoader from "./Components/AllGamesSkeletonLoader/AllGamesSkeletonLoader"


function AllGamesSection() {
    type fetchingStateType = "loading" | "error" | "completed"

    type gameData = {
        _id : string;
        gameName: string;
        gameCategory: string;
        gameSize: number;
        gamePlatform: string;
        gameCoverImage: string;
      }

  const [allPopularGames, setAllPopularGames] = useAtom(allPopularGamesAtom)

  const [isSearching, setIsSearching] = useAtom(searchingState)

  const [fetchingState, setFetchingState] = useState<fetchingStateType>("loading")

    async function getPopularGames(){
        try{
            setFetchingState("loading")
          const rawFetch = await fetch("http://localhost:3000/api/game/get-all")
          const responseInJson : gameData[] = await rawFetch.json()
    
          if(!rawFetch.ok){
            throw new Error("Fetching Error" , {cause : responseInJson})
          }
          setAllPopularGames(responseInJson)
          setFetchingState("completed")
        }
        catch(err){
          console.log("An error occurred", err)
          setFetchingState("error")
        }
      }

    const mappedPopularGames = allPopularGames.map(({gameName, gameCategory, gameCoverImage, gamePlatform, gameSize, _id})=>{
        return <SingleGame 
        key={_id}
        gameCategory={gameCategory}
        gameCoverImage={gameCoverImage}
        gameName={gameName}
        gamePlatform={gamePlatform}
        gameSize={gameSize}
        /> 
        })

        useEffect(() => {  
            getPopularGames()
          }, [])

  return (
    <div className="popular-games">
            <h2>Popular Games</h2>

            <div className="all-games-container">
                {
                    fetchingState == "loading"?
                    <AllGamesSkeletonLoader />
                    :
                    fetchingState == "error"?
                    <div>Error...</div>
                    :
                    mappedPopularGames
                }
            </div>
        </div>
  )
}

export default AllGamesSection