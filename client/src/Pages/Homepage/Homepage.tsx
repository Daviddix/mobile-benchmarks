import "./Homepage.css"
import SingleGame from "./Components/SingleGame/SingleGame"
import { useAtom } from "jotai"
import { allPopularGamesAtom, allPopularPhonesAtom, filteredPhonesAtom, searchingState } from "../../globals/states"
import { useSearchParams } from "react-router"
import AllPhonesSection from "./Components/AllPhonesSection/AllPhonesSection"
import AllGamesSection from "./Components/AllGamesSection/AllGamesSection"

function Homepage() {
  //types

  type gameData = {
    gameName: string;
    gameCategory: string;
    gameSize: number;
    gamePlatform: string;
    gameCoverImage: string;
  }

  const [searchParams, setSearchParams] = useSearchParams();

  const initialView = searchParams.get("page") || "Phones"
  
  return (
    <main className="homepage-main">
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