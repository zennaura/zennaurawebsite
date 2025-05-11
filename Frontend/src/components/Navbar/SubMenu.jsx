import { FiSearch, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import './Sidebar.css';
import React from 'react';

const SkinCareSubMenu = ({ goTo }) => {
    return (
        <div className="sidebar-sub">
            <div className="header-sub">
                <FiChevronLeft className="back-icon-sub" onClick={() => goTo('main')} />
                <span>Skin Care</span>
            </div>

            <div className="search-barm search-bar-sub">
                <FiSearch className="search-iconm" />
                <input type="text" placeholder="Search" />
            </div>

            <div className="section-sub">
                <h4 className="section-title-sub">Shop By Category</h4>
                <div className="menu-item-sub" onClick={() => goTo('bodyShop')}>
                    Body Soap <FiChevronRight className="arrow-icon-sub" />
                </div>
            </div>

            <div className="section-sub">
                <h4 className="section-title-sub">Shop By Intent</h4>
                <div className="menu-item-sub">Dry Skin</div>
                <div className="menu-item-sub">Relaxation</div>
            </div>
        </div>
    );
};

export default SkinCareSubMenu;
