import searchIcon from "./assets/icons/search-icon.svg"
import cameraIcon from "./assets/icons/camera-icon.svg"
import logo from "./assets/icons/logo.svg"
import { Outlet, useSearchParams } from "react-router"
import "./Header.css"
import {useAtom} from "jotai"
import { allPopularPhonesAtom, filteredPhonesAtom, itemsToViewAtom, searchAtom, searchingState } from "../../globals/states"
import { useEffect, useState } from "react"

function Header() {
  const [searchQuery, setSearchQuery] = useAtom(searchAtom)
  const [allPopularPhones, setAllPopularPhones] = useAtom(allPopularPhonesAtom)
  const [filteredPhones, setFilteredPhones] = useAtom(filteredPhonesAtom)
  const [isSearching, setIsSearching] = useAtom(searchingState)
  const [searchParams, setSearchParams] = useSearchParams();
  const initialView = searchParams.get("page") || "Phones"
  const [itemsToView, setItemsToView] = useState(initialView)

  useEffect(() => {
    setSearchParams({ page: itemsToView });
  }, [itemsToView, setSearchParams]);

  type popularPhoneInfo = {
    _id: string;
    phoneName: string;
    phoneChipset: string;
    phoneCoverImage: string;
    phoneDisplay: string[];
    phoneMemory: number[];
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

  return (
    <>
    <header>
    <div className="homepage-inner-top">
        <img src={logo} alt="mobile benchmarks logo" />
        <h1>Discover Games That Run Perfectly on Your Phone</h1>
    </div>

    <form>
    <div className="homepage-inner-top">
        <div className="form-left">
        <img src={searchIcon} alt="search-icon" />

        <input 
        onChange={(e)=>{
          setSearchQuery(e.target.value)
          searchPhoneList(e.target.value, allPopularPhones, setFilteredPhones)
        }}
        value={searchQuery}
        type="text" 
        placeholder="Search for games" />
        </div>

        <div className="form-right">
        <select 
        onChange={(e)=>{
          setItemsToView(e.target.value)
        }}
        name="page" id="page">
            <option 
            value="Phones">Phones</option>

            <option 
            value="Games">Games</option>
        </select>

        <button type="button">
        <img src={cameraIcon} alt="camera-icon" />
        </button>
        </div>

        </div>
    </form>
    </header>
    
    <Outlet />
    </>
  )
}

export default Header