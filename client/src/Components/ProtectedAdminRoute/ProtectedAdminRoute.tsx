import { useAtom, useAtomValue } from "jotai";
import { Navigate, Outlet, useNavigate } from "react-router";
import { isAdminAtom, userInfoAtom } from "../../globals/states";

const ProtectedAdminRoute = () => {
    const userInfo = useAtomValue(userInfoAtom)
    const navigate = useNavigate()
    const [isAdmin, setIsAdmin] = useAtom(isAdminAtom)

    if(userInfo.error){
        navigate("/signup")
        return null
      }

      if(userInfo.username == "New Laptop"){
        setIsAdmin(true)
      }
  
      if(userInfo.loading){
        return <div className="loading-container">
          <div className="loading">Loading...</div>
        </div>
      }

    return <Outlet />
  };
  export default ProtectedAdminRoute;