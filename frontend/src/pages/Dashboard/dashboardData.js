import {
    LuBuilding2,
    LuUsers,
    LuDollarSign,
    LuTrendingUp,
} from "react-icons/lu";

export const dashboardData = (totalProperty, totalRoom, totalOccupiedRoom, totalIncome, totalAmountReceived, totalPaymentCount) => {
    return [
        {
            title: "Total Properties",
            value: totalProperty,
            description: `${ totalRoom} total units`,
            Icon: LuBuilding2,
        },
        {
            title: "Occupancy Rate",
            value: `${(totalOccupiedRoom / totalRoom * 100).toFixed(2) +'%'} `,
            description: `${ totalOccupiedRoom} of  ${ totalRoom} units occupied`,
            Icon: LuUsers,
        },
        {
            title: "Monthly Revenue",
            value: `₹ ${totalIncome.toLocaleString('en-IN')}`,
            description: "Expected per month",
            Icon: LuDollarSign,
        },
        {
            title: `Collected This Month ( ${new Date().toLocaleDateString('en-IN', { month: 'long' })} )`,
            value: `₹ ${ totalAmountReceived.toLocaleString('en-IN')}`,
            description: `${totalPaymentCount} payments received`,
            Icon: LuTrendingUp,
        },
    ];

}   
