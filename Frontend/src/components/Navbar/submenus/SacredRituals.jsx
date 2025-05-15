import React from 'react';
import { FiSearch, FiChevronLeft } from 'react-icons/fi';
import '../Sidebar.css'; // ensure this includes the relevant styles
import Search from './Search';

const SacredRitualsSubMenu = ({ goTo, closeMenu }) => {
    const items = [
        'Candles',
        'Incense Sticks',
        'Magical Spray',
        'Sage',
    ];

    return (
        <div className="bodysoap-sub">
            <div className="header-sub">
                <FiChevronLeft className="back-icon-sub" onClick={() => goTo('main')} />
                <span className="title-sub">Sacred Rituals</span>
            </div>

            <Search closeSide={closeMenu} />

            <ul className="list-sub">
                {items.map((item, index) => (
                    <li key={index} className="item-sub">{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default SacredRitualsSubMenu;
