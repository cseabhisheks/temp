const roomPipeline = [
  // Join rooms to property
  {
    $lookup: {
      from: "rooms",
      localField: "_id",
      foreignField: "Property",
      as: "rooms"
    }
  },
  // Join tenants to rooms (if room has a tenant)
  {
    $lookup: {
      from: "tenants",
      localField: "rooms.Tenant",
      foreignField: "_id",
      as: "tenantsData"
    }
  },
  // Map tenants into rooms
  {
    $addFields: {
      rooms: {
        $map: {
          input: "$rooms",
          as: "r",
          in: {
            RoomId: "$$r._id",
            RoomNo: "$$r.RoomNo",
            Status: "$$r.Status",
            RentAmount: "$$r.RentAmount",
            Tenant: {
              $arrayElemAt: [
                {
                  $filter: {
                    input: "$tenantsData",
                    cond: { $eq: ["$$this._id", "$$r.Tenant"] }
                  }
                },
                0
              ]
            }
          }
        }
      }
    }
  },
  // Only keep properties with rooms array (can be empty)
  {
    $project: {
      HName: 1,
      HAddress: 1,
      EBRate: 1,
      rooms: 1
    }
  }
];

export default roomPipeline;
