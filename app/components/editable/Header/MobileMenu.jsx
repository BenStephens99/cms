'use client'
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function MobileMenu(props) {
    const [menuOpen, setMenuOpen] = useState(false);

    const pathname = usePathname();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleScroll = () => {
        if (menuOpen) {
            toggleMenu();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [menuOpen]);

    useEffect(() => {
        if (menuOpen) {
            toggleMenu();
        }
    }, [pathname]);

    return (
        <div className='mobile-menu'>
            <div onClick={toggleMenu} className={`nav-icon ${menuOpen ? 'open' : 'closed'}`}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={`menu-items ${menuOpen ? 'open' : 'closed'}`}>
                {props.nav}
            </div>
        </div>
    );
}
