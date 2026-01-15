// icons
import {
    LuBuilding2,
    LuUsers,
    LuDollarSign,
    LuTrendingUp,
} from "react-icons/lu";
import DashboardCard from "./DashboardCard"
import { useEffect, useState } from "react";
import { fetchAll,find } from "../../api/api";
export default function DashboardItem() {
    const [dashStats, setDashStats] = useState({totalProperty:0,totalRoom:0,totalOccupiedRoom:0})
    useEffect(() => {
        const getTotalCount = async () => {
            try {
                const totalProperty = await fetchAll('property')
                const totalRoom=await fetchAll('room')
                 const totalOccupied=await find('room',{Status:'occupied'})
                setDashStats({totalProperty:totalProperty.data.length,totalRoom:totalRoom.data.length,totalOccupiedRoom:totalOccupied.data.length})
                
            } catch (err) {
                console.log(err)
            }
        }
        getTotalCount()
    }, [])

    const dashboardData = [
        {
            title: "Total Properties",
            value: dashStats.totalProperty===0?'.....':dashStats.totalProperty,
            description: `${dashStats.totalRoom===0?'.....':dashStats.totalRoom} total units`,
            Icon: LuBuilding2,
        },
        {
            title: "Occupancy Rate",
            value: `${dashStats.totalOccupiedRoom / dashStats.totalRoom *100} %`,
            description: `${dashStats.totalOccupiedRoom===0?'.....':dashStats.totalOccupiedRoom} of  ${dashStats.totalRoom===0?'.....':dashStats.totalRoom} units occupied`,
            Icon: LuUsers,
        },
        {
            title: "Monthly Revenue",
            value: "$60,000 (need to be corrected)",
            description: "Expected per month",
            Icon: LuDollarSign,
        },
        {
            title: "Collected This Month",
            value: "$3,100  (need to be corrected)",
            description: "2 payments received",
            Icon: LuTrendingUp,
        },
    ];

    return (<>

        <div className="bg-primary/30 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 min-h-[40vh] border-2 p-8 items-center">
            {dashboardData.map((element, idx) => (
                <span key={idx}>
                    <DashboardCard title={element.title}
                        Icon={element.Icon}
                        description={element.description}
                        value={element.value} />
                </span>
            ))}
        </div>

    </>)
}