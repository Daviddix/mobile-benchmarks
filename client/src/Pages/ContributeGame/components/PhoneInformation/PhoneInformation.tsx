import { Link, useNavigate, useSearchParams } from "react-router"
import "./PhoneInformation.css"
import { useAtom } from "jotai";
import { contributeStepAtom } from "../../shared_state/state";
import { useState } from "react";

type contributeGameDataType = {
  phoneInfo : {
    phoneName : string;
    phoneRam : number;
    phoneRom : number;
  };
  gameInfo : {
    gameName: string;
    gameFps: [number, string];
    gmeFrameRate: [number, string];
    gameGraphics: [string, string];
    gameBatteryDrain: number;
    gameCompatibility: number;

  }
}

type phoneInformationProps = {
  contributeGameData : contributeGameDataType | {};
  setContributeGameData : React.Dispatch<React.SetStateAction<{} | contributeGameDataType>>;
}

type phoneInformationDataType = {
  phoneName : string;
    phoneRam : number;
    phoneRom : number;
}

function PhoneInformation({contributeGameData, setContributeGameData} : phoneInformationProps) {
  const [phoneInformationData, setPhoneInformationData] = useState<phoneInformationDataType>({phoneName : "", phoneRam : 0, phoneRom : 0})
  const [phoneInformationDataError, setPhoneInformationDataError] = useState("")
  const navigate = useNavigate()

  function validateInput(){
    setPhoneInformationDataError("")

    const {phoneName, phoneRam, phoneRom } = phoneInformationData

    if(phoneName.trim() == "" || (phoneRam == 0 || typeof phoneRam !== "number") || (phoneRom == 0 || typeof phoneRom !== "number")){
      setPhoneInformationDataError("Seems like there's an error in the information you entered, Please check it and try again")
      return false
    }

    setContributeGameData({
      phoneInfo : {...phoneInformationData}
    })

    return true
  }

  return (
    <>
    <form className="contribute-phone-form">
                <div>
                    <label htmlFor="phone-name">Phone Name</label>
                    <input 
                    required 
                    type="text" 
                    name="phoneName" 
                    onChange={(e)=>{
                      setPhoneInformationData((prev)=>({
                        ...prev,
                        [e.target.name] : e.target.value
                     }))
                    }}
                    value={phoneInformationData.phoneName}
                    id="phone-name" 
                    placeholder='Samsung Galaxy A15' />
                </div>

                <div className='two-input'>
                    <label htmlFor="storage">Storage Variant</label>

                    <div>
                    <input 
                    required
                    id="storage"
                    onChange={(e)=>{
                      setPhoneInformationData((prev)=>({
                        ...prev,
                        [e.target.name] : e.target.valueAsNumber
                     }))
                    }}
                    value={phoneInformationData.phoneRam}
                    type="number" 
                    name="phoneRam"
                    placeholder='RAM' />

                    <input 
                    required 
                    onChange={(e)=>{
                      setPhoneInformationData((prev)=>({
                        ...prev,
                        [e.target.name] : e.target.valueAsNumber
                     }))
                    }}
                    value={phoneInformationData.phoneRom}
                    type="number" 
                    name="phoneRom"
                    placeholder='ROM' />    
                    </div>
                </div>

                {
                  phoneInformationDataError && <p className="error">{phoneInformationDataError}</p>
                }
            </form>


            <button 
            onClick={()=>{
              validateInput() ? 
              navigate(`/contribute/game?step=2`)
              :
              ""
            }}
            className="next">Next</button>
            

    </>
  )
}

export default PhoneInformation