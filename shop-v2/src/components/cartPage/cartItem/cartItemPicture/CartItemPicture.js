import styled from "styled-components";

import caretLeft from "../../../../resources/images/caretLeft.png";
import caretRight from "../../../../resources/images/caretRight.png";

const CartItemPicture = styled.div`
    ${(props) => {
        return props.large ?
            `
            display: flex;
            flex-wrap: wrap;
            margin-left: 8px;
            width: 200px;
            height: 288px;
            
            img {
                height: 288px;
                object-fit: cover;
                overflow: hidden;                
            }

            div.picture-change {
                position: absolute;
                display: flex;
                justify-content: space-between;
                width: 56px;
                height: 24px;
                margin-top: 248px;
                margin-left: 128px;

                button {
                    width: 24px;
                    height: 24px;
                    color: #ffffff;
                    background-color: #1D1F22BF;
                    border: none;
                }

                button.picture-change-left {
                    background-image: url(${caretLeft});
                    background-repeat: no-repeat;
                    background-position: center;
                }
                
                button.picture-change-right {
                    background-image: url(${caretRight});
                    background-repeat: no-repeat;
                    background-position: center;
                }

                button:hover{
                    background-color: #1D1F22F0;
                }                
            }`
            : `
            display: flex;
            flex-wrap: wrap;
            margin-left: 8px;
            width: 121px;
            height: 190px;
            
            img {
                height: 190px;
                object-fit: cover;
                overflow: hidden;                
            }`
        }
    }
`;

export default CartItemPicture;