import React from 'react';
import { FiSearch, FiChevronLeft } from 'react-icons/fi';
import '../Sidebar.css'; // ensure this includes the relevant styles
import Search from './Search';

const CrystalWearables = ({ goTo, closeMenu }) => {
    const soaps = [
        'Ear Rings/Tops',
        'Pendants'
    ];

    return (
        <div className="bodysoap-sub">
            <div className="header-sub">
                <FiChevronLeft className="back-icon-sub" onClick={() => goTo('auraJewel')} />
                <span className="title-sub">Crystal Wearables</span>
            </div>

            {/* <div className="search-barm search-bar-sub">
                <FiSearch className="search-iconm" />
                <input type="text" placeholder="Search" />
            </div> */}
            <Search closeSide={closeMenu} />

            <ul className="list-sub">
                {soaps.map((item, index) => (
                    <li key={index} className="item-sub">{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default CrystalWearables;
