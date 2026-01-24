const pipeline = [
  // 1️⃣ Lookup rooms
  {
    $lookup: {
      from: "rooms",
      localField: "_id",
      foreignField: "Property",
      as: "rooms"
    }
  },

  // 2️⃣ Collect ONLY valid tenant ObjectIds
  {
    $addFields: {
      tenantIds: {
        $filter: {
          input: "$rooms.Tenant",
          as: "t",
          cond: { $ne: ["$$t", null] }
        }
      }
    }
  },

  // 3️⃣ Lookup tenants
  {
    $lookup: {
      from: "tenants",
      let: { tenantIds: "$tenantIds" },
      pipeline: [
        {
          $match: {
            $expr: { $in: ["$_id", "$$tenantIds"] }
          }
        }
      ],
      as: "tenantsInfo"
    }
  },

  // 4️⃣ Compute stats
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
      occupiedUnits: {
        $size: {
          $filter: {
            input: "$rooms",
            as: "r",
            cond: { $eq: ["$$r.Status", "occupied"] }
          }
        }
      }
    }
  },

  // 5️⃣ Final projection (🔥 roomId added)
  {
    $project: {
      name: "$HName",
      address: "$HAddress",
      HPrice: 1,
      EBRate: 1,
      totalUnits: 1,
      occupiedUnits: 1,
      monthlyRevenue: { $sum: "$occupiedRooms.RentAmount" },

      // 🏠 Rooms (ALL)
      rooms: {
        $map: {
          input: "$rooms",
          as: "r",
          in: {
            roomId: "$$r._id",        // ✅ ADDED
            roomNo: "$$r.RoomNo",
            status: "$$r.Status",
            rent: "$$r.RentAmount",
            tenantId: "$$r.Tenant"
          }
        }
      },

      // 👤 Tenants (ONLY occupied rooms)
      tenants: {
        $map: {
          input: "$occupiedRooms",
          as: "room",
          in: {
            roomId: "$$room._id",     // ✅ ADDED
            roomNo: "$$room.RoomNo",
            rent: "$$room.RentAmount",
            tenant: {
              $arrayElemAt: [
                {
                  $filter: {
                    input: "$tenantsInfo",
                    as: "t",
                    cond: { $eq: ["$$t._id", "$$room.Tenant"] }
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
]

export default pipeline