import React from "react";

import shopLogo from "../../resources/images/shop-logo-ico.png";
import currencyDownIco from "../../resources/images/currency-down-ico.png";
import currencyUpIco from "../../resources/images/currency-up-ico.png";
import cartIco from "../../resources/images/empty-cart-ico.png";

import './AppHeader.css';

export default class AppHeader extends React.Component {
  
  render(){

    const { categoryNames, 
            selectedCategory, 
            onSelectedCategoryChange,
            openCurrencySwitcher, 
            onCurrencySwitcherOpening,
            onMiniCartOpening,
            openMiniCart,
            productsInCartCount } = this.props;

    const currencyIco = openCurrencySwitcher ? currencyUpIco : currencyDownIco;

    const navListItems = categoryNames.map((item, i) => {

        const active = selectedCategory === item.name;
        const clazz = active ? " line" : "";

        return (

            <li 
                className={`AppHeader__nav__list-item ${clazz}`}
                key={i}
                onClick={() => onSelectedCategoryChange(item.name)}>
                    {item.name}
            </li>

        );

    });

    const visibleClass = productsInCartCount ? " visible" : "";
    const productsInCartCountChanged = productsInCartCount > 9 ? "9+" : productsInCartCount;

    return (
        <header className="AppHeader">
            <div className="AppHeader__wrapper">
            {/* Navigation start */}
            <nav className="AppHeader__nav">
                <ul className="AppHeader__nav__list">
                    {navListItems}
                </ul>
            </nav>
            {/* Navigation end */}
            
            {/* Logo start */}
            <div className="AppHeader__logo">
                <a href="/" className="AppHeader__logo-link">
                    <img src={shopLogo} alt="Shop logo" className="AppHeader__logo-img" />
                </a>
            </div>
            {/* Logo end */}

            {/* Actions start */}
            <div className="AppHeader__actions">
                <ul className="AppHeader__actions__list">
                    <li className="AppHeader__actions__list-item">
                        <img 
                            role="button"
                            src={currencyIco} 
                            alt="Switch currency"
                            onClick={() => {

                                if(!openMiniCart) {
                                    
                                    onCurrencySwitcherOpening();

                                }

                            }} />
                    </li>
                    <li className="AppHeader__actions__list-item">
                        <img
                            role="button" 
                            src={cartIco} 
                            alt="Mini cart"
                            onClick={() => {

                                if(!openCurrencySwitcher) {
                                    
                                    onMiniCartOpening();

                                }

                            }} />
                        <div className={`AppHeader__actions__list-item__counter ${visibleClass}`}>
                            <p className="AppHeader__actions__list-item__counter-text">
                                {productsInCartCountChanged}
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
            {/* Actions end */}
            </div>
        </header>
    );

  }

}