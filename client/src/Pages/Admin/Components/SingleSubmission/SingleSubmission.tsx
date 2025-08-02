import { Link } from "react-router";
import "./SingleSubmission.css"

type singleReviewProps = {
  phoneName: string;
  numberOfGames : number;
  fpsImage: string;
  graphicsImage: string;
  frameRateImage: string;
  username: string;
  submissionId: string;
  approveFunction: (submissionId: string) => void;
  declineFunction: (submissionId: string) => void;
}

function SingleSubmission({numberOfGames, approveFunction, declineFunction, fpsImage, frameRateImage, graphicsImage, phoneName, submissionId, username} : singleReviewProps) {
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
                <Link to={`/admin/review/game/${submissionId}`}>
              <button>
                More Info
                </button>
              </Link>


              <button 
              onClick={() => approveFunction(submissionId)}
              className="approve">Approve</button>

              <button
              onClick={() => declineFunction(submissionId)}
              className="decline">Decline</button>
            </div>
          </div>
  )
}

export default SingleSubmission