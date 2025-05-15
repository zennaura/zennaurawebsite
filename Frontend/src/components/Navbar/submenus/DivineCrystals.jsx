import React from 'react';
import { FiSearch, FiChevronLeft } from 'react-icons/fi';
import '../Sidebar.css'; // ensure this includes the relevant styles
import Search from './Search';

const DivineCrystalsSubMenu = ({ goTo, closeMenu }) => {
    const items = [
        'Charging Crystals',
        'Crystal Tree',
        'Pyramid',
        'Skin Roller',
        'Zibu Coins',
    ];

    return (
        <div className="bodysoap-sub">
            <div className="header-sub">
                <FiChevronLeft className="back-icon-sub" onClick={() => goTo('main')} />
                <span className="title-sub">Divine Crystals</span>
            </div>

            <Search closeSide={closeMenu} />
            <div className="section-sub">
                <h4 className="section-title-sub">Shop By Category</h4>
                <ul className="list-sub list-subd">
                    {items.map((item, index) => (
                        <li key={index} className="item-sub">{item}</li>
                    ))}
                </ul>
            </div>
            <div className="section-sub">
                <h4 className="section-title-sub">Shop By Intent</h4>
                <div className="menu-item-sub">Key Chain</div>
                <div className="menu-item-sub">Towers/Wands</div>
                <div className="menu-item-sub menu-item-subd"><span>Crystal Tumbles</span>
                    <ul>
                        <li>Polished Tumble</li>
                        <li>Raw Tumble</li>
                        <li>Tumble Combo</li>
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default DivineCrystalsSubMenu;
