
import PropertyCard from "./PropertyCard"
import { aggregate } from "../../api/api"
import { useState, useEffect } from "react"
import Button from "../../component/Button/Button"
import { IoMdAdd } from "react-icons/io";
import DynamicForm from '../../component/Form/DynamicForm'
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import pipeline from "./pipeline";
export default function Property() {
  const [propertyData, setPropertyData] = useState([])
 
  const fetchPropertyData = async () => {
    const fetch = await aggregate('property', pipeline)
    setPropertyData(fetch.data || [])
    console.log(fetch.data)
  }
  useEffect(() => {
    fetchPropertyData()
  }, [])

  const [formOpen, setFormOpen] = useState(false)

  const formFields = [
    { name: "HName", type: "text", icon: <FaUser /> },
    { name: "HAddress", type: "text", icon: <FaEnvelope /> },
    { name: "HPrice", type: "number", icon: <FaPhone /> },
    { name: "EBRate", type: "number", icon: <FaMapMarkerAlt /> },
  ];

  const formConfig = {
    title: 'add property',
    formFields: formFields,
    formOpen: formOpen,
    setFormOpen: setFormOpen,
    submitText: 'add',
    modelName: 'property',
    refreshData: fetchPropertyData
  }

  

  return (<>
    {/* form */}
    <DynamicForm formConfig={formConfig} />

    <div className="bg-primary/20 min-h-full p-8">
      {/* text and description */}
      <div className="flex items-center justify-between gap-8">
        <div className="capitalize">
          <div className="flex justify-between">
            <h1 className="text-lg md:text-xl text-secondary  font-bold tracking-wider ">Yours Properties</h1>
            <span onClick={() => setFormOpen(true)} >
              <Button btn_text={'add'} Icon={IoMdAdd} />
            </span>
          </div>

          <span className="text-xs md:text-base ">
            Welcome to your property dashboard! Check out each property’s details, see how many units
            are occupied, review monthly earnings, and get a quick look at all the tenants. Managing your homes has
            never been easier !
          </span>
        </div>




      </div>
      {/* render cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4  ">
        {propertyData.map((element, idx) => (
          <span key={idx}>
            <PropertyCard PropertyConfig={element} fetchPropertyData={fetchPropertyData} />
          </span>
        ))}
      </div>
    </div>


  </>)
}