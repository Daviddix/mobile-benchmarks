import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Navigate, Outlet, useNavigate } from "react-router";
import { isAdminAtom, userInfoAtom } from "../../globals/states";

const ProtectedAdminRoute = () => {
    const userInfo = useAtomValue(userInfoAtom)
    const navigate = useNavigate()
    const setIsAdmin = useSetAtom(isAdminAtom)

    if(userInfo.error){
        navigate("/signup")
        return null
      }
      
      if(userInfo.loading){
        return <div className="loading-container">
          <div className="loading">Loading...</div>
        </div>
      }

      if(userInfo.username == "Emmanuel Nsikan-david" || userInfo.email == "emmanuelnsikandavid@gmail.com" || userInfo.email == "en56434@gmail.com"){
        setIsAdmin(true)
      }else{
        setIsAdmin(false)
        navigate("/")
        return null
      }
  

    return <Outlet />
  };
  export default ProtectedAdminRoute;