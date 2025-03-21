import searchIcon from "./assets/icons/search-icon.svg"
import cameraIcon from "./assets/icons/camera-icon.svg"
import logo from "./assets/icons/logo.svg"
import backIcon from "./assets/icons/back-icon.svg"
import toast, { Toaster } from 'react-hot-toast';
import { Outlet, useLocation, useNavigate, useSearchParams } from "react-router"
import "./Header.css"
import {useAtom} from "jotai"
import { allPopularGamesAtom, allPopularPhonesAtom, filteredGamesAtom, filteredPhonesAtom, itemsToViewAtom, searchAtom, searchingState } from "../../globals/states"
import { useEffect, useState } from "react"

function Header() {
  const [searchQuery, setSearchQuery] = useAtom(searchAtom)
  const [allPopularPhones, setAllPopularPhones] = useAtom(allPopularPhonesAtom)
  const [allPopularGames, setAllPopularGames] = useAtom(allPopularGamesAtom)
  const [filteredPhones, setFilteredPhones] = useAtom(filteredPhonesAtom)
  const [filteredGames, setFilteredGames] = useAtom(filteredGamesAtom)
  const [isSearching, setIsSearching] = useAtom(searchingState)
  const [searchParams, setSearchParams] = useSearchParams();
  const initialView = searchParams.get("page") || "Phones"
  const [itemsToView, setItemsToView] = useState(initialView)
  const location = useLocation();
  const navigate = useNavigate()
  const notify = () => toast('This feature is coming Soon.');

  useEffect(() => {
    if (location.pathname === '/') {
      setSearchParams({ page: itemsToView });
    }
    setIsSearching(false)
    setSearchQuery("")
  }, [itemsToView, location.pathname, setSearchParams]);

  type popularPhoneInfo = {
    _id: string;
    phoneName: string;
    phoneChipset: string;
    phoneCoverImage: string;
    phoneDisplay: string[];
    phoneMemory: number[];
  }
  type gameData = {
    _id : string;
    gameName: string;
    gameCategory: string;
    gameSize: number;
    gamePlatform: string;
    gameCoverImage: string;
}

  function searchPhoneList(searchText : string, arrayToSearch : popularPhoneInfo[], arrayToUpdateSetterFunction : Function){
    if(searchText.trim() == ""){
      setIsSearching(false)
    }else{
      setIsSearching(true)
      const newArray = arrayToSearch.filter((item)=> item.phoneName.toLowerCase().includes(searchText.toLowerCase()))
  
      arrayToUpdateSetterFunction(newArray)
    }


  }

  function searchGameList(searchText : string, arrayToSearch : gameData[], arrayToUpdateSetterFunction : Function){
    if(searchText.trim() == ""){
      setIsSearching(false)
    }else{
      setIsSearching(true)
      const newArray = arrayToSearch.filter((item)=> item.gameName.toLowerCase().includes(searchText.toLowerCase()))
  
      arrayToUpdateSetterFunction(newArray)
    }
  }

  function goBack(){
    navigate(-1)
  }

  return (
    <>
    <header className={location.pathname === "/" ? "" : "n"}>
    <div className="homepage-inner-top">
        {
          location.pathname === "/"?
          <>
         <img src={logo} alt="mobile benchmarks logo" />
         <h1>Discover Games That Run Perfectly on Your Phone</h1>
         </> 
         :
         <button
         onClick={goBack}
         className="back">
          <img src={backIcon} alt="go back" />
         </button>
        }
    </div>
        {
          location.pathname == "/" && (
            <form>
            <div className="homepage-inner-top">
                <div className="form-left">
                <img src={searchIcon} alt="search-icon" />
        
                <input 
                onChange={(e)=>{
                  setSearchQuery(e.target.value)
                  itemsToView == "Phones" ? 
                  searchPhoneList(
                    e.target.value, 
                  allPopularPhones, 
                  setFilteredPhones
                ) 
                  : 
                  searchGameList(
                    e.target.value, 
                    allPopularGames,
                    setFilteredGames
                  )
                }}
                value={searchQuery}
                type="text" 
                placeholder={`Search for ${itemsToView}`} />
                </div>
        
                <div className="form-right">
                <select 
                onChange={(e)=>{
                  setItemsToView(e.target.value)
                }}
                name="page" id="page">
                    <option 
                    selected={itemsToView == "Phones"}
                    value="Phones">Phones</option>
        
                    <option 
                    selected={itemsToView == "Games"}
                    value="Games">Games</option>
                </select>
        
                <button
                onClick={notify}
                type="button">
                <img src={cameraIcon} alt="camera-icon" />
                </button>
                </div>
        
                </div>
            </form>
          )
        }
    </header>
    
    <Outlet />
    </>
  )
}

export default Header