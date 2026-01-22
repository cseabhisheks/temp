import { useState, useEffect } from "react"
import { aggregate } from "../../api/api"
import tenantsPipeline from "./tenantPipeline"

export default function tenantsData() {
    const [tenants, setTenantsData] = useState([])

    const fetchTenantsData = async () => {
        const fetch = await aggregate('tenant',tenantsPipeline)
        setTenantsData(fetch.data || [])
        console.log(fetch.data)
    }
    useEffect(() => {
        fetchTenantsData()
    }, [])

    return { tenants, setTenantsData}


}