import { useState } from "react";
import Button from "../../component/Button/Button";
import ButtonHeader from "../../layout/ButtonHeader";
import tenantHeader from "./tenantHeader";
import tenantForm from "./tenantForm";
import DynamicForm from "../../component/Form/DynamicForm";
import tenantsData from "./tenantsData";
import TenantCard from "./TenantCard";
import { find } from '../../api/api'

export default function Tenant() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const { tenants: properties = [], fetchTenantsData } = tenantsData();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [vacantRooms, setVacantRoom] = useState()


  const fetchVacantRoom = async (id) => {
    const res = await find('room', { Status: 'vacant', Property: id })
    setVacantRoom(res.data)
    console.log(res)

  }

  console.log(properties)
  return (
    <>
      <ButtonHeader content={tenantHeader()} />

      <DynamicForm
        formConfig={tenantForm(
          formOpen,
          setFormOpen,
          fetchTenantsData,
          selectedTenant,
          vacantRooms
        )}
        refData={{
          Room: vacantRooms,
        }}
      />


      <div className="p-4 md:p-8 space-y-10">
        {properties.length === 0 && (
          <div className="text-center text-gray-400">
            No properties found
          </div>
        )}

        {properties.map((property) => (
          <div key={property.PropertyId} className="border-b pb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base md:text-xl font-bold">
                {property.PropertyName}

                <div>
                  <span className="text-xs font-normal ml-4">({property.HAddress})</span>
                  <span className="text-xs font-normal ml-4">(₹ {property.EBRate} per unit)</span>
                </div>
              </h2>

              <Button
                btn_text="Add Tenant"
                onClick={() => {
                  setSelectedTenant(null);
                  fetchVacantRoom(property.PropertyId)
                  setSelectedRoom(property.Room?.[0]?._id || null);
                  setFormOpen(true);
                }}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {property.tenants?.length > 0 ? (
                property.tenants.map((tenant, idx) => {
                  // Assign room based on the index of the tenant
                  const tenantRoom = property.rooms?.[idx]; // safest fallback

                  return (
                    <TenantCard
                      key={idx}
                      config={{ tenant, room: tenantRoom }}
                      refresh={fetchTenantsData}
                      setSelectedTenant={setSelectedTenant}
                      setFormOpen={setFormOpen}
                    />
                  );
                })
              ) : (
                <p className="text-gray-400">No tenants yet</p>
              )}

            </div>

          </div>
        ))}
      </div>
    </>
  );
}
