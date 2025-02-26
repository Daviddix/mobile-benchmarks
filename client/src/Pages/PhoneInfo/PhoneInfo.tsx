import "./PhoneInfo.css";
import testPhoneImage from "./assets/images/phone-test.jpg";
import testGameImage from "./assets/images/screenshot-test.webp";
import graphicsIcon from "./assets/icons/graphics-icon.svg";
import androidIcon from "./assets/icons/android-icon.svg";
import frameRateIcon from "./assets/icons/frame-rate-icon.svg";
import iosIcon from "./assets/icons/ios-icon.svg";
import batteryIcon from "./assets/icons/battery-icon.svg";
import linkIcon from "./assets/icons/link-icon.svg";
import fpsIcon from "./assets/icons/fps-icon.svg"

function PhoneInfo() {
  return (
    <main className="phone-info-main">
      <div className="phone-info-inner">
        <img src={testPhoneImage} alt="phone info" className="phone-image" />

        <div className="phone-info-text">
          <h2>Samsung Galaxy A15 5G</h2>

          <div className="other-phone-info">
            <div className="single-phone-info">
              <h3>General Compatibility</h3>
              <p>60%</p>
            </div>

            <div className="single-phone-info">
              <h3>Storage</h3>
              <p>
                6GB <small>RAM</small> - 128GB <small>ROM</small>
              </p>
            </div>

            <div className="single-phone-info">
              <h3>CPU</h3>
              <p>Helio G99</p>
            </div>

            <div className="single-phone-info">
              <h3>Average Rating</h3>
              <p>
                5.5<small>(213)</small>
              </p>
            </div>

            <div className="single-phone-info">
              <h3>GPU</h3>
              <p>Mali-G913</p>
            </div>

            <div className="single-phone-info">
              <h3>Display</h3>
              <p>
                1290<small>p</small> - 90<small>Hz</small>
              </p>
            </div>

            <div className="single-phone-info">
              <h3>Geekbench</h3>
              <p>2850</p>
            </div>

            <div className="single-phone-info">
              <h3>AnTuTu</h3>
              <p>1234</p>
            </div>

            <div className="single-phone-info">
              <h3>3D Mark</h3>
              <p>3600</p>
            </div>
          </div>
        </div>
      </div>

      <section className="compatible-games">
        <div className="compatible-games-inner">
          <h1>Compatible Games</h1>

          <div className="compatible-games-container">
          
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

          </div>


        </div>
      </section>
    </main>
  );
}

export default PhoneInfo;
