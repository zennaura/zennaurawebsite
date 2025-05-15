import { FiSearch, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import Search from './submenus/Search';

const menuItems = [
    { label: 'Home', link: '/' },
    { label: 'About Us', link: '/aboutus' },
    { label: 'Shop', link: '/shop' },
    { label: 'Skin Care', hasArrow: true, link: '/skincare', goTo: 'skinCare' },
    { label: 'Aura Jewels', hasArrow: true, link: '/aurajewels', goTo: 'auraJewel' },
    { label: 'Divine Crystals', hasArrow: true, link: '/divinecrystals', goTo: 'divineCrystal' },
    { label: 'Sacred Rituals', hasArrow: true, link: '/sacredrituals', goTo: 'sacredRituals' },
    { label: 'Gifting', link: '/' },
];

const SidebarMenu = ({ goToSubMenu, closeMenu }) => {
    return (
        <div className="sidebarm asidemain">
            <div className="header-sub header-main">
                <FiChevronLeft className="back-icon-sub" onClick={closeMenu} />
                <span className="title-sub">Main Menu</span>
            </div>
            <Search closeSide={closeMenu} />

            <ul className="menu-listm">
                {menuItems.map((item, index) => (
                    <li key={index} className="menu-itemm">
                        {item.link ? (
                            <Link to={item.link} onClick={closeMenu}>
                                {item.label}
                            </Link>
                        ) : (
                            <span>{item.label}</span>
                        )}
                        {item.hasArrow && (
                            <FiChevronRight
                                className="arrow-iconm"
                                onClick={() => goToSubMenu(item.goTo)}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SidebarMenu;
