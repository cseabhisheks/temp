import { Navigate, useLocation } from "react-router-dom";
import TenantCard from "../pages/Tenants/TenantCard";

export default function TenantDetail() {
    const location = useLocation();

    // 🔥 guard FIRST
    if (!location.state) {
        return <Navigate to="/tenants" replace />;
    }

    const { config } = location.state;

    return (
        <>
            <div className="bg-primary/20 min-h-full p-4 md:p-8">
                <h2 className="mb-4 font-semibold">Tenant Detail</h2>

                <TenantCard config={config} showAction={false} />

                <div>history</div>

            </div>
        </>
    );
}