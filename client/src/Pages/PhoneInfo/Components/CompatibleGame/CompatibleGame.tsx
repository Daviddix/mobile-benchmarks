import "./CompatibleGame.css"
import graphicsIcon from "./assets/icons/graphics-icon.svg";
import androidIcon from "./assets/icons/android-icon.svg";
import frameRateIcon from "./assets/icons/frame-rate-icon.svg";
import iosIcon from "./assets/icons/ios-icon.svg";
import batteryIcon from "./assets/icons/battery-icon.svg";
import linkIcon from "./assets/icons/link-icon.svg";
import fpsIcon from "./assets/icons/fps-icon.svg"
import Badge from "./Components/Badge/Badge";

type compatibleGameProps = {
  gameCoverImage: string,
  gameName:string,
  gameIosLink : string;
  gameAndroidLink : string;
  gameCompatibilityRating: number,
  gameDescription:string,
  gamePerformanceStats: {
        fps: number;
        frameRate: string;
        graphicsQuality: string;
        batteryUsagePerHour: number;
  }
}

function CompatibleGame({gameCoverImage, gameDescription, gameName,gameCompatibilityRating, gamePerformanceStats, gameAndroidLink, gameIosLink} : compatibleGameProps) {
  return (
    <div className="single-compatible-game">
            <div className="image">
              <img src={gameCoverImage} alt={`game image for ${gameName}`} />
              <h2>{gameName}</h2>
              <Badge rating={gameCompatibilityRating} />
            </div>

            <div className="text">
              <p>
                {gameDescription}
              </p>

              <hr />

              <div className="game-settings">
                <div className="single-setting">
                  <img src={graphicsIcon} alt="graphics icon" />
                  <p>{gamePerformanceStats.graphicsQuality}</p>
                  <small>Graphics</small>
                </div>

                <div className="single-setting">
                  <img src={frameRateIcon} alt="frame rate icon" />
                  <p>{gamePerformanceStats.frameRate}</p>
                  <small>Frame Rate</small>
                </div>

                {gamePerformanceStats.batteryUsagePerHour && <div className="single-setting small">
                  <img src={batteryIcon} alt="battery icon" />
                  <p>{gamePerformanceStats.batteryUsagePerHour}</p>
                  <small>/hr</small>
                </div>}

                <div className="single-setting">
                  <img src={iosIcon} alt="apple icon" />
                  <p>
                    <a href={gameIosLink} target="_blank" rel="noopener noreferrer">
                    Download <img src={linkIcon} alt="link icon" />
                    </a>
                  </p>
                  <small>Appstore</small>
                </div>

                <div className="single-setting">
                  <img src={androidIcon} alt="playstore icon" />
                  <p>
                    <a href={gameAndroidLink} target="_blank" rel="noopener noreferrer">
                    Download <img src={linkIcon} alt="link icon" />
                    </a>
                  </p>
                  <small>Playstore</small>
                </div>

                {gamePerformanceStats.fps && <div className="single-setting small">
                  <img src={fpsIcon} alt="fps icon" />
                  <p>{gamePerformanceStats.fps}</p>
                  <small>fps</small>
                </div>}
              </div>
            </div>
    </div>
  )
}

export default CompatibleGame