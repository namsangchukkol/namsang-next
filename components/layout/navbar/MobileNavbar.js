import Hamburger from 'hamburger-react'
import React, { useState } from 'react'
import { useScroll } from '../../../hooks/animationHooks'

export default function MobileNavbar() {
    const scrolled = useScroll()
    const [isOpen, setOpen] = useState(false)
    return (
        <nav className={`lg:hidden w-screen fixed top-0 left-0 z-50 h-14 
        ${scrolled ? 'bg-white shadow-sm' : 'bg-transparent'} flex justify-between items-center px-5 transition-all`}>
            <aside>Logo</aside>

            {/* Burger menu */}
            <aside>
                <Hamburger toggled={isOpen} toggle={setOpen} size={30} color={scrolled ? 'red' : 'white'} duration={0.2} />
            </aside>
        </nav>
    )
}
