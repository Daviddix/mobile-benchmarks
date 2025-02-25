import "./SinglePhone.css"
import testGameLogo from "./assets/images/logo-test.webp"
import ramIcon from "./assets/icons/ram-icon.svg"
import platformIcon from "./assets/icons/platform-icon.svg"

function SinglePhone() {
  return (
    <div className="single-phone">
                    <img src={testGameLogo} alt="phone image" className="phone-logo" />

                    <div className="text">
                        <h3>Samsung Galaxy A15</h3>

                        <div className="more-phone-text">
                            <div className="processor">
                                <img src="" alt="" />
                                <p>Helio G99</p>
                            </div>

                            <div className="screen">
                            <img src={ramIcon} alt="screen icon" />
                            <p>1280p - 90Hz</p>
                            </div>

                            <div className="memory">
                            <img src={platformIcon} alt="memory" />
                            <p>4GB RAM - 128GB ROM</p>
                            </div>
                        </div>
                    </div>
                </div>
  )
}

export default SinglePhone