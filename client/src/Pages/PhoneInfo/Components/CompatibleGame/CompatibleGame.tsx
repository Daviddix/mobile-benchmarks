import "./CompatibleGame.css"
import graphicsIcon from "./assets/icons/graphics-icon.svg";
import androidIcon from "./assets/icons/android-icon.svg";
import frameRateIcon from "./assets/icons/frame-rate-icon.svg";
import iosIcon from "./assets/icons/ios-icon.svg";
import batteryIcon from "./assets/icons/battery-icon.svg";
import linkIcon from "./assets/icons/link-icon.svg";
import fpsIcon from "./assets/icons/fps-icon.svg"

type gameDataType = {
  fps: number,
    frameRate: string,
    playStoreDownloadLink: string,
    iosDownloadLink: string,
    graphicsQuality: string,
    batteryUsagePerHour: number,
}

type compatibleGameProps = {
  gameCoverImage: string,
  gameName:string,
  gameCompatibilityRating: number,
  gameDescription:string,
  gameData: gameDataType
}

function CompatibleGame({gameCoverImage, gameDescription, gameName, gameData} : compatibleGameProps) {
  return (
    <div className="single-compatible-game">
            <div className="image">
              <img src={gameCoverImage} alt={`game image for ${gameName}`} />
              <h2>{gameName}</h2>
              <div className="badge high">
                <p>90%</p>
              </div>
            </div>

            <div className="text">
              <p>
                {gameDescription}
              </p>

              <hr />

              <div className="game-settings">
                <div className="single-setting">
                  <img src={graphicsIcon} alt="graphics icon" />
                  <p>{gameData.graphicsQuality}</p>
                  <small>Graphics</small>
                </div>

                <div className="single-setting">
                  <img src={frameRateIcon} alt="frame rate icon" />
                  <p>{gameData.fps}</p>
                  <small>Frame Rate</small>
                </div>

                <div className="single-setting small">
                  <img src={batteryIcon} alt="battery icon" />
                  <p>{gameData.batteryUsagePerHour}</p>
                  <small>/hr</small>
                </div>

                <div className="single-setting">
                  <img src={iosIcon} alt="apple icon" />
                  <p>
                    <a href={gameData.iosDownloadLink} target="_blank" rel="noopener noreferrer">
                    Download <img src={linkIcon} alt="link icon" />
                    </a>
                  </p>
                  <small>Appstore</small>
                </div>

                <div className="single-setting">
                  <img src={androidIcon} alt="playstore icon" />
                  <p>
                    <a href={gameData.playStoreDownloadLink} target="_blank" rel="noopener noreferrer">
                    Download <img src={linkIcon} alt="link icon" />
                    </a>
                  </p>
                  <small>Playstore</small>
                </div>

                <div className="single-setting small">
                  <img src={fpsIcon} alt="fps icon" />
                  <p>{gameData.fps}</p>
                  <small>fps</small>
                </div>
              </div>
            </div>
    </div>
  )
}

export default CompatibleGame