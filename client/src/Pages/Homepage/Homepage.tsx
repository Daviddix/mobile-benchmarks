import "./Homepage.css"
import { useSearchParams } from "react-router"
import AllPhonesSection from "./Components/AllPhonesSection/AllPhonesSection"
import AllGamesSection from "./Components/AllGamesSection/AllGamesSection"
import { Toaster } from "react-hot-toast"

function Homepage() {

  const [searchParams, setSearchParams] = useSearchParams();

  const initialView = searchParams.get("page") || "Phones"

  
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