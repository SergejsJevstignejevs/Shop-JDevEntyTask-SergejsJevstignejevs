import React from "react";

import ProductCardList from "./productCardList/ProductCardList";

import './ProductListingPage.css';

export default class ProductListingPage extends React.Component {
  
  render(){

    const { selectedCategoryProductsWithSelectedCurrency,
            onAddingProductToCart,
            onProductDetailsPageOpening,
            onSelectedProductIdChange } = this.props;

    return (

      <main className={"ProductListingPage"}>
        <ProductCardList
          selectedCategoryProductsWithSelectedCurrency={selectedCategoryProductsWithSelectedCurrency}
          onAddingProductToCart={onAddingProductToCart}
          onProductDetailsPageOpening={onProductDetailsPageOpening}
          onSelectedProductIdChange={onSelectedProductIdChange}/>
      </main>

    );

  }

}