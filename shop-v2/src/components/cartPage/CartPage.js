import React from "react";

import CartItemList from "./cartItemList/CartItemList";

import './CartPage.css';

export default class CartPage extends React.Component {
  
  render(){

    const { productsInCart,
            onAddingProductToCart,
            onDeletingProductFromCart,
            productsInCartCount,
            totalCost,
            selectedCurrency } = this.props;
      
    return (
        <div className="CartPage">
            <CartItemList
                productsInCart={productsInCart}
                onAddingProductToCart={onAddingProductToCart}
                onDeletingProductFromCart={onDeletingProductFromCart}
                large={true}/>
            <div className="CartPage__wrapper">
                <div className="CartPage__content">
                    <div className="CartPage__tax">
                        Tax 21%: <span>{selectedCurrency.symbol + parseFloat(totalCost * 0.21).toFixed(2)}</span>
                    </div>
                    <div className="CartPage__quantity">
                        Quantity: <span>{productsInCartCount}</span>
                    </div>
                    <div className="CartPage__total">
                        Total: <span>{selectedCurrency.symbol + totalCost}</span>
                    </div>
                    <button className="CartPage__button-order">
                        Order
                    </button>
                </div>
            </div>
        </div>
    );

  }

}