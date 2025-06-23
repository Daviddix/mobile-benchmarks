import "./SingleReview.css"

function SingleReview() {
  return (
    <div className="single-review">
            <div className="image-grid">
              <img src="" alt="review" />
              <img src="" alt="review" />
              <img src="" alt="review" />
              <img src="" alt="review" />
            </div>

            <div className="info">
              <p>N</p>

              <div className="other-info">
                <h3>Nsikan-David</h3>
                <p>Samsung S21 - 5 Games</p>
            </div>
            </div>

            <hr />

            <div className="buttons">
              <button>More Info</button>
              <button className="approve">Approve</button>
              <button className="decline">Decline</button>
            </div>
          </div>
  )
}

export default SingleReview