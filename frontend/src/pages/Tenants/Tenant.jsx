import ButtonHeader from "../../layout/ButtonHeader"
export default function Tenant() {
    const ButtonHeaderContent = {
        heading: 'Tenants',
        description: 'Keep track of your tenants easily. Add new tenants, update their information, assign rooms, monitor rent details, and manage occupancy without hassle.'
    };

    return (<>
        <ButtonHeader content={ButtonHeaderContent} />

    </>)
}