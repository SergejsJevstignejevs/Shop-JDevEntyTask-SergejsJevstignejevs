import React from "react";

import CartItem from "../cartItem/CartItem";

import './CartItemList.css';

export default class CartItemList extends React.Component {
  
  render(){

    const { productsInCart,
            onAddingProductToCart,
            onDeletingProductFromCart,
            large } = this.props;

    const cartItemListElements = productsInCart.map((item, i) => {

        return (

            <CartItem
            key={i}
            product={item}
            onAddingProductToCart={onAddingProductToCart}
            onDeletingProductFromCart={onDeletingProductFromCart}
            large={large}/>

        );
    
    })
      
    return (
      <>
        {cartItemListElements}
      </>
    );

  }

}