import { FiSearch, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import React from 'react';
import './Sidebar.css';

const menuItems = [
    { label: 'Home' },
    { label: 'About Us' },
    { label: 'Shop' },
    { label: 'Skin Care', hasArrow: true, goTo: 'skinCare' },
    { label: 'Aura Jewels', hasArrow: true, goTo: 'auraJewels' },
    { label: 'Divine Crystals', hasArrow: true, goTo: 'divineCrystals' },
    { label: 'Sacred Rituals', hasArrow: true, goTo: 'sacredRituals' },
    { label: 'Gifting' },
];

const SidebarMenu = ({ goToSubMenu, closeMenu }) => {
    const handleItemClick = (item) => {
        if (item.hasArrow && item.goTo && goToSubMenu) {
            goToSubMenu(item.goTo); // pass target submenu
        }
    };

    return (
        <div className="sidebarm asidemain">
            <div className="header-sub header-main">
                <FiChevronLeft className="back-icon-sub" onClick={() => closeMenu()} />
                <span className="title-sub">Main Menu</span>
            </div>
            <div className="search-barm search-bar-sub">
                <FiSearch className="search-iconm" />
                <input type="text" placeholder="Search" />
            </div>

            <ul className="menu-listm">
                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        className="menu-itemm"
                        onClick={() => handleItemClick(item)}
                    >
                        {item.label}
                        {item.hasArrow && <FiChevronRight className="arrow-iconm" />}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SidebarMenu;
