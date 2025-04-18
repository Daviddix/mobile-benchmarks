import "./ContributeGame.css"
import smallPhoneIcon from "./assets/icons/small-phone-icon.svg"
import smallPadIcon from "./assets/icons/small-pad-icon.svg"
import PhoneInformation from "./components/PhoneInformation/PhoneInformation"
import GameInformation from "./components/GameInformation/GameInformation"
function ContributeGame() {
  return (
    <main className="contribute-main">
        <div className="contribute-inner">
            <h1>Contribute Information About a Game You Played on Your Device</h1>

            <div className="contribute-step">
                <div className="phone-info-container finished">
                    <div>
                        <img src={smallPhoneIcon} alt="phone icon" />
                        </div>

                        <p>Phone Information</p>
                    
                </div>

                <div className="divider"></div>
                
                <div className="game-info-container">
                    <div>
                        <img src={smallPadIcon} alt="game icon" />
                    </div>
                        <p>Game Information</p>
                    
                </div>
            </div>

            <PhoneInformation />

            <GameInformation />
        </div>
    </main>
  )
}

export default ContributeGame