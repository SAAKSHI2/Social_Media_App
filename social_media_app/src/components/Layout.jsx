import { Outlet } from "react-router-dom"
import Navbar from "./Navbar";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";
import "../css/layout.css"

const Layout = ()=>{
    return(
        <div className="layout">
            <Navbar/>
            <div className="content">
                <LeftBar/>
                <Outlet/>
                <RightBar/>
            </div>

        </div>
    )
     
}
export default Layout;