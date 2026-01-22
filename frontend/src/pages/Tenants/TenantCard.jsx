import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
export default function TenantCard({ config, data }) {
    const { PropertyName, RoomNo, TName, TPhone,effectiveDate,RoomRent } = config
    return (<>
        <div className="border-2 p-4 md:p-8 rounded-xl">
            <div>{TName}</div>
            <hr />
            <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-xs" /> <span>{TPhone}</span>
            </div>
            <div>{PropertyName}</div>
            <div>{RoomNo}</div>
            <hr />
            <div className="flex items-center gap-4">
                <IoLocationOutline />
                <span>MonthlyRent</span>
                <span>{RoomRent}</span>
            </div>

            <div className="flex items-center gap-4">
                <CiCalendarDate />
                <span>{new Date(effectiveDate).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'2-digit'})}</span>
            </div>

        </div>

    </>)
}