import {Route, Routes} from "react-router"
import "./App.css"
import Homepage from "./Pages/Homepage/Homepage"
import Header from "./Components/Header/Header"
import PhoneInfo from "./Pages/PhoneInfo/PhoneInfo"
import GameInfo from "./Pages/GameInfo/GameInfo"
import Login from "./Pages/Login/Login"
import Signup from "./Pages/Signup/Signup"
import ContributeGame from "./Pages/ContributeGame/ContributeGame"
import NotFound from "./Pages/NotFound/NotFound"
import Leaderboard from "./Pages/Leaderboard/Leaderboard"
import { useEffect } from "react"
import { useAtom } from "jotai"
import { userInfoAtom } from "./globals/states"
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"
import AdminGameReview from "./Pages/Admin/AdminGameReview"
import ProtectedAdminRoute from "./Components/ProtectedAdminRoute/ProtectedAdminRoute"
import GameToReviewInfo from "./Pages/GameToReviewInfo/GameToReviewInfo"
import Reports from "./Pages/Reports/Reports"
import Requests from "./Pages/Requests/Requests"
import AddNewPhone from "./Pages/AddNewPhone/AddNewPhone"
import OTP from "./Pages/OTP/OTP"

function App(){
  const [userInfo, setUserInfo] = useAtom(userInfoAtom)

  async function getUserInfo(){
    try{
      const rawFetch = await fetch("http://localhost:3000/api/user/info", {
        credentials : "include"
      })
  
      const responseInJson = await rawFetch.json()
  
      if(!rawFetch.ok){
        throw new Error("Fetching error", {cause : responseInJson})
      }

      setUserInfo({
        loading : false,
        error : false,
        ...responseInJson
      })

    }
    catch(err){
      setUserInfo({
        _id : null,
        username : null,
        loading : false,
        error : true
      })

      console.log("user details error")
      console.log(err)
    }
  }

  useEffect(()=>{
    getUserInfo()
  }, [])

  return (
    <Routes>
      <Route element={<Header />}>
      <Route path="/" element={<Homepage />} />
      <Route path="/phone/info/:phoneId" element={<PhoneInfo />} />
      <Route path="/game/info/:gameId" element={<GameInfo />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/otp" element={<OTP />} />


      <Route element={<ProtectedRoute />}>
          <Route path="/contribute/game" element={<ContributeGame />} />
      </Route>

        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin/review/game" element={<AdminGameReview />} />
          <Route path="/admin/review/game/:gameId" element={<GameToReviewInfo />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/requests" element={<Requests />} />
          <Route path="/admin/phone/add" element={<AddNewPhone />} />
          {/* <Route path="/admin/game/add" element={<Reports />} /> */}
        </Route>

      <Route path="*" element={<NotFound />} />
      
      </Route>
    </Routes>
  )
}

export default App