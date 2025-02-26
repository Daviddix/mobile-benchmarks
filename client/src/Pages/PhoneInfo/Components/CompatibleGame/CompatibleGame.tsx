import "./CompatibleGame.css"
import testGameImage from "./assets/images/screenshot-test.webp";
import graphicsIcon from "./assets/icons/graphics-icon.svg";
import androidIcon from "./assets/icons/android-icon.svg";
import frameRateIcon from "./assets/icons/frame-rate-icon.svg";
import iosIcon from "./assets/icons/ios-icon.svg";
import batteryIcon from "./assets/icons/battery-icon.svg";
import linkIcon from "./assets/icons/link-icon.svg";
import fpsIcon from "./assets/icons/fps-icon.svg"

function CompatibleGame() {
  return (
    <div className="single-compatible-game">
            <div className="image">
              <img src={testGameImage} alt="game image" />
              <h2>Fortnite Battle Royale</h2>
              <div className="badge high">
                <p>90%</p>
              </div>
            </div>

            <div className="text">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusamus recusandae excepturi maiores vitae necessitatibus
                tempore sequi ut fugiat voluptates, illum, mollitia, laudantium
                nemo dolores. Eum dolorum rem harum consequatur nulla!
              </p>

              <hr />

              <div className="game-settings">
                <div className="single-setting">
                  <img src={graphicsIcon} alt="graphics icon" />
                  <p>Medium</p>
                  <small>Graphics</small>
                </div>

                <div className="single-setting">
                  <img src={frameRateIcon} alt="frame rate icon" />
                  <p>High</p>
                  <small>Frame Rate</small>
                </div>

                <div className="single-setting small">
                  <img src={batteryIcon} alt="battery icon" />
                  <p>10%</p>
                  <small>/hr</small>
                </div>

                <div className="single-setting">
                  <img src={iosIcon} alt="apple icon" />
                  <p>
                    Download <img src={linkIcon} alt="link icon" />
                  </p>
                  <small>Appstore</small>
                </div>

                <div className="single-setting">
                  <img src={androidIcon} alt="playstore icon" />
                  <p>
                    Download <img src={linkIcon} alt="link icon" />
                  </p>
                  <small>Playstore</small>
                </div>

                <div className="single-setting small">
                  <img src={fpsIcon} alt="fps icon" />
                  <p>60</p>
                  <small>fps</small>
                </div>
              </div>
            </div>
          </div>
  )
}

export default CompatibleGame