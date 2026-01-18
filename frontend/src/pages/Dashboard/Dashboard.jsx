import Navbar from "../../component/Navbar/Navbar"
import PendingBillItem from "../../component/pendingBill/PendingBillItem"
import DashboardItem from "./DashboardItem"

export default function Dashboard() {
    return (<>
        <DashboardItem />
        <PendingBillItem />
    </>)
}