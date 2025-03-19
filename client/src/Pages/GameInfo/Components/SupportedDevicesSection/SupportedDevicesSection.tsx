import SinglePhone from "../../../Homepage/Components/SinglePhone/SinglePhone";
import "./SupportedDevicesSection.css"

type popularPhoneInfo = {
  _id: string;
  phoneName: string;
  phoneChipset: string;
  phoneCoverImage: string;
  phoneDisplay: string[];
  phoneMemory: number[];
}

type SupportedDevicesSectionProps = {
  allSupportedDevices: popularPhoneInfo[];
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
            <div className="supported-devices-inner">
              {mappedPhones}
            </div>
    </div>
  )
}

export default SupportedDevicesSection