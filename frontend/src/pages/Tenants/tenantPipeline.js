const tenantsPipeline =[
  // Join Room
  {
    $lookup: {
      from: "rooms",
      localField: "Room",
      foreignField: "_id",
      as: "room"
    }
  },
  { $unwind: { path: "$room", preserveNullAndEmptyArrays: true } },

  // Join Property
  {
    $lookup: {
      from: "properties",
      localField: "room.Property",
      foreignField: "_id",
      as: "property"
    }
  },
  { $unwind: { path: "$property", preserveNullAndEmptyArrays: true } },

  // Final projection
  {
    $project: {
      _id: 0,
      TName: 1,
      TPhone: 1,
      RoomNo: { $ifNull: ["$room.RoomNo", "NOT_ASSIGNED"] },
      RoomRent: { $ifNull: ["$room.RentAmount", 0] },
      effectiveDate: 1,
      PropertyName: { $ifNull: ["$property.HName", "UNKNOWN_PROPERTY"] }
    }
  }
]
export default tenantsPipeline
