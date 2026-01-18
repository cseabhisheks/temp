import propertiesData from "./propertiesData"
import PropertyCard from "./PropertyCard"
export default function Property() {
    return (<>
        <div className="bg-primary/20 min-h-full p-8">
            {/* text and description */}
            <div className="flex items-center justify-between gap-8">
                <div className="capitalize">
                    <h1 className="text-lg md:text-xl text-secondary  font-bold tracking-wider ">Yours Properties</h1>

                    <span className="text-xs md:text-base ">
                        Welcome to your property dashboard! Check out each property’s details, see how many units
                        are occupied, review monthly earnings, and get a quick look at all the tenants. Managing your homes has
                        never been easier !
                    </span>
                </div>
                <div className="border-2 border-primary rounded-xl w-[300px] text-center bg-accent text-primary font-bold capitalize py-1">
                    add property
                </div>
            </div>
            {/* render cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4  ">
                {propertiesData.map((element, idx) => (
                    <span key={idx}>
                        <PropertyCard
                            name={element.name} address={element.address}
                            totalUnits={element.totalUnits} occupiedUnits={element.occupiedUnits}
                            monthlyRevenue={element.monthlyRevenue}
                            tenants={element.tenants}
                        />
                    </span>
                ))}
            </div>
        </div>


    </>)
}