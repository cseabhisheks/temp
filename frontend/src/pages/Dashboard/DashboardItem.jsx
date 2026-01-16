// icons
import { dashboardData } from './dashboardData'
import DashboardCard from "./DashboardCard"
import { useEffect, useState } from "react";
import { aggregate, fetchAll, find } from "../../api/api";
export default function DashboardItem() {
    const [dashStats, setDashStats] = useState({ totalProperty: 0, totalRoom: 0, totalOccupiedRoom: 0, totalIncome: 0, totalAmountReceived: 0, totalPaymentCount: 0 })
    useEffect(() => {
        const getTotalCount = async () => {
            try {
                const totalProperty = await fetchAll('property')
                const totalRoom = await fetchAll('room')
                const totalOccupied = await find('room', { Status: 'occupied' })
                const totalIncome = await aggregate('room', [
                    { $match: { Status: 'occupied' } },
                    { $group: { _id: null, totalIncome: { $sum: "$RentAmount" } } }
                ])

                const currentMonth = new Date().getMonth() + 1; // 1-12
                const currentYear = new Date().getFullYear();

                const totalAmountReceived = await aggregate('payment', [
                    {
                        $addFields: {
                            month: { $month: "$createdAt" },  // extract month from UTC
                            year: { $year: "$createdAt" }     // extract year from UTC
                        }
                    },
                    {
                        $match: {
                            month: currentMonth,
                            year: currentYear
                        }
                    },

                    {
                        $group: {
                            _id: null,
                            totalAmountReceived: { $sum: "$amount" },
                            totalPaymentCount: { $sum: 1 }
                        }
                    }
                ]);

                setDashStats({
                    totalProperty: totalProperty.data?.length || 0,
                    totalRoom: totalRoom.data?.length || 0,
                    totalOccupiedRoom: totalOccupied.data?.length || 0,
                    totalIncome: totalIncome.data?.[0]?.totalIncome || 0,
                    totalAmountReceived:totalAmountReceived.data?.[0]?.totalAmountReceived || 0,
                    totalPaymentCount:totalAmountReceived.data?.[0]?.totalPaymentCount || 0,
                });


            } catch (err) {
                console.log(err)
            }
        }
        getTotalCount()
    }, [])


    return (<>

        <div className="bg-primary/30 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 min-h-[40vh] border-2 p-8 items-center">
            {dashboardData(dashStats.totalProperty, dashStats.totalRoom, dashStats.totalOccupiedRoom, dashStats.totalIncome, dashStats.totalAmountReceived, dashStats.totalPaymentCount).map((element, idx) => (
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