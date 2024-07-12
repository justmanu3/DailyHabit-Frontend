import {Outlet, Navigate} from "react-router-dom"
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from "../Config/firebase.config"

const PrivateRoutes = () => {
    const [user,error] = useAuthState(auth)

    if(error){
        console.error("Error while checking authentication", error)
        return  <div className="h-screen w-screen flex items-center justify-center"> Loading...</div>
    }
  return (
user ? <Outlet/> : <Navigate to="/login"/> )
}

export default PrivateRoutes