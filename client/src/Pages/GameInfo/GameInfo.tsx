import "./GameInfo.css"
import linkIcon from "./assets/icons/link-icon.svg"
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import SupportedDevicesSection from "./Components/SupportedDevicesSection/SupportedDevicesSection";
import RequirementSection from "./Components/RequirementSection/RequirementSection";
import GameInfoLoaderSkeleton from "./Components/GameInfoLoaderSkeleton/GameInfoLoaderSkeleton";

function GameInfo() {
  type fetchingStateType = "loading" | "error" | "completed"

  type tabTypes = "requirements" | "supported"

  type Requirements = {
    operatingSystem: string;
    processor: string;
    gpu: string;
    ram: number;
    storageSize: number;
    additionalFeatures: string;
  };

  type popularPhoneInfo = {
    _id: string;
    phoneName: string;
    phoneChipset: string;
    phoneCoverImage: string;
    phoneDisplay: string[];
    phoneMemory: number[];
  }
  
  type GameRequirements = {
    minimumRequirements: Requirements;
    recommendedRequirements: Requirements;
  };
  
  type MoreInfo = {
    supportedDevices : popularPhoneInfo[];
    similarGames : Game[];
    gameRequirements: GameRequirements;
    gameScreenshots?: string[]; // Optional array of strings
  };
  
  type Game = {
    gameName: string;
    gameCategory: string;
    gameSize: number;
    gamePlatform: string;
    gameCoverImage: string;
    gameDescription: string;
    gameYearOfRelease: number;
    gameRating: [number, number]; // Tuple with exactly 2 numbers
    androidDownloadLink: string;
    iosDownloadLink: string;
    moreInfo: MoreInfo;
  };

  const [fetchingState, setFetchingState] = useState<fetchingStateType>("loading")
  const [gameInfo, setGameInfo] = useState<Game | null>(null)
  const [tabToView, setTabToView] = useState<tabTypes>("requirements")
  const {gameId} = useParams()

  async function getGameInformation(gameId : string | undefined) {
    try{
      setFetchingState("loading")
      const rawFetch = await fetch(`http://localhost:3000/api/game/${gameId}`)
      const responseInJson : Game = await rawFetch.json()
      setGameInfo(responseInJson)


      if(!rawFetch.ok){
        throw new Error("An error occurred", {cause : responseInJson})
      }
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

  useEffect(()=>{
    getGameInformation(gameId)
  }, [])
  return (
    <main className="game-info-main">
      {
        fetchingState == "loading"?
        <GameInfoLoaderSkeleton />
        :
        fetchingState == "error"?
        <div>Error...</div>
        :
        <>
        <div className="game-info-inner">
        <img
          src={gameInfo?.gameCoverImage}
          alt="game image"
          className="game-image"
        />

        <div className="game-info-text">
          <h2>{gameInfo?.gameName}</h2>

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
                <small>({gameInfo?.gameRating[1].toLocaleString()})</small>
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
        {/* <SingleGame />
    <SingleGame /> */}
      </div>
    </div>
  </section>

        </div>
        </>
      }
      

    </main>
  );
}

export default GameInfo;
