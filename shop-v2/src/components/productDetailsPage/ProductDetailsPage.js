import React from "react";

import { fetchQueryData,
         GET_PRODUCT_BY_ID } from "../../services/queries/Queries";

import CartItemAttributesName from "../cartPage/cartItem/cartItemAttributesName/CartItemAttributesName";
import CartItemAttributesList from "../cartPage/cartItem/cartItemAttributesList/CartItemAttributesList";

import './ProductDetailsPage.css';

export default class ProductDetailsPage extends React.Component {

    state = {

        product: null,
        productLoaded: false,
        selectedAttributes: [],
        viewPictureIndex: 0

    }

    async componentDidMount() {

        const { selectedProductId, selectedCurrency } = this.props;

        const selectedProduct = await fetchQueryData(GET_PRODUCT_BY_ID, { productId: selectedProductId });
        const updatedPrice = selectedProduct.product.prices.filter(item => item.currency.label === selectedCurrency.label)[0];
        const updatedSelectedProduct = {...selectedProduct.product, prices: updatedPrice};
        const initialSelectedAttributes = selectedProduct.product.attributes.map(elem => {

            return {

                id: elem.id,
                name: elem.name,
                type: elem.type,
                selected: {
                  id: elem.items[0].id,
                  value: elem.items[0].value
                }
      
            }

        })

        this.setState({

            product: updatedSelectedProduct,
            productLoaded: true,
            selectedAttributes: initialSelectedAttributes

        });
            

    }

    async componentDidUpdate(prevProps, prevState){

        const { selectedProductId, 
                selectedCurrency } = this.props;

        if(prevProps.selectedCurrency.label !== selectedCurrency.label) {

            const selectedProduct = await fetchQueryData(GET_PRODUCT_BY_ID, { productId: selectedProductId });
            const updatedPrice = selectedProduct.product.prices.filter(item => item.currency.label === selectedCurrency.label)[0];
            const updatedSelectedProduct = {...selectedProduct.product, prices: updatedPrice};

            this.setState({

                product: updatedSelectedProduct,
                productLoaded: true

            });

        }

    }

    onSelectedAttributesChange = (newAttribute) => {

        this.setState(({selectedAttributes}) => {

            const newSelectedAttributes = selectedAttributes.map(item => {

                if(item.id === newAttribute.id) {

                    return newAttribute;

                }

                return item;

            });

            return ({

                selectedAttributes: newSelectedAttributes

            });

        });

    }

    onViewPictureChange = (pictureIndex) => {

        this.setState({

            viewPictureIndex: pictureIndex

        });

    }
    
    render(){

        const { product,
                productLoaded,
                viewPictureIndex } = this.state;

        const { onProductDetailsPageOpening,
                large,
                onAddingProductToCart } = this.props;

        return (

            <div className="ProductDetailsPage">
                {productLoaded ? 

                    <div className="ProductDetailsPage__wrapper">
                        {product.gallery.length > 1 ?

                            /* ProductDetailsPage additional-pictures start */ 

                            <div className="ProductDetailsPage__additional-pictures-container">
                                
                                {product.gallery.map((item, i) => {

                                    if(i !== viewPictureIndex) {

                                        return (
                                            <img 
                                                key={i} 
                                                src={item} 
                                                alt={product.name + i} 
                                                className="productDetailsPage__additional-pictures"
                                                onClick={() => this.onViewPictureChange(i)} />
                                        )

                                    }

                                    return null;

                                })}
                                
                            </div>

                            /* ProductDetailsPage additional-pictures end */ 

                            :
                            null
                        }

                        {/* ProductDetailsPage picture start */}

                        <div className="ProductDetailsPage__picture-container">
                            <img 
                                src={product.gallery[viewPictureIndex]}
                                alt={product.name}
                                className="ProductDetailsPage__picture"
                                onClick={() => onProductDetailsPageOpening()}/>
                        </div>

                        {/* ProductDetailsPage picture end */}

                        {/* ProductDetailsPage content start*/}

                        <div className="ProductDetailsPage__content">
                            <div className={`ProductDetailsPage__brand`}>
                                {product.brand}
                            </div>    
                            <div className={`ProductDetailsPage__name`}>
                                {product.name}
                            </div>
                            {
                                product.attributes.map((item, i) => {

                                    return (

                                        <React.Fragment key={i}>
                                            <CartItemAttributesName large={large}>
                                                {item.name}:
                                            </CartItemAttributesName>
                                            <CartItemAttributesList type={item.type} large={large}>
                                                {item.items.map(elem => {

                                                    const sameAttributeIndex = this.state.selectedAttributes.findIndex(attr => attr.id === item.id);
                                                    const selectedClass = 
                                                            this.state.selectedAttributes[sameAttributeIndex].selected.value === elem.value ? 
                                                            "selected" : "";

                                                    return (
                                                        <li 
                                                            key={elem.id}
                                                            className={selectedClass}
                                                            style={{"backgroundColor": item.type === "swatch" ? elem.value : null}}
                                                            onClick={() => {

                                                                this.onSelectedAttributesChange({

                                                                    id: item.id,
                                                                    name: item.name,
                                                                    type: item.type,
                                                                    selected: {
                                                                        id: elem.id,
                                                                        value: elem.value
                                                                    }

                                                                });

                                                            }}>
                                                                {item.type === "text" ? elem.value : null}
                                                        </li>
                                                    );

                                                })}
                                            </CartItemAttributesList>
                                        </React.Fragment>

                                    );

                                })
                            }                
                            <div className="ProductDetailsPage__cost">
                                <span>PRICE:</span> <br></br> <br></br>
                                {product.prices.currency.symbol + product.prices.amount}
                            </div>
                            <button 
                                className="ProductDetailsPage__add-to-cart"
                                onClick={() => {

                                    onAddingProductToCart({
                                        id: product.id,
                                        name: product.name,
                                        brand: product.brand,
                                        gallery: product.gallery,
                                        fullAttributes: product.attributes,
                                        price: product.prices
                                    }, this.state.selectedAttributes);

                                }}
                                disabled={product.inStock ? false : true}>
                                Add to cart
                            </button>
                            <div className="ProductDetailsPage__description"
                                dangerouslySetInnerHTML={{__html: product.description}}
                                >
                            </div>
                        </div>

                        {/* ProductDetailsPage content end*/}

                    </div>
                    :
                    null
                }
            </div>

        );

    }

}