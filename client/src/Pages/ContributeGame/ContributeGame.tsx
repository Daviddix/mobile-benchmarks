import "./ContributeGame.css"
import smallPhoneIcon from "./assets/icons/small-phone-icon.svg"
import controller from "./assets/icons/controller-icon.svg"
import PhoneInformation from "./components/PhoneInformation/PhoneInformation";
import GameInformation from "./components/GameInformation/GameInformation";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import FinishedModal from "./components/FinishedModal/FinishedModal";
import { useAtomValue } from "jotai";
import { showFinishedModalAtom } from "./shared_state/state";


function ContributeGame() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [contributeGameData, setContributeGameData] = useState<contributeGameDataType | null>(null)
    const showFinishedModal = useAtomValue(showFinishedModalAtom)
    const t : any = searchParams.get('step')


    const step = parseInt(t)
  
    // Redirect to step=1 if no step param
    useEffect(() => {
      if (!searchParams.get('step')) {
        const currentStep = searchParams.get('step');
        if (!currentStep) {
          setSearchParams({ step: '1' }, { replace: true }); // Use replace to avoid adding to history
        }
      }
    }, [searchParams, setSearchParams]);

  return (
    <main className="contribute-main">
        <div className="contribute-inner">
            <h1>Contribute Information About a Game You Played on Your Device</h1>

            <div className="contribute-step">
                <div className={step == 1 ?"phone-info-container progress" : "phone-info-container finished"}>
                    <div>
                        <img src={smallPhoneIcon} alt="phone icon" />
                        </div>

                        <p>Phone Information</p>
                    
                </div>

                <div className="divider"></div>
                
                <div className={step == 2 ? "game-info-container progress" : "game-info-container"}>
                    <div>
                        <img src={controller} alt="game icon" />
                    </div>
                        <p>Game Information</p>
                    
                </div>
            </div>

            {
                step == 1?
                <PhoneInformation 
                setContributeGameData={setContributeGameData} 
                contributeGameData={contributeGameData} 
                />
                :
                step == 2 ? 
                <GameInformation 
                setContributeGameData={setContributeGameData} 
                contributeGameData={contributeGameData} 
                />
                :
                ""
            }

        </div>
            {showFinishedModal && <FinishedModal />}
    </main>
  )
}

export default ContributeGame