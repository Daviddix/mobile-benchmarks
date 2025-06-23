import { useAtomValue } from "jotai";
import { Navigate, Outlet, useNavigate } from "react-router";
import { userInfoAtom } from "../../globals/states";

const ProtectedAdminRoute = () => {
    const userInfo = useAtomValue(userInfoAtom)
    const navigate = useNavigate()

    if(userInfo.error){
        navigate("/signup")
        return null
      }
  
      if(userInfo.loading){
        return <div className="loading-container">
          <div className="loading">Loading...</div>
        </div>
      }

    return <Outlet />
  };
  export default ProtectedAdminRoute;