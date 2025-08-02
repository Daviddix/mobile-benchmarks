import "./SingleGameSubmission.css"

type singleGameSubmissionProps = {
    gameName: string;
    gameFps: [number, string];
    gameFrameRate: string[];
    gameGraphics: string[];
    gameBatteryDrain: number; 
    gameCompatibility: number; 
}

function SingleGameSubmission({gameName, gameBatteryDrain, gameCompatibility, gameFps, gameFrameRate, gameGraphics} : singleGameSubmissionProps) {

    async function approveGame(){
        try{
            
        }
        catch(err){

        }
    }
  return (
    <div className="single-submission-game">
                        <div className="game-name-heading">
                            <h3>{gameName}</h3>
                        </div>

                        <div className="submitted-game-info">
                            <div className="header">
                                <h3>Game FPS</h3>
                            </div>

                            <div className="other-info">
                                <p>{gameFps[0]}</p>
                                <img src={gameFps[1]} alt="proof of FPS" />
                            </div>
                        </div>

                        <div className="submitted-game-info">
                            <div className="header">
                                <h3>Game Frame Rate</h3>
                            </div>

                            <div className="other-info">
                                <p>{gameFrameRate[0]}</p>
                                <img src={gameFrameRate[1]} alt="proof of Frame Rate" />
                            </div>
                        </div>

                        <div className="submitted-game-info">
                            <div className="header">
                                <h3>Game Graphics</h3>
                            </div>

                            <div className="other-info">
                                <p>{gameGraphics[0]}</p>
                                <img src={gameGraphics[1]} alt="proof of Graphics" />
                            </div>
                        </div>

                        <div className="submitted-game-info">
                            <div className="header">
                                <h3>Game Battery Drain</h3>
                            </div>

                            <div className="other-info">
                                <p>{gameBatteryDrain}%</p>
                            </div>
                        </div>

                        <div className="submitted-game-info">
                            <div className="header">
                                <h3>General Compatibility</h3>
                            </div>

                            <div className="other-info">
                                <p>{gameCompatibility}</p>
                            </div>
                        </div>
                    </div>
  )
}

export default SingleGameSubmission