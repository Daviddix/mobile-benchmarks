import "./SingleGame.css"
import testGameLogo from "./assets/images/logo-test.webp"
import ramIcon from "./assets/icons/ram-icon.svg"
import platformIcon from "./assets/icons/platform-icon.svg"
import categoryIcon from "./assets/icons/game-category-icon.svg"

function SingleGame() {
  return (
    <div className="single-game">
                    <img src={testGameLogo} alt="game image" className="game-logo" />

                    <div className="text">
                        <h3>Fortnite Battle Royale</h3>

                        <div className="more-game-text">
                            <div className="category">
                                <img src={categoryIcon} alt="category icon" />
                                <p>Battle Royale</p>
                            </div>

                            <div className="size">
                            <img src={ramIcon} alt="storage icon" />
                            <p>900MB</p>
                            </div>

                            <div className="platform">
                            <img src={platformIcon} alt="platform" />
                            <p>Android&iOS</p>
                            </div>
                        </div>
                    </div>
                </div>
  )
}

export default SingleGame