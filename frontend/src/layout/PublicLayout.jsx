import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar/Navbar";
export default function PublicLayout() {
    return (<>
        <Navbar />
        <div className=" h-[calc(100vh-60px)]">
            <Outlet />
        </div>
    </>)
}