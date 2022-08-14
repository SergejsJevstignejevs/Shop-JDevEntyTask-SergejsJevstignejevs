import React from "react";

import ProductCard from "../productCard/ProductCard";

import './ProductCardList.css';

export default class ProductCardList extends React.Component {
  
  render(){

    const { selectedCategoryProductsWithSelectedCurrency,
            onAddingProductToCart,
            onProductDetailsPageOpening } = this.props;

    const productListElements = selectedCategoryProductsWithSelectedCurrency.map(item => {

      const {id, ...itemProps} = item;

      const initialSelectedAttributes = item.attributes.map(elem => {

        return {

          id: elem.id,
          name: elem.name,
          type: elem.type,
          selected: {
            id: elem.items[0].id,
            value: elem.items[0].value
          }

        }

      });

      return (

        <ProductCard
          key={id}
          {...itemProps}
          onAddingProductToCart={() => {

              onAddingProductToCart(
                  { id: item.id, 
                    name: item.name, 
                    brand: item.brand, 
                    price: item.prices,
                    gallery: item.gallery,
                    fullAttributes: item.attributes},
                  initialSelectedAttributes);

            }
          }
          onProductDetailsPageOpening={() => onProductDetailsPageOpening(id)}
          />

      );

    });
      
    return (

      <div className="ProductCardList">
        {productListElements} 
      </div>

    );

  }

}