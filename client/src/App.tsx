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

function App(){
  return (
    <Routes>
      <Route element={<Header />}>
      <Route path="/" element={<Homepage />} />
      <Route path="/phone/:phoneId" element={<PhoneInfo />} />
      <Route path="/game/:gameId" element={<GameInfo />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/game/contribute" element={<ContributeGame />} />
      <Route path="*" element={<NotFound />} />
      
      </Route>
    </Routes>
  )
}

export default App