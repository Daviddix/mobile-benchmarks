import "./GameInfo.css"
import SinglePhone from "../Homepage/Components/SinglePhone/SinglePhone";
import SingleGame from "../Homepage/Components/SingleGame/SingleGame";
import testGameImage from "./assets/images/logo-test.webp"
import linkIcon from "./assets/icons/link-icon.svg"
import screenshotTest from "./assets/images/screenshot-test.webp"

function GameInfo() {
  return (
    <main className="game-info-main">
      <div className="game-info-inner">
        <img src={testGameImage} alt="game image" className="game-image" />

        <div className="game-info-text">
          <h2>Need for Speed : No Limits</h2>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam veritatis numquam incidunt omnis inventore corporis odio necessitatibus est consequuntur enim!</p>

          <div className="other-game-info">

            <div className="single-game-info">
              <h3>Year</h3>
              <p>2012</p>
            </div>

            <div className="single-game-info">
              <h3>Genre</h3>
              <p>Racing</p>
            </div>

            <div className="single-game-info">
              <h3>Ratings</h3>
              <p>5.5<small>(200)</small></p>
            </div>

            <div className="single-game-info">
              <h3>Platform</h3>
              <p>Android <small>&</small> iOS</p>
            </div>

            <div className="single-game-info">
              <h3>Download</h3>
              <p>Playstore <img src={linkIcon} alt="link" /></p>
              <p>Appstore <img src={linkIcon} alt="link" /></p>
            </div>

          </div>
        </div>
        </div>

        <div className="bottom-game-info">

        <section className="requirements">
          <div className="tab">
            <div className="tab-inner">
            <button>Requirements</button>
            <button className="active">Supported Devices</button>
            </div>
          </div>

          <div className="supported-devices-container">
            <div className="supported-devices-inner">
            <SinglePhone />
            <SinglePhone />
            </div>
          </div>
        </section>

        <section className="screenshots">
          <div className="screenshots-inner">

          <h2>Screenshots</h2>

          <div className="slider">
            <img src={screenshotTest} alt="screenshot" />
            <img src={screenshotTest} alt="screenshot" />
            <img src={screenshotTest} alt="screenshot" />
          </div>
          </div>
        </section>

        <section className="similar-games">

          <div className="similar-games-inner">
            <h2>Similar Games</h2>

          <div className="similar-games-container">
          <SingleGame />
          <SingleGame />
          </div>

          </div>
        </section>
      
        </div>
    </main>
  );
}

export default GameInfo;
