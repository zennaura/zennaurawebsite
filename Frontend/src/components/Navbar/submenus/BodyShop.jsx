import React from 'react';
import { FiSearch, FiChevronLeft } from 'react-icons/fi';
import '../Sidebar.css'; // ensure this includes the relevant styles

const BodySoapSubMenu = ({ goTo }) => {
    const soaps = [
        'Clay Soap',
        'Scrub Soap',
        'Therapeutic soap',
        'Fruit Soap',
        'Clay Soap',
        'Scrub Soap',
        'Therapeutic soap',
        'Fruit Soap',
    ];

    return (
        <div className="bodysoap-sub">
            <div className="header-sub">
                <FiChevronLeft className="back-icon-sub" onClick={() => goTo('skinCare')} />
                <span className="title-sub">Body Soap</span>
            </div>

            <div className="search-barm search-bar-sub">
                <FiSearch className="search-iconm" />
                <input type="text" placeholder="Search" />
            </div>

            <ul className="list-sub">
                {soaps.map((item, index) => (
                    <li key={index} className="item-sub">{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default BodySoapSubMenu;
