import { Link } from "react-router";
import "./SingleReview.css"

type singleReviewProps = {
  phoneName: string;
  numberOfGames : number;
  fpsImage: string;
  graphicsImage: string;
  frameRateImage: string;
  username: string;
  submissionId: string;
}

function SingleReview({numberOfGames, fpsImage, frameRateImage, graphicsImage, phoneName, submissionId, username} : singleReviewProps) {
  return (
    <div className="single-review">
            <div className="image-grid">
              <img src={fpsImage} alt="review" />
              <img src={graphicsImage} alt="review" />
              <img src={frameRateImage} alt="review" />
              <img src="" alt="review" />
            </div>

            <div className="info">
              <p className="user-icon">{username[0]}</p>

              <div className="other-info">
                <h3>{username}</h3>
                <p>{phoneName} - {numberOfGames} Games</p>
            </div>
            </div>

            <hr />

            <div className="buttons">
                <Link to={`/admin/review/${submissionId}`}>
              <button>
                More Info
                </button>
              </Link>


              <button className="approve">Approve</button>
              <button className="decline">Decline</button>
            </div>
          </div>
  )
}

export default SingleReview