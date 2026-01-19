import { LuBuilding } from "react-icons/lu"
import { FaDotCircle } from "react-icons/fa"
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { RiSubtractLine } from "react-icons/ri";


export default function PropertyCard({ name, address, totalUnits, occupiedUnits, monthlyRevenue, tenants }) {
    return (<>
        <div className="border-primary capitalize  bg-white rounded-xl m-4 md:m-8 p-4 md:p-8 border-2 h-fit flex flex-col gap-2 ">
            {/* property Detail */}
            <div className="">
                <div className="flex items-center gap-2">
                    <LuBuilding className="text-primary" />
                    <div className='text-accent font-bold' >{name}</div>
                </div>
                <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-primary" />
                    <div className="text-secondary">{address}</div>
                </div>
                <div className="flex items-center gap-2">
                    <FaHouse className="text-primary" />
                    <div className="text-primary">{totalUnits} units</div>
                    <FaDotCircle className="text-[5px] text-warning" />
                    <div className="text-success">{occupiedUnits} occupied</div>
                </div>
            </div>
            <hr />
            {/* expected monthly revenue */}
            <div className="flex justify-between items-center ">
                <div className="font-bold">monthly Revenue</div>
                <span className="text-success font-bold">₹ {(monthlyRevenue).toLocaleString('en-IN')}</span>
            </div>
            <hr />

            {/* tenant list */}
            <div className="">
                <h1 className="font-bold mb-5">tenants :</h1>
                <ul className="ml-5 text-xs md:text-base ">
                    {tenants.map((element, idx) => (
                        <li key={idx} className=" border-2  mt-4 bg-primary/20 rounded-xl  px-2 py-1 flex flex-col md:flex-row gap-1 md:items-center">
                            <div>{element.name}</div>
                            <RiSubtractLine />
                            <div>Room No. {element.roomNo}</div>
                            <RiSubtractLine />
                            <div>Rent.{element.rent}</div>
                        </li>
                    ))}
                </ul>
            </div>




        </div>
    </>)
}