import { useParams } from "react-router";
import "./PhoneInfo.css";
import { useEffect, useState } from "react";
import CompatibleGamesSection from "./Components/CompatibleGamesSection/CompatibleGamesSection";
import PhoneInfoSkeletonLoader from "./Components/PhoneInfoSkeletonLoader/PhoneInfoSkeletonLoader";
import ErrorComponent from "../../Components/ErrorComponent/ErrorComponent";
import menuIcon from "./assets/icons/menu-icon.svg"
import reportIcon from "./assets/icons/report-icon.svg"
import ReportModal from "../../Components/ReportModal/ReportModal";
import { useLoggedInChecker } from "../../hooks/useLoggedInChecker";
import { useSetAtom } from "jotai";
import { showUserOnlyModalAtom } from "../../globals/states";

function PhoneInfo() {
  const {phoneId} = useParams()

  type fetchingStateType = "loading" | "error" | "completed"
  

  const [fetchingState, setFetchingState] = useState<fetchingStateType>("loading")
  const [phoneData, setPhoneData] = useState<phoneData |null>(null)
  const [showReportModal, setShowReportModal] = useState(false)
  const [showReportButton, setShowReportButton] = useState(false)
  const isLoggedIn = useLoggedInChecker()
  const setShowUserOnlyModal = useSetAtom(showUserOnlyModalAtom)

    function closeReportModal(){
    setShowReportModal(false)
    }

  async function getPhoneData(id : string | undefined){
    try{
      setFetchingState("loading")
      const rawFetch = await fetch(`http://localhost:3000/api/phone/info/${id}`)
      const responseInJson = await rawFetch.json()

      if(!rawFetch.ok){
        throw new Error("Fetching Error" , {cause : responseInJson})
      }
      setPhoneData(responseInJson)
      setFetchingState("completed")
    }
    catch(err){
      console.log("An error occurred", err)
      setFetchingState("error")
    }
  } 

  

  useEffect(()=>{
    getPhoneData(phoneId)
    window.scrollTo({
      top:0,
      left : 0
    })
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
          <div className="heading-and-button">

          <h2>{phoneData?.phoneName}</h2>
          <button 
          onClick={()=>{
            setShowReportButton((prev)=> !prev)
          }}
          className="report-inaccurate-info-button">
          <img
          src={menuIcon} alt="report inaccurate info icon" />
          </button>

          {showReportButton && <button 
           onClick={()=>{
            if(isLoggedIn){
              setShowReportModal(true)
              setShowReportButton(false)
            }else{
              setShowUserOnlyModal(true)
              setShowReportButton(false)
            }
          }}
          className="report">
            <img src={reportIcon} alt="report icon" />
            Report inaccurate information</button>}
          </div>

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

      {showReportModal && <ReportModal
      closeFn={closeReportModal}
      reportTypeName={phoneData?.phoneName || ""}
      reportType="Phones"
      reportTypeId={phoneId || "1234"}
      />}
    </main>
  );
}

export default PhoneInfo;
