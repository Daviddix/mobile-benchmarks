import "./SingleGame.css"
import ramIcon from "./assets/icons/ram-icon.svg"
import platformIcon from "./assets/icons/platform-icon.svg"
import categoryIcon from "./assets/icons/game-category-icon.svg"
import { useNavigate } from "react-router"

type singleGameProps = {
        _id : string;
        gameName: string;
        gameCategory: string;
        gameSize: number;
        gamePlatform: string;
        gameCoverImage: string;
}

function SingleGame({gameCategory, gameCoverImage, gameName, gamePlatform, gameSize, _id} : singleGameProps) {
  const navigate = useNavigate()
  return (
    <div className="single-game">
                    <img src={gameCoverImage} alt={`game image for ${gameName}`}className="game-logo" />

                    <div 
                    onClick={()=>{
                    navigate(`/game/${_id}`)}}
                      className="text">
                        <h3>{gameName}</h3>

                        <div className="more-game-text">
                            <div className="category">
                                <img src={categoryIcon} alt="category icon" />
                                <p>{gameCategory}</p>
                            </div>

                            <div className="size">
                            <img src={ramIcon} alt="storage icon" />
                            <p>{gameSize}MB</p>
                            </div>

                            <div className="platform">
                            <img src={platformIcon} alt="platform" />
                            <p>{gamePlatform}</p>
                            </div>
                        </div>
                    </div>
    </div>
  )
}

export default SingleGame