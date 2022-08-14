import React from "react";

import CartItemList from "../cartPage/cartItemList/CartItemList";

import './MiniCart.css';

export default class MiniCart extends React.Component {
  
  render(){

    const { productsInCartCount,
            productsInCart,
            onAddingProductToCart,
            onDeletingProductFromCart,
            totalCost,
            selectedCurrency,
            onCartPageOpening } = this.props;

    return (
        <div className="MiniCart">
            <div className="MiniCart__wrapper">

                {/* MiniCart title start */}

                <div className="MiniCart__title-text">
                    My Bag,
                    <span className="MiniCart__title-text-span">
                        {` ${productsInCartCount} items`}
                    </span>
                </div>

                {/* MiniCart title end */}

                <CartItemList
                    productsInCart={productsInCart}
                    onAddingProductToCart={onAddingProductToCart}
                    onDeletingProductFromCart={onDeletingProductFromCart}/>

                {/* MiniCart total start */}

                <div className="MiniCart__total-text">
                    <div className="MiniCart__total-text-fHalf">
                        Total
                    </div>
                    <div className="MiniCart__total-text-sHalf">
                        {selectedCurrency.symbol + totalCost}
                    </div>
                </div>

                {/* MiniCart total end */}

                {/* MiniCart buttons start */}

                <div className="MiniCart__buttons">
                    <button 
                        className="MiniCart__buttons-view-bag"
                        onClick={() => onCartPageOpening()}>
                        View Bag
                    </button>
                    <button className="MiniCart__buttons-check-out">
                        Check out
                    </button>
                </div>

                {/* MiniCart buttons end */}

            </div>
        </div>

    );

  }

}