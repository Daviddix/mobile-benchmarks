import {Route, Routes} from "react-router"
import "./App.css"
import Homepage from "./Pages/Homepage/Homepage"
import Header from "./Components/Header/Header"
import PhoneInfo from "./Pages/PhoneInfo/PhoneInfo"

function App(){
  return (
    <Routes>
      <Route element={<Header />}>
      <Route path="/" element={<Homepage />} />
      <Route path="/phone/:phoneName" element={<PhoneInfo />} />
      </Route>
    </Routes>
  )
}

export default App