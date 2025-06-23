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
      <Route path="/phone/:phoneId" element={<PhoneInfo />} />
      <Route path="/game/:gameId" element={<GameInfo />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
      <Route path="/contribute/game" element={<ContributeGame />} />
          </Route>
      <Route path="/leaderboard" element={<Leaderboard />} />

        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin/review/game" element={<AdminGameReview />} />
        </Route>
      <Route path="*" element={<NotFound />} />
      
      </Route>
    </Routes>
  )
}

export default App