import {Route, Routes} from "react-router"
import "./App.css"
import Homepage from "./Pages/Homepage/Homepage"
import Header from "./Components/Header/Header"
import PhoneInfo from "./Pages/PhoneInfo/PhoneInfo"
import GameInfo from "./Pages/GameInfo/GameInfo"
import UnderConstruction from "./Pages/UnderConstruction/UnderConstruction"

function App(){
  return (
    <Routes>
      <Route element={<UnderConstruction />} path="*"/>
      {/* <Route element={<Header />}>
      <Route path="/" element={<Homepage />} />
      <Route path="/phone/:phoneId" element={<PhoneInfo />} />
      <Route path="/game/:gameId" element={<GameInfo />} /> */}
      {/* </Route> */}
    </Routes>
  )
}

export default App