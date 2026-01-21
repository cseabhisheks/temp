// RoomPage.jsx
import RoomData from './RoomData'
import { FaDotCircle } from "react-icons/fa";
export default function RoomCard() {

  return (<>

    <div className='p-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-2  '>
      {RoomData.map((property, idx) => (
        <div key={idx}>
          <h1 className='text-xl capitalize mb-4 flex gap-4 items-center'>{property.propertyName}
            <span className='text-xs'>(EBRate:@{property.EBRate} per unit )</span>
          </h1>
          <div className='bg-white border-2 border-primary p-4 rounded-xl'>
            {
              property.rooms.map((element, idx) => {
                const isVacant = element.status == 'vacant'
                return (
                  <div key={idx} className={`text-xs md:text-base bg-white ${isVacant ? 'border-warning text-warning' : 'border-success text-success'} border-2 flex justify-between p-2 md:p-4 rounded-xl mb-3 h-full`}>
                    <span className='flex items-center gap-4'> <FaDotCircle />Room {element.RoomNo}</span>
                    <div className='flex gap-4'>
                      <span>{element.TenantName ?? 'vacant'}</span>
                      <span>{element.Rent ? `₹ ${element.Rent}` : ''}</span>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      ))
      }
    </div>


  </>)
}
