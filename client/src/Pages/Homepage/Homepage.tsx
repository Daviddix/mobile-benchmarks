import "./Homepage.css"
import SingleGame from "./Components/SingleGame/SingleGame"
import SinglePhone from "./Components/SinglePhone/SinglePhone"
import { useEffect, useState } from "react"

function Homepage() {
  //types
  type fetchingStateType = "loading" | "error" | "completed"

  type MorePhoneInfo = {
    generalCompatibility: number;
    gpu: string;
    averageRating: string[];
    geekBench: null;
    anTutu: null;
    threeDMark: null;
    _id: string;
  }

  type popularPhoneInfo = {
    _id: string;
    phoneName: string;
    phoneChipset: string;
    phoneCoverImage: string;
    phoneDisplay: string[];
    phoneMemory: number[];
    moreInfo: MorePhoneInfo;
  }

  const [fetchingState, setFetchingState] = useState<fetchingStateType>("loading")
  const [allPopularPhones, setAllPopularPhones] = useState<popularPhoneInfo[] | []>([])

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
  
  return (
    <main className="homepage-main">
        <div className="homepage-body-inner">
        {/* <div className="popular-games">
            <h2>Popular Games</h2>

            <div className="all-games-container">
                <SingleGame />
                <SingleGame />
                <SingleGame />
                <SingleGame />
            </div>
        </div> */}

        <div className="popular-phones">
            <h2>Popular Phones</h2>

            <div className="all-phones-container">
            {mappedPopularPhones}
            </div>
        </div>

        </div>

    </main>
  )
}

export default Homepage