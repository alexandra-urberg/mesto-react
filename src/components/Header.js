import React from 'react';
import headerLogo from './../images/logo.svg';

const Header = () => {
    return (
        <header className="header">
            <img src={headerLogo} alt="логотип MESTO" className="header__logo" /> 
        </header>
    )
}

export default Header;