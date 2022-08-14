import styled from "styled-components";

const CartItemEssentials = styled.div`
    font-family: 'Raleway';
    font-style: normal;
    font-size: 16px;
    line-height: 160%;
    color: #1D1F22;
    ${(props) =>{
        return props.large ?
            `
            width: 950px;
            height: 300px;
            overflow-y: auto;
            overflow-x: hidden;
            `
            :`
            width: 155px;
            height: 190px;
            overflow-y: auto;
            overflow-x: hidden;
            `
        }
    }
`;

export default CartItemEssentials;