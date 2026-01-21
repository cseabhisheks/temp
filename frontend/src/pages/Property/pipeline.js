 const pipeline = [
    // Join rooms with property
    {
      $lookup: { from: "rooms", localField: "_id", foreignField: "Property", as: "rooms" }
    },
    // Join tenants with rooms
    {
      $lookup: { from: "tenants", localField: "rooms.Tenant", foreignField: "_id", as: "tenantsInfo" }
    },
    // Compute counts, revenue, and tenants in one stage
    {
      $addFields:
      {
        occupiedRooms: { $filter: { input: "$rooms", as: "r", cond: { $eq: ["$$r.Status", "occupied"] } } },
        totalUnits: { $size: "$rooms" },
        occupiedUnits: { $size: { $filter: { input: "$rooms", as: "r", cond: { $eq: ["$$r.Status", "occupied"] } } } }
      }
    },
    // Final shaping of output
    {
      $project: {
        name: "$HName",
        address: "$HAddress",
        HPrice: 1,        // ✅ added
        EBRate: 1,        // ✅ added
        totalUnits: 1,
        occupiedUnits: 1,
        monthlyRevenue: { $sum: "$occupiedRooms.RentAmount" },
        // finding tenants
        tenants: {
          $map: {
            input: "$occupiedRooms", as: "room", in: {
              roomNo: "$$room.RoomNo",   // ✅ FIXED: using RoomNo instead of _id
              rent: "$$room.RentAmount",
              name: { $arrayElemAt: [{ $map: { input: { $filter: { input: "$tenantsInfo", as: "t", cond: { $eq: ["$$t._id", "$$room.Tenant"] } } }, as: "t", in: "$$t.TName" } }, 0] }
            }
          }
        }
      }
    }
  ];
  export default pipeline