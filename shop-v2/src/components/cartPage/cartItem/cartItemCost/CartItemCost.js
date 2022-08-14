import styled from "styled-components";

const CartItemCost = styled.div`
${(props) => {
    return props.large ?
        `
        margin-top: 20px;
        width: 52px;
        height: 26px;
        font-weight: 700;
        font-size: 24px;
        line-height: 24px;
        text-align: right;`
        : `
        width: 52px;
        height: 26px;
        font-weight: 500;
        text-align: right;`
    }
}
`;

export default CartItemCost;