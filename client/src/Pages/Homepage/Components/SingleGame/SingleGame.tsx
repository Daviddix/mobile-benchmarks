import "./SingleGame.css";
import ramIcon from "./assets/icons/ram-icon.svg";
import platformIcon from "./assets/icons/platform-icon.svg";
import categoryIcon from "./assets/icons/game-category-icon.svg";
import { Link, useNavigate } from "react-router";
import { formatSize } from "../../../../libs/size";

type storageSizeType = {
      androidSize : number,
      iosSize : number
    }

type singleGameProps = {
  _id: string;
  gameName: string;
  gameCategory: string;
  gameSize: storageSizeType;
  gamePlatform: string;
  gameCoverImage: string;
};

function SingleGame({
  gameCategory,
  gameCoverImage,
  gameName,
  gamePlatform,
  gameSize,
  _id,
}: singleGameProps) {


  return (
    <Link className="single-game-link" to={`/game/info/${_id}`}>
    <div className="single-game">
      <img
        src={gameCoverImage}
        alt={`game image for ${gameName}`}
        className="game-logo"
      />

      <div className="text"
      >
        <h3>{gameName}</h3>

        <div className="more-game-text">
          <div className="category">
            <img src={categoryIcon} alt="category icon" />
            <p>{gameCategory}</p>
          </div>

          <div className="size">
            <img src={ramIcon} alt="storage icon" />
            <div className="android-ios-size">
              <div className="android-size">
                <p>{formatSize(gameSize.androidSize)} <small>Android</small></p>
              </div>

              <hr />

              <div className="ios-size">
                <p>{formatSize(gameSize.iosSize)} <small>iOS</small></p>
              </div>
            </div>
          </div>

          <div className="platform">
            <img src={platformIcon} alt="platform" />
            <p>{gamePlatform}</p>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
}

export default SingleGame;
