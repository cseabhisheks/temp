import { useState } from "react"

import ButtonHeader from "../../layout/ButtonHeader"
import tenantHeader from './tenantHeader'


import tenantForm from "./tenantForm"
import DynamicForm from '../../component/Form/DynamicForm'

import tenantsData from './tenantsData'
import TenantCard from './TenantCard'

export default function Tenant() {
    const [formOpen, setFormOpen] = useState(false)
    const { tenants, fetchTenantsData } = tenantsData()
    console.log(tenants)


    return (<>
        <ButtonHeader content={tenantHeader(setFormOpen)} />
        <DynamicForm formConfig={tenantForm(formOpen, setFormOpen, fetchTenantsData)} />

        <div className="p-4 md:p-8 grid  gap-8 md:grid-cols-2">
            {tenants.map((element, idx) => (
                <span key={idx}>
                    <TenantCard config={element} Data={fetchTenantsData} />
                </span>
            ))}
        </div>

    </>)
}