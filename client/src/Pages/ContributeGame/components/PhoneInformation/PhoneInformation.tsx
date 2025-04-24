import { Link, useNavigate, useSearchParams } from "react-router"
import "./PhoneInformation.css"
import { useAtom } from "jotai";
import { contributeStepAtom } from "../../shared_state/state";

function PhoneInformation() {
  const [contributeStep, setContributeStep] = useAtom(contributeStepAtom)
  const navigate = useNavigate()

  return (
    <>
    <form className="contribute-phone-form">
                <div>
                    <label htmlFor="phone-name">Phone Name</label>
                    <input type="text" name="phone-name" id="phone-name" placeholder='Samsung Galaxy A15' />
                </div>

                <div className='two-input'>
                    <label htmlFor="storage">Storage Variant</label>

                    <div>
                    <input 
                    id="storage"
                    type="number" placeholder='RAM' />

                    <input type="number" placeholder='ROM' />    
                    </div>
                </div>
            </form>


            <button 
            onClick={()=>{
              navigate(`/contribute/game?step=2`)
            }}
            className="next">Next</button>
            

    </>
  )
}

export default PhoneInformation