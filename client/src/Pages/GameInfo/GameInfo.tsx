import "./GameInfo.css"
import linkIcon from "./assets/icons/link-icon.svg"
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import SupportedDevicesSection from "./Components/SupportedDevicesSection/SupportedDevicesSection";
import RequirementSection from "./Components/RequirementSection/RequirementSection";
import GameInfoLoaderSkeleton from "./Components/GameInfoLoaderSkeleton/GameInfoLoaderSkeleton";
import ErrorComponent from "../../Components/ErrorComponent/ErrorComponent";
import menuIcon from "./assets/icons/menu-icon.svg"
import reportIcon from "./assets/icons/report-icon.svg"
import ReportModal from "../../Components/ReportModal/ReportModal";
import { useLoggedInChecker } from "../../hooks/useLoggedInChecker";
import { useSetAtom } from "jotai";
import { showUserOnlyModalAtom } from "../../globals/states";


function GameInfo() {
  type fetchingStateType = "loading" | "error" | "completed"

  type tabTypes = "requirements" | "supported"

  const [fetchingState, setFetchingState] = useState<fetchingStateType>("loading")
  const [gameInfo, setGameInfo] = useState<gameData | null>(null)
  const [tabToView, setTabToView] = useState<tabTypes>("requirements")
  const [showReportButton, setShowReportButton] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const {gameId} = useParams()
  const isLoggedIn = useLoggedInChecker()
  const setShowUserOnlyModal = useSetAtom(showUserOnlyModalAtom)

  async function getGameInformation(gameId : string | undefined) {
    try{
      setFetchingState("loading")
      const rawFetch = await fetch(`http://localhost:3000/api/game/info/${gameId}`)
      const responseInJson : gameData = await rawFetch.json()
      
      if(!rawFetch.ok){
        throw new Error("An error occurred", {cause : responseInJson})
      }
      setGameInfo(responseInJson)
      setFetchingState("completed")
    }
    catch(err){
      setFetchingState("error")
      console.log(`An error occurred when trying to get the game info with the id of : ${gameId}`, err)
    }
  }

  function changeTabToView(nameToChangeTo : tabTypes){
    if(tabToView !== nameToChangeTo){
      setTabToView(nameToChangeTo)
    }
  }

  const mappedScreenShots = gameInfo?.moreInfo.gameScreenshots?.map((screenshot)=>{
    return <img key={screenshot} src={screenshot} alt="screenshot" />
  })

  function formatSize(number : number | undefined) : string | number {
    if(number){
      if(number >= 1000000){
        return (number / 1000000 + "M")
      }else if(number >= 1000){
        return (number / 1000 + "K")
      }else{
        return number
      }
    }else{
      return 5
    }
  }

  function closeReportModal(){
    setShowReportModal(false)
  }

  useEffect(()=>{
    window.scrollTo({
      top:0,
      left : 0
    })
    getGameInformation(gameId)
  }, [])
  return (
    <main className="game-info-main">
      {
        fetchingState == "loading"?
        <GameInfoLoaderSkeleton />
        :
        fetchingState == "error"?
        <div className="game-info-inner error">
          <ErrorComponent
          id={gameId}
          errorHeading="An Error Occurred"
          errorMessage="Oops! We couldn’t get the information about that game. Please check your connection and try again. If you feel it isn't caused by your internet connection, click the retry button"
          refreshFunction={getGameInformation}
          />
          
        </div>
        :
        <>
        <div className="game-info-inner">
        <img
          src={gameInfo?.gameCoverImage}
          alt="game image"
          className="game-image"
        />

        <div className="game-info-text">
          <div className="heading-and-button">
          <h2>{gameInfo?.gameName}</h2>

          <button 
          onClick={()=>{
            setShowReportButton((prev)=> !prev)
          }}
          className="report-inaccurate-info-button">
          <img
          src={menuIcon} alt="report inaccurate info icon" />
          </button>

          {showReportButton && <button 
          onClick={()=>{
           if(isLoggedIn){
              setShowReportModal(true)
              setShowReportButton(false)
            }else{
              setShowUserOnlyModal(true)
              setShowReportButton(false)
            }
          }}
          className="report">
            <img src={reportIcon} alt="report icon" />
            Report inaccurate information</button>}

          </div>

          <p>{gameInfo?.gameDescription}</p>

          <div className="other-game-info">
            <div className="single-game-info">
              <h3>Year</h3>
              <p>{gameInfo?.gameYearOfRelease}</p>
            </div>

            <div className="single-game-info">
              <h3>Genre</h3>
              <p>{gameInfo?.gameCategory}</p>
            </div>

            <div className="single-game-info">
              <h3>Ratings</h3>
              <p>
                {gameInfo?.gameRating[0]}
                <small>({formatSize(gameInfo?.gameRating[1])})</small>
              </p>
            </div>

            <div className="single-game-info">
              <h3>Platform</h3>
              <p>
                {gameInfo?.gamePlatform.split("&")[0]}
                <small>&</small>
                {gameInfo?.gamePlatform.split("&")[1]}
              </p>
            </div>

            <div className="single-game-info">
              <h3>Download</h3>
              <p>
                <a
                  href={gameInfo?.androidDownloadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Playstore <img src={linkIcon} alt="link" />
                </a>
              </p>

              <p>
                <a
                  href={gameInfo?.iosDownloadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Appstore <img src={linkIcon} alt="link" />
                </a>
              </p>
            </div>
          </div>
        </div>
        </div>

        <div className="bottom-game-info">

        <section className="requirements">
    <div className="tab">
      <div className="tab-inner">
        <button
          onClick={() => {
            changeTabToView("requirements");
          }}
          className={tabToView == "requirements" ? "active" : ""}
        >
          Requirements
        </button>

        <button
          onClick={() => {
            changeTabToView("supported");
          }}
          className={tabToView == "supported" ? "active" : ""}
        >
          Supported Devices
        </button>
      </div>
    </div>

    {tabToView == "requirements" ? (
      <RequirementSection 
      minimumRequirements={
        gameInfo!.moreInfo.gameRequirements.minimumRequirements
      }

      recommendedRequirements={
        gameInfo!.moreInfo.gameRequirements.recommendedRequirements
      }
      />
    ) : (
      <SupportedDevicesSection
      allSupportedDevices={
        gameInfo!.moreInfo.supportedDevices
      }
      />
    )}
        </section>

        <section className="screenshots">
        <div className="screenshots-inner">
        <h2>Screenshots</h2>

        <div className="slider">{mappedScreenShots}</div>
        </div>
        </section>

        <section className="similar-games">
    <div className="similar-games-inner">
      <h2>Similar Games</h2>

      <div className="similar-games-container">
        [No similar Game found]
      </div>
    </div>
        </section>

        </div>
        </>
      }
      
      {showReportModal && <ReportModal
      closeFn={closeReportModal}
      reportTypeName={gameInfo?.gameName || ""}
      reportType="Games"
      reportTypeId={gameId || "1234"}
      />}

    </main>
  );
}

export default GameInfo;
