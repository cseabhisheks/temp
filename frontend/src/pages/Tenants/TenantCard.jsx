import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import Button from "../../component/Button/Button";
import { remove } from "../../api/api";

export default function TenantCard({
  config,
  refresh,
  setSelectedTenant,
  setFormOpen,
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
  const tenantRoomNo=room?.RoomNo||0

  const handleRemove = async () => {
    try {
      await remove("tenant", tenantId);
      refresh();
    } catch (err) {
      console.error("Error deleting tenant:", err);
    }
  };

  return (
    <div className="border-2 p-4 md:p-6 rounded-xl flex flex-col gap-4">
      <div className="flex gap-2">
        <Button
          btn_text="Update"
          btn_color="bg-blue-300"
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
      </div>

      <div className="flex justify-between">
        <div className="font-semibold">{TName}</div>
        <div>R.No. {tenantRoomNo}</div>
      </div>

      <hr />

      <div className="flex items-center gap-3">
        <FaPhoneAlt className="text-xs" />
        <span>{TPhone}</span>
      </div>

      <div className="flex items-center gap-3">
        <IoLocationOutline />
        <span>Monthly Rent</span>
        <span>₹ {rent.toLocaleString()}</span>
      </div>

      <div className="flex items-center gap-3">
        <CiCalendarDate />
        <span>
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
