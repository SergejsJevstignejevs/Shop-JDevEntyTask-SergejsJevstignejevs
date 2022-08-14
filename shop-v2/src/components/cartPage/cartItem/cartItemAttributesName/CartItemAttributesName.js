import styled from "styled-components";

const CartItemAttributesName = styled.p`
    ${(props) => {
        return props.large ?
            `
            margin-top: 8px;
            font-family: 'Roboto Condensed';
            font-style: normal;
            font-weight: 700;
            font-size: 18px;
            line-height: 18px;
            `
            :`
            margin-top: 8px;
            font-family: "Raleway";
            font-weight: 400;
            font-size: 14px;
            line-height: 16px;        
            `
        }
    }
`;

export default CartItemAttributesName;