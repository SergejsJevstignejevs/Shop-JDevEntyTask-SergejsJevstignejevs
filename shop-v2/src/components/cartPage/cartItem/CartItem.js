import React from "react";

import CartItemEssentials from "./cartItemEssentials/CartItemEssentials";
import CartItemName from "./cartItemName/CartItemName";
import CartItemCost from "./cartItemCost/CartItemCost";
import CartItemAttributesName from "./cartItemAttributesName/CartItemAttributesName";
import CartItemAttributesList from "./cartItemAttributesList/CartItemAttributesList";
import CartItemCounter from "./cartItemCounter/CartItemCounter";
import CartItemPicture from "./cartItemPicture/CartItemPicture";

import './CartItem.css';

export default class CartItem extends React.Component {

    state = {
        pictureOrderNum: 0        
    }

    onPictureChange = (direction, maxOrderNum) => {

        if(direction === "left") {

            this.setState(({pictureOrderNum}) => ({

                pictureOrderNum: (pictureOrderNum - 1) >= 0 ? (pictureOrderNum - 1) : (maxOrderNum - 1)

            }));

        }

        if(direction === "right") {

            this.setState(({pictureOrderNum}) => ({

                pictureOrderNum: (pictureOrderNum + 1) % maxOrderNum

            }));

        }

    }
  
    render(){

        const { onAddingProductToCart,
                onDeletingProductFromCart,
                large } = this.props;

        const { id,
                name,
                brand,
                price,
                gallery,
                count,
                selectedAttributes,
                fullAttributes } = this.props.product;

        const attributesElements = fullAttributes.map((item, i) => {

            return (

                <React.Fragment key={i}>
                    <CartItemAttributesName large={large}>
                        {item.name}:
                    </CartItemAttributesName>
                    <CartItemAttributesList type={item.type} large={large}>
                        {item.items.map(elem => {

                            const sameAttributeIndex = selectedAttributes.findIndex(attr => attr.id === item.id);
                            const selectedClass = 
                                    selectedAttributes[sameAttributeIndex].selected.value === elem.value ? 
                                    "selected" : "";

                            return (
                                <li 
                                    key={elem.id}
                                    className={selectedClass}
                                    style={{"backgroundColor": item.type === "swatch" ? elem.value : null}}>
                                        {item.type === "text" ? elem.value : null}
                                </li>
                            );

                        })}
                    </CartItemAttributesList>
                </React.Fragment>

            );

        });
            
        return (

            <div className={!large ? "CartItem" : "CartItemLarge"}>
                <CartItemEssentials large={large}>
                    <CartItemName large={large}>
                        <p className="brand">{brand}</p>
                        <p className="name">{name}</p> 
                    </CartItemName>
                    <CartItemCost large={large}>{price.currency.symbol + parseFloat(price.amount * count).toFixed(2)}</CartItemCost>
                    {attributesElements}
                </CartItemEssentials>
                <CartItemCounter large={large}>
                    <button
                        onClick={() => onAddingProductToCart(this.props.product, selectedAttributes)}>+</button>
                    <p>{count}</p>
                    <button
                        onClick={() => onDeletingProductFromCart(id, selectedAttributes)}>-</button>
                </CartItemCounter>
                <CartItemPicture large={large}>
                    <img src={gallery[this.state.pictureOrderNum]} alt={name} />
                    {large ? 
                        <div className="picture-change">
                            <button 
                                className="picture-change-left"
                                onClick={() => this.onPictureChange("left", gallery.length)}></button>
                            <button 
                                className="picture-change-right"
                                onClick={() => this.onPictureChange("right", gallery.length)}></button>
                        </div>
                        : null
                    }             
                </CartItemPicture>
            </div>

        );

    }

}