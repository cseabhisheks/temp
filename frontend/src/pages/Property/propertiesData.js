import { useState, useEffect } from "react"
import { aggregate } from "../../api/api"
import pipeline from "./pipeline"
export default function propertiesData() {
    const [propertyData, setPropertyData] = useState([])

    const fetchPropertyData = async () => {
        const fetch = await aggregate('property', pipeline)
        setPropertyData(fetch.data || [])
        console.log(fetch.data)
    }
    useEffect(() => {
        fetchPropertyData()
    }, [])

    return { propertyData, fetchPropertyData }


}