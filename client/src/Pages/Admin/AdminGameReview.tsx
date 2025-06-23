import "./AdminGameReview.css";
import SingleReview from "./Components/SingleReview/SingleReview";

function AdminGameReview() {
  return (
    <main className="admin-panel">
      <div className="admin-panel-inner">
        <div className="title">
          <h1>Games for Review</h1>
          <small>47</small>
        </div>

        <div className="all-games-to-review-container">
          <SingleReview />
        </div>
        
      </div>
    </main>
  )
}

export default AdminGameReview