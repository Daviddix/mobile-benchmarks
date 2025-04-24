import "./GameInformation.css"
import pictureIcon from "./assets/icons/picture-icon.svg"
import plusIcon from "./assets/icons/plus-icon.svg"

function GameInformation() {
  return (
    <form className="contribute-game-form">
        <div>
            <label htmlFor="game-name">Game Name</label>

            <input type="text" 
            id="game-name" placeholder='Super Mario' />
        </div>

        <div>
            <label htmlFor="game-fps">Game FPS</label>

            <div className="bigger-input">
                <input type="text" name="game-fps" 
                placeholder="60" id="game-fps" />

                <div className="attach">
                <img src={pictureIcon} alt="image icon" />

                    <p>Attach a screenshot showing a gameplay with the FPS count showing</p>
                </div>
            </div>
        </div>

        <div>
            <label htmlFor="game-frame-rate">Game Frame Rate</label>

            <div className="bigger-input">
                <input type="text" 
                placeholder="Medium"
                name="game-frame-rate" id="game-frame-rate" />

                <div className="attach">

                    <img src={pictureIcon} alt="image icon" />

                    <p>Attach a screenshot showing a gameplay with the Frame Rate you played on</p>
                </div>
            </div>
        </div>

        <div>
            <label htmlFor="game-graphics">Game Graphics</label>

            <div className="bigger-input">
                <input type="text" 
                placeholder="Ultra" name="game-graphics" id="game-graphics" />

                <div className="attach">
                    <img src={pictureIcon} alt="image icon" />

                    <p>Attach a screenshot showing the Graphics Settings you played on</p>
                </div>
            </div>
        </div>

        <div>
            <label htmlFor="battery-drain">Game Battery Drain <small>(% per hr)</small>

            </label>

            <input type="number" placeholder='60' min={1} max={90} />
        </div>

        <div>
            <label htmlFor="general">General Compatibility</label>

            <input id='general' type="range" />
        </div>

        <button className="more-games">
            <img src={plusIcon} alt="plus icon" /> Add More Games
        </button>

        <button className="primary">Submit</button>
    </form>
  )
}

export default GameInformation