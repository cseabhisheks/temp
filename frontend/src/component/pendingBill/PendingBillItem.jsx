import PendingBillCard from "./PendingBillCard"

import { useState, useEffect } from "react"
import { aggregate } from "../../api/api"

export default function PendingBillItem() {
    //fetch here bill of electricity and room rent then overwrite billData which is rendered here 
    const rentPipeline = [
        { $match: { Paid: false } },
        {
            $lookup: {
                from: 'tenants',
                localField: 'Tenant',
                foreignField: '_id',
                as: 'tenantss'
            }
        },
        { $unwind: '$tenantss' },//make array into object
        {
            $project: {
                name: '$tenantss.TName', date: "$createdAt", billType: { $literal: 'Rent' }, amount: '$RentAmount'
            }
        }
    ]
    const electricityPipeline = [
        { $match: { Paid: false } },
        {
            $lookup: {
                from: 'tenants',
                localField: 'Tenant',
                foreignField: '_id',
                as: 'tenantss'
            }
        },
        { $unwind: '$tenantss' },//make array into object
        {
            $project: {
                name: '$tenantss.TName', date: "$createdAt", billType: { $literal: 'electricity' }, amount: '$EBAmount', ConsumedReading: { $subtract: ['$currentReading', '$previousReading'] }
            }
        }
    ]


    const [bill, setBill] = useState({ rentBillData: [] })
    useEffect(() => {
        const fetchBills = async () => {
            const rentBill = await aggregate('rentBill', rentPipeline)
            const EBBill = await aggregate('electricityBill', electricityPipeline)
            const combinedBills = [
                ...(rentBill.data || []),
                ...(EBBill.data || [])
            ];

            setBill({ rentBillData: combinedBills });
        }
        fetchBills()
    }, [])
    console.log(bill.rentBillData)


    return (<>
        <div className="border-2 bg-black/80 ">
            <div className=" px-8 pt-8 capitalize">
                <h1 className="text-lg md:text-xl text-accent ">pending bills</h1>

                <span className="text-xs md:text-base text-gray-400">The following list includes all tenants whose payments remain outstanding for the current billing cycle.</span>
            </div>
            <div className="border-2 h-[35vh] bg-accent/80 overflow-y-auto m-4 rounded-xl ">
                {bill.rentBillData.length!=0 ?
                    (
                        bill.rentBillData.map((element, idx) => (
                            <span key={idx}>
                                <PendingBillCard name={element.name}
                                    date={element.date}
                                    billType={element.billType}
                                    amount={element.amount}
                                    ConsumedReading={element.ConsumedReading}
                                />
                            </span>
                        ))
                    )
                    :
                    <div className=" capitalize font-bold flex items-center justify-center h-full">
                        no pending bill
                    </div>
                }
            </div>
        </div>
    </>)


}