export default function DashboardCard({ title, Icon, description, value }) {
    return (<>
        {/* card */}
        <div className=' bg-white text-xs md:text-base  min-h-[160px] p-4 rounded-2xl flex flex-col justify-between'>
            <div className=" text-accent flex justify-between items-center">
                <h1 className="font-bold">{title}</h1>
                <span>{<Icon className='text-lg' />}</span>
            </div>
            <div className="flex flex-col gap-2">
                <div className="text-success font-bold">{value}</div>
                <div className="text-warning">{description}</div>
            </div>
        </div>
    </>)
}