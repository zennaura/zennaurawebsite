import { FiSearch, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import '../Sidebar.css';
import React from 'react';
import Search from './Search';

const AuraJewels = ({ goTo, closeMenu }) => {
    return (
        <div className="sidebar-sub">
            <div className="header-sub">
                <FiChevronLeft className="back-icon-sub" onClick={() => goTo('main')} />
                <span>Aura Jewels</span>
            </div>

            <Search closeSide={closeMenu} />

            <div className="section-sub">
                <h4 className="section-title-sub">Shop By Category</h4>
                <div className="menu-item-sub" onClick={() => goTo('crystalBracelets')}>
                    Crystal Bracelets <FiChevronRight className="arrow-icon-sub" />
                </div>
            </div>

            <div className="section-sub">
                <h4 className="section-title-sub">Shop By Category</h4>
                <div className="menu-item-sub" onClick={() => goTo('crystalWearables')}>
                    Zodiac Bracelets <FiChevronRight className="arrow-icon-sub" />
                </div>
            </div>
        </div>
    );
};

export default AuraJewels;
