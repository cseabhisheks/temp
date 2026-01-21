
import { FaDotCircle } from "react-icons/fa";
import DynamicForm from "../../component/Form/DynamicForm";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import Button from "../../component/Button/Button";
import { remove } from "../../api/api";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function RoomCard({ property, fetchRoomData }) {

  const handleRemove = async (_id) => {

    console.log('deleting....', _id)
    const res = await remove('room', _id)
    console.log(res)
    fetchRoomData()
  }
  const [formOpen, setFormOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null);


  const formFields = [
    { name: "RoomNo", type: "text", icon: <FaUser /> },
    { name: "RentAmount", type: "number", icon: <FaMapMarkerAlt /> },


  ];


  const formConfig = {
    title: selectedRoom ? 'Update Room' : 'Add Room',
    formFields,
    formOpen,
    setFormOpen,
    submitText: selectedRoom ? 'Update' : 'Add',
    modelName: 'room',
    _id: selectedRoom?.RoomId,
    isUpdate: !!selectedRoom?.RoomId,

    refreshData: fetchRoomData,

    hiddenData: {
      Property: property._id,
    }
  };



  return (<>



    <DynamicForm formConfig={formConfig} />

    <div >
      <div className='text-xl capitalize mb-4 flex  items-center justify-between'>
        <div className="leading-5">
          <h1>{property.HName}</h1>
          <span className='text-xs'>(EBRate:@{property.EBRate} per unit )</span>
        </div>
        <span onClick={() => {
          setSelectedRoom(null)
          setFormOpen(true)
        }} >
          <Button btn_text={'add room'} Icon={IoMdAdd} />
        </span>
      </div>
      <div className='bg-white border-2 border-primary p-4 rounded-xl'>
        {property.rooms != 0 ?
          property.rooms.map((element, idx) => {
            const tenant = element.Tenant?.TName
            return (
              <div key={idx} className={`text-xs md:text-base bg-white ${!tenant ? 'border-warning text-warning' : 'border-success text-success'} border-2 flex flex-wrap gap-4 justify-between p-2 md:p-4 rounded-xl mb-3 h-full`}>
                <span className='flex items-center gap-4'> <FaDotCircle />Room {element.RoomNo}</span>
                <div className='flex gap-4'>
                  <span>{tenant ?? 'vacant'}</span>
                  <span>{element.RentAmount ? `₹ ${element.RentAmount}` : ''}</span>
                </div>
                <span className=" flex gap-4">
                  <Button
                    onClick={() => {
                      setSelectedRoom(element); // set room to update
                      setFormOpen(true);
                    }}
                    btn_text={'update'} btn_color={'bg-red-300'} />
                  <Button onClick={() => handleRemove(element.RoomId)} btn_text={'delete'} btn_color={'bg-green-200'} />
                </span>
              </div>
            )
          }) :
          <div className="text-center capitalize ">
            no room exists! please add room
          </div>
        }
      </div>
    </div>




  </>)
}