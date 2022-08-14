import React from "react";

import addToCartIco from "../../../resources/images/add-to-cart-ico.png";

import './ProductCard.css';

export default class ProductCard extends React.Component {
  
  render(){

    const { name, 
            inStock, 
            gallery, 
            prices, 
            brand, 
            onAddingProductToCart, 
            onProductDetailsPageOpening } = this.props;

    const outOfStockClass = !inStock ? " productOutOfStock" : '';
    const enabled = !inStock ? false : true;
      
    return (
        <div className={`ProductCard ${outOfStockClass}`}>

            {/* Product images start */}

            <div className="ProductCard__img-container">
                <img
                    type="button"
                    src={gallery[0]} 
                    alt={name} 
                    className="ProductCard__img"
                    onClick={onProductDetailsPageOpening}/>   
                <img role="button"
                    type="button" 
                    src={addToCartIco} 
                    alt={`Add ${name} to cart`}
                    className="ProductCard__addProductToCart-img"
                    onClick={() => {

                            if(enabled){

                                onAddingProductToCart();

                            }

                        }
                    }
                    />  
                <div className="ProductCard__productOutOfStock-text">Out of stock</div>
            </div>

            {/* Product images end */}

            {/* Product content start */}

            <div className="ProductCard__product-content">
                <div className="ProductCard__product-name">
                    {brand + ": " + name}             
                </div>
                <div className="ProductCard__product-cost">
                    {prices.currency.symbol + prices.amount}
                </div>
            </div>

            {/* Product content end */}

        </div>

    );

  }

}