import propertiesData from "./propertiesData"
import PropertyCard from "./PropertyCard"
import { aggregate } from "../../api/api"
import { useState, useEffect } from "react"
import Button from "../../component/Button/Button"
import { IoMdAdd } from "react-icons/io";
import DynamicForm from '../../component/Form/DynamicForm'
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLock } from "react-icons/fa";
export default function Property() {
  const [propertyData, setPropertyData] = useState([])
  const pipeline = [
    // Join rooms with property
    {
      $lookup: {
        from: "rooms",
        localField: "_id",
        foreignField: "Property",
        as: "rooms"
      }
    },

    // Join tenants with rooms
    {
      $lookup: {
        from: "tenants",
        localField: "rooms.Tenant",
        foreignField: "_id",
        as: "tenantsInfo"
      }
    },

    // Compute counts, revenue, and tenants in one stage
    {
      $addFields: {
        occupiedRooms: {
          $filter: {
            input: "$rooms",
            as: "r",
            cond: { $eq: ["$$r.Status", "occupied"] }
          }
        },
        totalUnits: { $size: "$rooms" },
        occupiedUnits: { $size: { $filter: { input: "$rooms", as: "r", cond: { $eq: ["$$r.Status", "occupied"] } } } }
      }
    },

    // Final shaping of output
    {
      $project: {
        name: "$HName",
        address: "$HAddress",
        totalUnits: 1,
        occupiedUnits: 1,
        monthlyRevenue: { $sum: "$occupiedRooms.RentAmount" },
        //finding tenants
        tenants: {
          $map: {
            input: "$occupiedRooms",
            as: "room",
            in: {
              roomNo: { $toString: "$$room._id" },
              rent: "$$room.RentAmount",
              name: {
                $arrayElemAt: [
                  {
                    $map: {
                      input: {
                        $filter: {
                          input: "$tenantsInfo",
                          as: "t",
                          cond: { $eq: ["$$t._id", "$$room.Tenant"] }
                        }
                      },
                      as: "t",
                      in: "$$t.TName"
                    }
                  },
                  0
                ]
              }
            }
          }
        }
      }
    }
  ];
  useEffect(() => {
    const fetchPropertyData = async () => {
      const fetch = await aggregate('property', pipeline)
      setPropertyData(fetch.data)
      console.log(fetch.data)
    }
    fetchPropertyData()

  }, [])
  const [formOpen, setFormOpen] = useState(false)
  // dunmaic form field
  const formFields = [
    { name: "name", type: "text", icon: <FaUser /> },
    { name: "email", type: "email", icon: <FaEnvelope /> },
    { name: "phone", type: "tel", icon: <FaPhone /> },
    { name: "address", type: "text", icon: <FaMapMarkerAlt /> },
    { name: "password", type: "password", icon: <FaLock /> }
  ];
  return (<>
    <div className="bg-primary/20 min-h-full p-8">
      {/* text and description */}
      <div className="flex items-center justify-between gap-8">
        <div className="capitalize">
          <h1 className="text-lg md:text-xl text-secondary  font-bold tracking-wider ">Yours Properties</h1>

          <span className="text-xs md:text-base ">
            Welcome to your property dashboard! Check out each property’s details, see how many units
            are occupied, review monthly earnings, and get a quick look at all the tenants. Managing your homes has
            never been easier !
          </span>
        </div>

        <span onClick={() => setFormOpen(true)} >
          <Button btn_text={'add'} Icon={IoMdAdd} />
        </span>
        {/* form */}
        <DynamicForm
          title='form' formFields={formFields}
          formOpen={formOpen} setFormOpen={setFormOpen} submitText='submit'
        />

      </div>
      {/* render cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4  ">
        {propertyData.map((element, idx) => (
          <span key={idx}>
            <PropertyCard
              name={element.name} address={element.address}
              totalUnits={element.totalUnits} occupiedUnits={element.occupiedUnits}
              monthlyRevenue={element.monthlyRevenue}
              tenants={element.tenants}
            />
          </span>
        ))}
      </div>
    </div>


  </>)
}