import "./Homepage.css"
import SingleGame from "./Components/SingleGame/SingleGame"
import SinglePhone from "./Components/SinglePhone/SinglePhone"
import { useEffect, useState } from "react"
import HomepageSkeletonLoader from "./Components/HomepageSkeletonLoader/HomepageSkeletonLoader"
import { useAtom } from "jotai"
import { allPopularPhonesAtom, filteredPhonesAtom, searchingState } from "../../globals/states"
import { useSearchParams } from "react-router"

function Homepage() {
  //types
  type fetchingStateType = "loading" | "error" | "completed"

  type popularPhoneInfo = {
    _id: string;
    phoneName: string;
    phoneChipset: string;
    phoneCoverImage: string;
    phoneDisplay: string[];
    phoneMemory: number[];
  }

  const [fetchingState, setFetchingState] = useState<fetchingStateType>("loading")

  const [allPopularPhones, setAllPopularPhones] = useAtom(allPopularPhonesAtom)

  const [filteredPhones, setAllFilteredPhones] = useAtom(filteredPhonesAtom)

  const [isSearching, setIsSearching] = useAtom(searchingState)

  const [searchParams, setSearchParams] = useSearchParams();

  const initialView = searchParams.get("page") || "Phones"

  useEffect(() => {  
    getPopularPhones()
  }, [])

  async function getPopularPhones(){
    try{
      const rawFetch = await fetch("http://localhost:3000/api/phone/get-all")
      const responseInJson : popularPhoneInfo[] = await rawFetch.json()

      if(!rawFetch.ok){
        throw new Error("Fetching Error" , {cause : responseInJson})
      }
      setAllPopularPhones(responseInJson)
      setFetchingState("completed")
    }
    catch(err){
      console.log("An error occurred", err)
      setFetchingState("error")
    }
  }

  const mappedPopularPhones = allPopularPhones.map(({_id, phoneChipset, phoneCoverImage, phoneDisplay, phoneMemory, phoneName})=>{
    return <SinglePhone
    _id={_id}
    key={_id}
    phoneChipset={phoneChipset}
    phoneCoverImage={phoneCoverImage}
    phoneDisplay={phoneDisplay}
    phoneMemory={phoneMemory}
    phoneName={phoneName}
    />
  })

  const mappedFilteredPhones = filteredPhones.map(({_id, phoneChipset, phoneCoverImage, phoneDisplay, phoneMemory, phoneName})=>{
    return <SinglePhone
    _id={_id}
    key={_id}
    phoneChipset={phoneChipset}
    phoneCoverImage={phoneCoverImage}
    phoneDisplay={phoneDisplay}
    phoneMemory={phoneMemory}
    phoneName={phoneName}
    />
  })
  
  return (
    <main className="homepage-main">
        <div className="homepage-body-inner">
          {
            initialView == "Games"?
        <div className="popular-games">
            <h2>Popular Games</h2>

            <div className="all-games-container">
                <SingleGame />
                <SingleGame />
                <SingleGame />
                <SingleGame />
            </div>
        </div>
            :
        <div className="popular-phones">
            <h2>Popular Phones</h2>

            <div className="all-phones-container">
            {
              fetchingState == "loading"?
              <HomepageSkeletonLoader />
              :
              fetchingState == "error"?
              <div>Error</div>
              :
              isSearching ?
              mappedFilteredPhones.length == 0 ?
              <div>Couldn't find your search</div>
                :
                  mappedFilteredPhones
                  :
                    mappedPopularPhones
            }
            </div>
        </div>

          }


        </div>

    </main>
  )
}

export default Homepage