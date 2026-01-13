import { NavLink } from 'react-router-dom'
import navbarLinksData from "./navbarLinks"
export default function NavbarItem() {
    return (<>
        {
            navbarLinksData.map((navbarLink, idx) => {
                const Icon = navbarLink.Icon
                return (
                    <div key={idx} className='flex items-center gap-2'>
                        < Icon />
                        <NavLink to={navbarLink.link}>{navbarLink.name}</NavLink>
                    </div>
                )
            })
        }
    </>)
}