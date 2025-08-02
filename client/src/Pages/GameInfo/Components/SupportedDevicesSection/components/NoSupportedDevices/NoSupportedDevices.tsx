import "./NoSupportedDevices.css"
import noDeviceIllustration from "./assets/icons/phone-empty.svg"

function NoSupportedDevices() {
  return (
    <div className="no-supported-devices-container">
        <img src={noDeviceIllustration} alt="no devices illustration" />
        <h2>No Devices Found</h2>
        <p>No supported device found for this game. We're updating our database and will add more soon</p>
    </div>
  )
}

export default NoSupportedDevices