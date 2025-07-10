import { useAtom, useAtomValue } from "jotai"
import SingleGame from "../SingleGame/SingleGame"
import { allPopularGamesAtom, filteredGamesAtom, headerSearchStatusAtom, searchingState } from "../../../../globals/states"
import { useEffect, useState } from "react"
import "./AllGamesSection.css"
import AllGamesSkeletonLoader from "./Components/AllGamesSkeletonLoader/AllGamesSkeletonLoader"
import ErrorComponent from "../../../../Components/ErrorComponent/ErrorComponent"
import RequestItem from "../RequestItem/RequestItem"


function AllGamesSection() {
  const [allPopularGames, setAllPopularGames] = useAtom(allPopularGamesAtom)
  const [isSearching, setIsSearching] = useAtom(searchingState)
  const [fetchingState, setFetchingState] = useState<fetchingStateType>("loading")
  const [filteredGames, setFilteredGames] = useAtom(filteredGamesAtom)
  const headerSearchStatus = useAtomValue(headerSearchStatusAtom)

    type fetchingStateType = "loading" | "error" | "completed"


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
        _id={_id} 
        key={_id}
        gameCategory={gameCategory}
        gameCoverImage={gameCoverImage}
        gameName={gameName}
        gamePlatform={gamePlatform}
        gameSize={gameSize}
        /> 
    })

    const mappedFilteredGames = filteredGames.map(({gameName, gameCategory, gameCoverImage, gamePlatform, gameSize, _id})=>{
      return <SingleGame
      _id={_id} 
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
    }, 
    [])

  return (
    <div className="popular-games">
            {fetchingState !== "error" && <h2>Popular Games</h2>}

            <div className="all-games-container">
                {
                    fetchingState == "loading"?
                    <AllGamesSkeletonLoader />
                    :
                    fetchingState == "error"?
                    <ErrorComponent 
                    errorHeading="An Error occurred"
                    errorMessage="Oops! We couldn’t load popular games. Please check your connection and try again. If you feel it isn't caused by your internet connection, click the retry button"
                    refreshFunction={getPopularGames}
                     />
                    :
                    isSearching?
                    mappedFilteredGames.length == 0?
                    <RequestItem 
                    itemType='Game'
                    />
                      :
                      headerSearchStatus == "searching" ? 
                      <AllGamesSkeletonLoader />   
                          : 
                          mappedFilteredGames
                          :
                          mappedPopularGames
                }
            </div>
        </div>
  )
}

export default AllGamesSection