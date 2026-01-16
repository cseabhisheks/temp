import Navbar from "../../component/Navbar/Navbar"
import PendingBillItem from "../../component/pendingBill/PendingBillItem"
import DashboardItem from "./DashboardItem"

export default function Dashboard() {

    const x = 2344
    return (<>
        <Navbar />
        <DashboardItem />
        <PendingBillItem />
    </>)
}