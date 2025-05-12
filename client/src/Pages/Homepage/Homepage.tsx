import "./Homepage.css"
import SingleGame from "./Components/SingleGame/SingleGame"
import { useAtom } from "jotai"
import { allPopularGamesAtom, allPopularPhonesAtom, filteredPhonesAtom, searchingState, userInfoAtom } from "../../globals/states"
import { useSearchParams } from "react-router"
import AllPhonesSection from "./Components/AllPhonesSection/AllPhonesSection"
import AllGamesSection from "./Components/AllGamesSection/AllGamesSection"
import { Toaster } from "react-hot-toast"
import { useEffect } from "react"


function Homepage() {

  const [searchParams, setSearchParams] = useSearchParams();

  const initialView = searchParams.get("page") || "Phones"

  const [userInfo, setUserInfo] = useAtom(userInfoAtom)


  async function getUserInfo(){
    try{
      const rawFetch = await fetch("http://localhost:3000/api/user/info", {
        credentials : "include"
      })
  
      const responseInJson = await rawFetch.json()
  
      if(!rawFetch.ok){
        throw new Error("Fetching error", {cause : responseInJson})
      }

      console.log(responseInJson)

      setUserInfo({
        loading : false,
        error : false,
        ...responseInJson
      })

      //a function that calculates dates  

    }
    catch(err){
      setUserInfo({
        _id : null,
        username : null,
        loading : false,
        error : true
      })

      console.log("user details error")
      console.log(err)
    }
  }

  useEffect(()=>{
    getUserInfo()
  }, [])
  
  return (
    <main className="homepage-main">
      <Toaster
      toastOptions={
        {
          style : {
            "fontSize" : "1.2rem",
            "backgroundColor" : "var(--l1-elevation)",
            "color" : "var(--text-color)",
            "border" : "1px solid var(--l3-elevation)"
          }
        }
      }
                position="bottom-right"
                 />
        <div className="homepage-body-inner">
          {
            initialView == "Games"?
            <AllGamesSection />
            :
            <AllPhonesSection />

          }


        </div>

    </main>
  )
}

export default Homepage