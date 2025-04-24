import "./ContributeGame.css"
import smallPhoneIcon from "./assets/icons/small-phone-icon.svg"
import smallPadIcon from "./assets/icons/small-pad-icon.svg"
import PhoneInformation from "./components/PhoneInformation/PhoneInformation";
import GameInformation from "./components/GameInformation/GameInformation";
import { contributeStepAtom } from "./shared_state/state";
import { useAtom } from "jotai";
import { useSearchParams } from "react-router";
import { useEffect } from "react";


function ContributeGame() {
    const [searchParams, setSearchParams] = useSearchParams()
    const t : any = searchParams.get('step')
    
    const step = parseInt(t)
  
    // Redirect to step=1 if no step param
    useEffect(() => {
      if (!searchParams.get('step')) {
        setSearchParams({ step: '1' })
      }
    }, [searchParams, setSearchParams])


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

            {
                step == 1?
                <PhoneInformation />
                :
                step == 2 ? 
                <GameInformation />
                :
                ""
            }
        </div>
    </main>
  )
}

export default ContributeGame