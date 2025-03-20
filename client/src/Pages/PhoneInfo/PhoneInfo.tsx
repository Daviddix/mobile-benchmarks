import { useParams } from "react-router";
import "./PhoneInfo.css";
import testPhoneImage from "./assets/images/phone-test.jpg";
import { useEffect, useState } from "react";
import CompatibleGamesSection from "./Components/CompatibleGamesSection/CompatibleGamesSection";
import PhoneInfoSkeletonLoader from "./Components/PhoneInfoSkeletonLoader/PhoneInfoSkeletonLoader";
import ErrorComponent from "../../Components/ErrorComponent/ErrorComponent";

function PhoneInfo() {
  const {phoneId} = useParams()

  type fetchingStateType = "loading" | "error" | "completed"
  type phoneInfoType = {
    _id: number,
    phoneName: string,
    phoneChipset: string,
    phoneCoverImage: string,
    phoneDisplay: string[],
    phoneMemory: number[],
    moreInfo: {
      generalCompatibility: number,
      gpu: string,
      averageRating: string[],
      geekBench: number,
      anTutu: number,
      threeDMark: number,
    }
  }
  

  const [fetchingState, setFetchingState] = useState<fetchingStateType>("loading")
  const [phoneData, setPhoneData] = useState<phoneInfoType |null>(null)



  async function getPhoneData(id : string | undefined){
    try{
      setFetchingState("loading")
      const rawFetch = await fetch(`http://localhost:3000/api/phone/${id}`)
      const responseInJson = await rawFetch.json()

      if(!rawFetch.ok){
        throw new Error("Fetching Error" , {cause : responseInJson})
      }
      setPhoneData(responseInJson)
      setFetchingState("error")
    }
    catch(err){
      console.log("An error occurred", err)
      setFetchingState("error")
    }
  } 

  

  useEffect(()=>{
    getPhoneData(phoneId)
  }, [])

  return (
    
    <main className="phone-info-main">
      {
        fetchingState == "loading" ?
           <PhoneInfoSkeletonLoader />
           :
        fetchingState == "error" ?
        <div className="phone-info-inner error">

          <ErrorComponent
          errorHeading="An Error Occurred"
          refreshFunction={getPhoneData}
          id={phoneId}
          errorMessage="Oops! We couldn’t get the information about that game. Please check your connection and try again. If you feel it isn't caused by your internet connection, click the retry button"
          />

        </div>
        :
        <div className="phone-info-inner">
        <img src={phoneData?.phoneCoverImage} alt="phone info" className="phone-image" />

        <div className="phone-info-text">
          <h2>{phoneData?.phoneName}</h2>

          <div className="other-phone-info">
            <div className="single-phone-info">
              <h3>General Compatibility</h3>
              <p>{phoneData?.moreInfo.generalCompatibility}%</p>
            </div>

            <div className="single-phone-info">
              <h3>Storage</h3>
              <p>
                {phoneData?.phoneMemory[0]}GB <small>RAM</small> - {phoneData?.phoneMemory[1]}GB <small>ROM</small>
              </p>
            </div>

            <div className="single-phone-info">
              <h3>CPU</h3>
              <p>{phoneData?.phoneChipset}</p>
            </div>

            <div className="single-phone-info">
              <h3>Average Rating</h3>
              <p>
                {phoneData?.moreInfo.averageRating[0]}<small>({phoneData?.moreInfo.averageRating[1]})</small>
              </p>
            </div>

            <div className="single-phone-info">
              <h3>GPU</h3>
              <p>{phoneData?.moreInfo.gpu}</p>
            </div>

            <div className="single-phone-info">
              <h3>Display</h3>
              <p>
                {phoneData?.phoneDisplay[0]}<small>p</small> - {phoneData?.phoneDisplay[1]}<small>Hz</small>
              </p>
            </div>

            <div className="single-phone-info">
              <h3>Geekbench</h3>
              <p>{phoneData?.moreInfo.geekBench ||"NA"}</p>
            </div>

            <div className="single-phone-info">
              <h3>AnTuTu</h3>
              <p>{phoneData?.moreInfo.anTutu ||"NA"}</p>
            </div>

            <div className="single-phone-info">
              <h3>3D Mark</h3>
              <p>{phoneData?.moreInfo.threeDMark ||"NA"}</p>
            </div>
          </div>
        </div>
        </div>
      }

      {fetchingState !== "error" &&
        <CompatibleGamesSection
      phoneId={phoneId}
      />}
    </main>
  );
}

export default PhoneInfo;
