import React from "react";

import './CurrencySwitcher.css';

export default class CurrencySwitcher extends React.Component {
  
  render(){

    const { availableCurrencies, 
            onSelectedCurrencyChange,
            onCurrencySwitcherOpening } = this.props;
    
    const currencyListElements = availableCurrencies.map(item => {

        return (

            <li 
                className="CurrencySwitcher__list-item"
                key={item.label}
                onClick={() => {
                    onSelectedCurrencyChange(item);
                    onCurrencySwitcherOpening(); }}>
                {item.symbol + " " + item.label}
            </li>

        );

    })

    return (
        
        <div className="CurrencySwitcher">
            <div className="CurrencySwitcher__wrapper">
                <ul className="CurrencySwitcher__list">
                    {currencyListElements}
                </ul>        
            </div>
        </div>
    );

  }

}