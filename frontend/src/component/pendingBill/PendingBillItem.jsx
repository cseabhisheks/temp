import PendingBillCard from "./PendingBillCard"
import billData from "./pendingBillData"
export default function PendingBillItem() {
    //fetch here bill of electricity and room rent then overwrite billData which is rendered here 
    return (<>
        <div className="border-2 bg-primary ">
            <div className=" px-8 pt-8 capitalize">
                <h1 className="text-lg md:text-xl text-accent ">pending bills</h1>
                <span className="text-xs md:text-base text-gray-400">The following list includes all tenants whose payments remain outstanding for the current billing cycle.</span>
            </div>
            {billData.map((element, idx) => (
                <span key={idx}>
                    <PendingBillCard name={element.tenantName}
                        date={element.date}
                        billType={element.billType}
                        amount={element.amount}
                    />
                </span>
            ))}
        </div>
    </>)


}