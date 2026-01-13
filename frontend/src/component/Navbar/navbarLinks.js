import { FaBuilding } from "react-icons/fa";
import { MdBedroomParent } from "react-icons/md";
import { FaPerson } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";

 const navbarLinksData = [
        {
            name: "Dashboard",
            link: "/dashboard",
            Icon: MdDashboard,
        },
        {
            name: "Homes",
            link: "/homes",
            Icon: FaBuilding,
        },
        {
            name: "Rooms",
            link: "/rooms",
            Icon: MdBedroomParent,
        },
        {
            name: "Tenants",
            link: "/tenants",
            Icon: FaPerson,
        },
    ];
    export default navbarLinksData