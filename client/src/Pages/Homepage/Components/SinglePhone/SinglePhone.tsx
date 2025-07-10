import "./SinglePhone.css"
import chipIcon from "./assets/icons/chip-icon.svg"
import screenIcon from "./assets/icons/screen-icon.svg"
import memoryIcon from "./assets/icons/ram-icon.svg"
import { useNavigate } from "react-router"

type SinglePhoneProps = {
  _id: string;
  phoneName: string;
  phoneChipset: string;
  phoneCoverImage: string;
  phoneDisplay: string[];
  phoneMemory: number[];
}

function SinglePhone({_id, phoneChipset, phoneCoverImage, phoneDisplay, phoneMemory, phoneName} : SinglePhoneProps) {
  const navigate = useNavigate()
  return (
    <div 
    className="single-phone">
    <img src={phoneCoverImage} alt={`image of ${phoneName}`} className="phone-image" />

    <div 
     onClick={()=>{
      navigate(`/phone/info/${_id}`)
    }}
    className="text">
        <h3>{phoneName}</h3>

        <div className="more-phone-text">
            <div className="processor">
                <img src={chipIcon} alt="chip icon" />
                <p>{phoneChipset}</p>
            </div>

            <div className="screen">
            <img src={screenIcon} alt="screen icon" />
            <p>{phoneDisplay[0]}p - {phoneDisplay[1]}Hz</p>
            </div>

            <div className="memory">
            <img src={memoryIcon} alt="memory icon" />
            <p>{phoneMemory[0]}GB RAM - {phoneMemory[1]}GB ROM</p>
            </div>
        </div>
    </div>
    </div>
  )
}

export default SinglePhone