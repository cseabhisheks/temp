import { FaDotCircle } from "react-icons/fa"
export default function PendingBillCard({ name, date, billType, amount, ConsumedReading }) {
    return (<>
        <div className=" bg-white text-xs md:text-base capitalize flex items-center justify-between border-2 m-8 px-4 py-2 rounded-3xl">
            <div>
                <h1 className="font-bold">{name}</h1>
                <div className="flex items-center gap-2">
                    <span>{date ? new Date(date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                    }) : "Missing date"}</span>
                    <FaDotCircle className="text-[5px] text-warning" />
                    <span className="font-bols">{billType}</span>
                    {billType == 'electricity' &&
                        <>
                            <FaDotCircle className="text-[5px] text-warning" />
                            <span className="font-bols">{ ConsumedReading} unit</span>
                        </>
                    }
                </div>
            </div>
            <div className="flex flex-col items-end md:flex-row gap-2 md:gap-4 ">
                <h1 className="text-success font-bold"> ₹ {amount ? amount.toLocaleString('en-IN') : 'missing amount'}</h1>
                <span className="text-warning">pending</span>
            </div>
        </div>
    </>)
}