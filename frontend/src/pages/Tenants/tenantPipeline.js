// tenantsPipeline.js
const tenantsPipeline = [

    {
        $lookup: {
            from: 'rooms',
            localField: '_id',
            foreignField: 'Property',
            as: 'room'
        }
    },
    {
        $lookup: {
            from: 'tenants',
            localField: 'room._id',
            foreignField: 'Room',
            as: 'tenant'
        }
    },
   {
  $project: {
    _id: 0,
    PropertyId: "$_id",
    PropertyName: "$HName",
    HAddress: 1,
    EBRate: 1,

    rooms: {
      $map: {
        input: "$room",
        as: "r",
        in: {
          RoomId: "$$r._id",
          RoomNo: "$$r.RoomNo",
          RentAmount: "$$r.RentAmount"
        }
      }
    },

    tenants: {
      $map: {
        input: "$tenant",
        as: "t",
        in: {
          tenantId: "$$t._id",
          TName: "$$t.TName",
          TPhone: "$$t.TPhone",
          RoomNo: "$$t.RoomNo",
          RoomRent: "$$t.RoomRent",
          effectiveDate: "$$t.effectiveDate"
        }
      }
    }
  }
}

]
export default tenantsPipeline;
