import "./Nav.css";
import { NavLink } from "react-router";
import menuIcon from "./assets/icons/menu-icon.svg"
import closeIcon from "./assets/icons/close-icon.svg"
import HomeIcon from "../../assets/icons/HomeIcon";
import LeaderBoardIcon from "../../assets/icons/LeaderBoardIcon";
import ContributeIcon from "../../assets/icons/ContributeIcon";
import { useState } from "react";
import { useAtom } from "jotai";
import { userInfoAtom } from "../../../../globals/states";

function Nav() {
  type navState = "open" | "close"
  const [navState, setNavState] = useState<navState>("close")
  const [userInfo, setUserInfo] = useAtom(userInfoAtom)

  return (
    <>
    
    <nav className={navState == "open" ? "open" : ""}>

      <button
      onClick={()=>{
        setNavState("close")
      }}
      className = "close-btn">
        <img src={closeIcon} alt="close menu" />
      </button>

        <ul>
          <li onClick={()=>{
            setNavState("close")
          }}>
      <NavLink to="/">
        {({ isActive }) => (
          <>
            <HomeIcon isActive={isActive} />
            Home
          </>
        )}
      </NavLink>
          </li>

        <li onClick={()=>{
          setNavState("close")
        }}>
      <NavLink to="/leaderboard">
        {({ isActive }) => (
          <>
            <LeaderBoardIcon isActive={isActive} />
            Leaderboard
          </>
        )}
      </NavLink>
        </li>


        <li onClick={()=>{
          setNavState("close")
        }}>
      <NavLink to={"/contribute/game"}>
        {({ isActive }) => (
          <>
            <ContributeIcon isActive={isActive} />
            Contribute
          </>
        )}
      </NavLink>
        </li>

        <li>
          {
            (userInfo._id !== null && userInfo.username !== null) && (
        <div className="profile-icon">
          <p>{userInfo.username[0]}</p>
        </div>
            )
          }
        </li>

        </ul> 
    </nav>

    <button 
    onClick={()=>{
      setNavState("open")
    }}
    className="menu-btn">
      <img src={menuIcon} alt="menu" />
    </button>

    </>
  );
}

export default Nav;
