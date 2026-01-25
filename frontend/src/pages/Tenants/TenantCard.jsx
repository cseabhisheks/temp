import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import Button from "../../component/Button/Button";
import { remove, update } from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function TenantCard({
  config,
  refresh,
  setSelectedTenant,
  setFormOpen,
  showAction = true
}) {
  // Destructure tenant and room from config
  const { tenant, room } = config;
  const {
    tenantId,
    TName,
    TPhone,
    effectiveDate,

  } = tenant;

  const rent = room?.RentAmount || 0;
  const tenantRoomNo = room?.RoomNo || 0

  const navigate = useNavigate()
  const showTenantsDetail = (id) => {
    navigate(`/tenant-details/${TName}/${id}`, { state: { config } })
  }



  const handleRemove = async () => {
    try {
      await remove("tenant", tenantId);
      await update("room", { Status: "vacant", Tenant: tenantId }, room.RoomId);
      refresh();
    } catch (err) {
      console.error("Error deleting tenant:", err);
    }
  };

  return (
    <div onClick={() => { showTenantsDetail(tenantId) }} className="border-primary bg-white  text-xs md:text-base border-2 p-4 md:p-6 rounded-xl flex flex-col gap-4">
      {showAction &&
        <div className="flex gap-2">
          <Button
            btn_text="Update"
            btn_color="bg-green-300"
            onClick={() => {
              setSelectedTenant(config.tenant);
              setFormOpen(true);
            }}
          />
          <Button
            btn_text="Delete"
            btn_color="bg-red-300"
            onClick={handleRemove}
          />
        </div>}

      <div className="flex justify-between text-xl capitalize text-primary">
        <div className="font-semibold">{TName}</div>
        <div>Room.No.{tenantRoomNo}</div>
      </div>

      <hr />

      <div className="flex items-center gap-3">
        <FaPhoneAlt  className="text-lg text-primary " />
        <span className="text-secondary">+91 {TPhone}</span>
      </div>

      <div className="flex items-center gap-3">
        <IoLocationOutline className="text-2xl text-primary " />
        <span className="text-warning">Monthly Rent</span>
        <span className="font-bold text-success tracking-wider">₹ {rent.toLocaleString()}</span>
      </div>

      <div className="flex items-center gap-3">
        <CiCalendarDate  className="text-2xl text-primary " />
        <span className="text-accent">
          {effectiveDate
            ? new Date(effectiveDate).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "2-digit",
            })
            : "—"}
        </span>
      </div>
    </div>
  );
}
