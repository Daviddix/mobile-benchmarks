import { Route, Routes } from "react-router"
import "./App.css"
import Homepage from "./Pages/Homepage/Homepage"

function App(){
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
    </Routes>
  )
}

export default App