import "./NoSimilarGames.css"
import noDeviceIllustration from "./assets/icons/games-empty.svg"

function NoSimilarGames() {
  return (
    <div className="no-similar-games-container">
        <img src={noDeviceIllustration} alt="no games illustration" />
        <h2>No Games Found</h2>
        <p>No similar game found for. We're updating our database and will add more soon</p>
    </div>
  )
}

export default NoSimilarGames