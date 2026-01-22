import PropertyCard from "./PropertyCard"
import { useState } from "react"
import ButtonHeader from "../../layout/ButtonHeader";
import DynamicForm from '../../component/Form/DynamicForm'
import propertyForm from "./PropertyForm";
import propertiesData from "./propertiesData";
import propertyHeader from './propertyHeader'
export default function Property() {

  const { propertyData, fetchPropertyData } = propertiesData()
  const [formOpen, setFormOpen] = useState(false)

  return (<>
    {/* form */}
    <DynamicForm formConfig={propertyForm(formOpen, setFormOpen, fetchPropertyData)} />

    <div className="bg-primary/20 min-h-full p-8">

      <ButtonHeader content={propertyHeader(setFormOpen)} />


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