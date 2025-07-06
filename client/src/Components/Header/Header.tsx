import searchIcon from "./assets/icons/search-icon.svg";
import cameraIcon from "./assets/icons/camera-icon.svg";
import logo from "../../../public/logo.svg";
import backIcon from "./assets/icons/back-icon.svg";
import toast, { Toaster } from "react-hot-toast";
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router";
import "./Header.css";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  allPopularGamesAtom,
  allPopularPhonesAtom,
  filteredGamesAtom,
  filteredPhonesAtom,
  searchAtom,
  searchingState,
} from "../../globals/states";
import { useEffect, useState } from "react";
import Nav from "./Components/Nav/Nav";

function Header() {
  const [searchQuery, setSearchQuery] = useAtom(searchAtom);
  const allPopularPhones = useAtomValue(allPopularPhonesAtom);
  const allPopularGames = useAtomValue(allPopularGamesAtom);
  const setFilteredPhones = useSetAtom(filteredPhonesAtom);
  const setFilteredGames = useSetAtom(filteredGamesAtom);
  const setIsSearching = useSetAtom(searchingState);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialView = searchParams.get("page") || "Phones";
  const [itemsToView, setItemsToView] = useState(initialView);
  const location = useLocation();
  const navigate = useNavigate();
  const notify = () => toast("This feature is coming Soon.");

  useEffect(() => {
    if (location.pathname === "/") {
      setSearchParams({ page: itemsToView });
    }
    setIsSearching(false);
    setSearchQuery("");
  }, [itemsToView, location.pathname, setSearchParams]);

  function searchPhoneList(
    searchText: string,
    arrayToSearch: phoneData[],
    arrayToUpdateSetterFunction: Function
  ) {
    if (searchText.trim() == "") {
      setIsSearching(false);
    } else {
      setIsSearching(true);
      const newArray = arrayToSearch.filter((item) =>
        item.phoneName.toLowerCase().includes(searchText.toLowerCase())
      );

      arrayToUpdateSetterFunction(newArray);
    }
  }

  function searchGameList(
    searchText: string,
    arrayToSearch: gameData[],
    arrayToUpdateSetterFunction: Function
  ) {
    if (searchText.trim() == "") {
      setIsSearching(false);
    } else {
      setIsSearching(true);
      const newArray = arrayToSearch.filter((item) =>
        item.gameName.toLowerCase().includes(searchText.toLowerCase())
      );

      arrayToUpdateSetterFunction(newArray);
    }
  }

  function goBack() {
    navigate(-1);
  }

  return (
    <>
    <Toaster
      toastOptions={
        {
          style : {
            "fontSize" : "1.2rem",
            "backgroundColor" : "var(--l1-elevation)",
            "color" : "var(--text-color)",
            "border" : "1px solid var(--l3-elevation)"
          }
        }
      }
                position="bottom-right"
                 />
      <header className={location.pathname === "/" ? "" : "n"}>
        <div className="homepage-inner-top">
          {location.pathname === "/" ? (
            <>
              <div className="logo-and-nav">
                <img src={logo} alt="mobile benchmarks logo" />

                <Nav />
              </div>

              <h1>Discover Games That Run Perfectly on Your Phone</h1>
            </>
          ) : (
            <div className="button-nav">
              <button onClick={goBack} className="back">
                <img src={backIcon} alt="go back" />
              </button>

              <Nav />
            </div>
          )}
        </div>
        {location.pathname == "/" && (
          <form>
            <div className="homepage-inner-top">
              <div className="form-left">
                <img src={searchIcon} alt="search-icon" />

                <input
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    itemsToView == "Phones"
                      ? searchPhoneList(
                          e.target.value,
                          allPopularPhones,
                          setFilteredPhones
                        )
                      : searchGameList(
                          e.target.value,
                          allPopularGames,
                          setFilteredGames
                        );
                  }}
                  value={searchQuery}
                  type="text"
                  placeholder={`Search for ${itemsToView}`}
                />
              </div>

              <div className="form-right">
                <select
                  onChange={(e) => {
                    setItemsToView(e.target.value);
                  }}
                  name="page"
                  id="page"
                >
                  <option selected={itemsToView == "Phones"} value="Phones">
                    Phones
                  </option>

                  <option selected={itemsToView == "Games"} value="Games">
                    Games
                  </option>
                </select>

                <button onClick={notify} type="button">
                  <img src={cameraIcon} alt="camera-icon" />
                </button>
              </div>
            </div>
          </form>
        )}
      </header>

      <Outlet />
    </>
  );
}

export default Header;
