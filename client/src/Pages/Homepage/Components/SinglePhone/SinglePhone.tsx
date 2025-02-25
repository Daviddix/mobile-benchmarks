import "./SinglePhone.css"
import chipIcon from "./assets/icons/chip-icon.svg"
import screenIcon from "./assets/icons/screen-icon.svg"
import memoryIcon from "./assets/icons/ram-icon.svg"
import phoneImage from "./assets/images/phone-test.jpg"

function SinglePhone() {
  return (
    <div className="single-phone">
    <img src={phoneImage} alt="phone image" className="phone-image" />

    <div className="text">
        <h3>Samsung Galaxy A15</h3>

        <div className="more-phone-text">
            <div className="processor">
                <img src={chipIcon} alt="chip icon" />
                <p>Helio G99</p>
            </div>

            <div className="screen">
            <img src={screenIcon} alt="screen icon" />
            <p>1280p - 90Hz</p>
            </div>

            <div className="memory">
            <img src={memoryIcon} alt="memory icon" />
            <p>4GB RAM - 128GB ROM</p>
            </div>
        </div>
    </div>
</div>
  )
}

export default SinglePhone