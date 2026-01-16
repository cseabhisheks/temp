import {
    LuBuilding2,
    LuUsers,
    LuDollarSign,
    LuTrendingUp,
} from "react-icons/lu";

export const dashboardData = (totalProperty,totalRoom,totalOccupiedRoom,totalIncome,totalAmountReceived,totalPaymentCount) => {
   return [
        {
            title: "Total Properties",
            value: totalProperty === 0 ? '.....' : totalProperty,
            description: `${totalRoom === 0 ? '.....' : totalRoom} total units`,
            Icon: LuBuilding2,
        },
        {
            title: "Occupancy Rate",
            value: `${totalOccupiedRoom / totalRoom * 100} %`,
            description: `${totalOccupiedRoom === 0 ? '.....' : totalOccupiedRoom} of  ${totalRoom === 0 ? '.....' : totalRoom} units occupied`,
            Icon: LuUsers,
        },
        {
            title: "Monthly Revenue",
            value: `₹ ${totalIncome=== 0 ? '.....' :totalIncome.toLocaleString('en-IN')}`,
            description: "Expected per month",
            Icon: LuDollarSign,
        },
        {
            title: `Collected This Month ( ${new Date().toLocaleDateString('en-IN',{month:'long'})} )`,
            value: `₹ ${totalAmountReceived=== 0 ? '.....' :totalAmountReceived.toLocaleString('en-IN')}`,
            description: `${totalPaymentCount} payments received`,
            Icon: LuTrendingUp,
        },
    ];

}   
