// tenantsData.js
import { aggregate } from "../../api/api";
import tenantPipeline from "./tenantPipeline";
import { useState, useEffect } from "react";

export default function tenantsData() {
  const [tenants, setTenants] = useState([]);

  const fetchTenantsData = async () => {
    try {
      const res = await aggregate("property", tenantPipeline);
      setTenants(res.data || []);
    } catch (err) {
      console.error("Error fetching tenants:", err);
    }
  };


  // Fetch on mount
  useEffect(() => {
    fetchTenantsData();
  }, []);

  return { tenants, fetchTenantsData };
}
