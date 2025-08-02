import SinglePhone from "../../../Homepage/Components/SinglePhone/SinglePhone";
import NoSupportedDevices from "./components/NoSupportedDevices/NoSupportedDevices";
import "./SupportedDevicesSection.css"

type SupportedDevicesSectionProps = {
  allSupportedDevices: phoneData[];
};


function SupportedDevicesSection({allSupportedDevices} : SupportedDevicesSectionProps) {
  const mappedPhones = allSupportedDevices.map(({_id, phoneChipset, phoneCoverImage, phoneDisplay, phoneMemory, phoneName})=>{
    return <SinglePhone
    _id={_id}
    phoneChipset={phoneChipset}
    phoneCoverImage={phoneCoverImage}
    phoneDisplay={phoneDisplay}
    phoneMemory={phoneMemory}
    phoneName={phoneName}
    />
  })
  return (
    <div className="supported-devices-container">
            <div className={allSupportedDevices.length === 0 ? "supported-devices-inner empty" : "supported-devices-inner"}>
              {
                allSupportedDevices.length === 0 ?
                <NoSupportedDevices />
                :
              mappedPhones
              }
            </div>
    </div>
  )
}

export default SupportedDevicesSection