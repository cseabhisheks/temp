import roomPipeline from './roomPipeline';
import { aggregate } from '../../api/api';
import { useEffect, useState } from 'react';
import RoomCard from './RoomCard';
import DynamicForm from '../../component/Form/DynamicForm';

import Button from '../../component/Button/Button';
import { IoAdd } from 'react-icons/io5';
export default function Room() {
    // fetch
    const [roomData, setRoomData] = useState([])

    const fetchRoomData = async () => {
        const res = await aggregate('property', roomPipeline)
        console.log(res.data)
        setRoomData(res.data)

    }
    useEffect(() => {
        fetchRoomData()
        console.log(roomData)
    }, [])



    return (<>
        {/* header */}
        <div className='bg-primary/20 h-full'>
            <div className="capitalize p-8 ">
                <div className="flex justify-between mb-4 ">
                    <h1 className="text-lg md:text-xl text-secondary  font-bold tracking-wider ">rooms</h1>
                </div>

                <span className="text-xs md:text-base ">
                    Welcome to your room dashboard! View each room’s details,
                    check whether it’s occupied or vacant, review rent amounts, and see the
                    current tenant at a glance. Managing your rooms has never been easier!
                </span>
            </div>


            {/* render card */}
            <div className="p-8">
                {roomData.length === 0 ? (
                    <div className="bg-white rounded-xl p-4 text-center capitalize text-gray-600">
                        no property exists! please add a property first on  <a className='text-primary underline' href="/property"> property page</a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {roomData.map((property, idx) => (
                            <span key={property._id ?? idx}>
                                <RoomCard
                                    property={property}
                                    fetchRoomData={fetchRoomData}
                                />
                            </span>
                        ))}
                    </div>
                )}
            </div>

        </div>
    </>)
}