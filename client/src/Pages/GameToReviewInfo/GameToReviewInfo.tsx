import "./GameToReviewInfo.css";

function GameToReviewInfo() {
  return (
    <main className="single-game-to-review">
        <div className="single-game-to-review-inner">
            <div className="top-info">
                <div className="left">
                    <h2>Samsung Galaxy S21 Ultra</h2>
                    <p>8GB RAM - 128GB ROM</p>
                    <small>By Nsikan-David</small>
                </div>

                <div className="right">
                    <button className="approve">Approve</button>
                    <button className="decline">Decline</button>
                </div>
            </div>
        </div>

        <section className="all-games-from-submission">

            <div className="all-games-from-submission-inner">
                  <div className="heading">
                <h2>Games</h2>
                <small>3</small>
                </div>

                <div className="all-submitted-games-container">
                    <div className="single-submission-game">
                        <div className="game-name-heading">
                            <h3>Amazing Spiderman</h3>
                        </div>

                        <div className="submitted-game-info">
                            <div className="header">
                                <h3>Game FPS</h3>
                            </div>

                            <div className="other-info">
                                <p>60</p>
                                <img src="" alt="proof of FPS" />
                            </div>
                        </div>

                        <div className="submitted-game-info">
                            <div className="header">
                                <h3>Game Frame Rate</h3>
                            </div>

                            <div className="other-info">
                                <p>Medium</p>
                                <img src="" alt="proof of Frame Rate" />
                            </div>
                        </div>

                        <div className="submitted-game-info">
                            <div className="header">
                                <h3>Game Graphics</h3>
                            </div>

                            <div className="other-info">
                                <p>Ultra</p>
                                <img src="" alt="proof of Graphics" />
                            </div>
                        </div>

                        <div className="submitted-game-info">
                            <div className="header">
                                <h3>Game Battery Drain</h3>
                            </div>

                            <div className="other-info">
                                <p>23%</p>
                            </div>
                        </div>

                        <div className="submitted-game-info">
                            <div className="header">
                                <h3>General Compatibility</h3>
                            </div>

                            <div className="other-info">
                                <p>70</p>
                            </div>
                        </div>
                    </div>

                    <div className="single-submission-game">
                        <div className="game-name-heading">
                            <h3>Amazing Spiderman</h3>
                        </div>

                        <div className="submitted-game-info">
                            <div className="header">
                                <h3>Game FPS</h3>
                            </div>

                            <div className="other-info">
                                <p>60</p>
                                <img src="" alt="proof of FPS" />
                            </div>
                        </div>

                        <div className="submitted-game-info">
                            <div className="header">
                                <h3>Game Frame Rate</h3>
                            </div>

                            <div className="other-info">
                                <p>Medium</p>
                                <img src="" alt="proof of Frame Rate" />
                            </div>
                        </div>

                        <div className="submitted-game-info">
                            <div className="header">
                                <h3>Game Graphics</h3>
                            </div>

                            <div className="other-info">
                                <p>Ultra</p>
                                <img src="" alt="proof of Graphics" />
                            </div>
                        </div>

                        <div className="submitted-game-info">
                            <div className="header">
                                <h3>Game Battery Drain</h3>
                            </div>

                            <div className="other-info">
                                <p>23%</p>
                            </div>
                        </div>

                        <div className="submitted-game-info">
                            <div className="header">
                                <h3>General Compatibility</h3>
                            </div>

                            <div className="other-info">
                                <p>70</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
              
        </section>
    </main>
  )
}

export default GameToReviewInfo