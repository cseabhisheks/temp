import { LuBuilding } from "react-icons/lu"
import { FaDotCircle } from "react-icons/fa"
import { FaHouse } from "react-icons/fa6";

import Button from "../../component/Button/Button";
import DynamicForm from "../../component/Form/DynamicForm";
import { useState } from "react";
import { remove } from "../../api/api";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLock } from "react-icons/fa";
import { MdElectricBolt } from "react-icons/md";
import { IoIosPricetags } from "react-icons/io";
export default function PropertyCard({ PropertyConfig,fetchPropertyData }) {
    const { name, address, totalUnits, occupiedUnits, monthlyRevenue, tenants, _id, HPrice, EBRate } = PropertyConfig

    const handleRemove = async (_id) => {
        console.log('deleting....')
        const res = await remove('property', _id)
        console.log(res)
        fetchPropertyData()
    }
    const [formOpen, setFormOpen] = useState(false)

    const formFields = [
        { name: "HName", type: "text", icon: <FaUser /> },
        { name: "HAddress", type: "text", icon: <FaEnvelope /> },
        { name: "HPrice", type: "number", icon: <FaPhone /> },
        { name: "EBRate", type: "number", icon: <FaMapMarkerAlt /> },
    ];

    const formConfig = {
        title: 'update property',
        formFields: formFields,
        formOpen: formOpen,
        setFormOpen: setFormOpen,
        submitText: 'update',
        modelName: 'property',
        _id: _id,
        isUpdate: true,
        refreshData: fetchPropertyData
    }

    return (<>
        <DynamicForm formConfig={formConfig} />

        <div className="text-xs md:text-base relative border-primary capitalize  bg-white rounded-xl m-4 md:m-8 p-4 md:p-8 border-2 h-fit flex flex-col gap-2 ">
            {/* property Detail */}
            <span className="absolute right-4 flex gap-4">
                <Button onClick={() => setFormOpen(true)} btn_text={'update'} btn_color={'bg-green-300'} />
                <Button onClick={() => handleRemove(_id)} btn_text={'delete'} btn_color={'bg-red-200'} />
            </span>



            <div className="mt-10">
                <div className="flex items-center gap-2">
                    <LuBuilding className="text-primary" />
                    <div className='text-accent font-bold' >{name}</div>
                </div>
                <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-primary" />
                    <div className="text-secondary">{address}</div>
                </div>
                <div className="flex items-center gap-2">
                    < MdElectricBolt className="text-primary" />
                    <div className="text-secondary">₹ {EBRate} per unit</div>
                </div>
                <div className="flex items-center gap-2">
                    <IoIosPricetags className="text-primary" />
                    <div className="text-secondary">₹ {HPrice?.toLocaleString('en-IN')}</div>
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
                    {tenants.length > 0 ?
                        tenants.map((element, idx) => (
                            <li key={idx} className=" border-2  mt-4 bg-primary/20 rounded-xl  px-2 py-1 flex flex-col md:flex-row gap-1 md:items-center">
                                <div>{element.name}</div>
                              
                                <div>Room No. {element.roomNo}</div>
                           
                                <div>Rent. ₹{(element.rent).toLocaleString('en-IN')}</div>
                            </li>
                        ))
                        :
                        <div>no tenants</div>
                    }
                </ul>
            </div>




        </div>
    </>)
}