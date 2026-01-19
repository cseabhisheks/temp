
import { IoMdClose } from "react-icons/io";
import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import NavbarItem from './NavbarItem';

export default function Navbar() {
    const [isMenuBarOpen, setMenuBarOpen] = useState(false)
    return (<>
        {/* navbar */}
        <div className="relative h-[60px] bg-primary flex justify-between items-center text-accent capitalize px-8">
            {/* website logo */}
            <div>Rent Management</div>

            {/* website menubar */}
            <ul className='hidden md:flex gap-8 '>
                <NavbarItem />
            </ul>

            {/* mobile screen menubar button*/}
            <ul className='static md:hidden' onClick={() => setMenuBarOpen(!isMenuBarOpen)}>
                {isMenuBarOpen ? <IoMdClose /> : <GiHamburgerMenu />}
            </ul>

        </div>

        {/* mobile screen menubar */}
        <div className='md:hidden '>
            {isMenuBarOpen && (
                <ul onClick={()=>setMenuBarOpen(false)} className='border-2 text-accent w-[100vw] flex flex-col items-center gap-5 relative bg-primary/80 p-4'>
                    <NavbarItem />
                </ul>
            )}
        </div>
    </>)
}