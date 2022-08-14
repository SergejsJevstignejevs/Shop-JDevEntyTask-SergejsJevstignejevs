import styled from "styled-components";

const CartItemName = styled.div`
    ${(props) => {

            const large = props.large ?
                `
                p.brand {
                    height: 27px;
                    font-family: "Raleway";
                    font-weight: 600;
                    font-size: 30px;
                    line-height: 27px;
                    margin-bottom: 16px;
                }

                p.name {
                    height: 27px;
                    font-family: "Raleway";
                    font-weight: 400;
                    font-size: 30px;
                    line-height: 27px;
                }`
                : `
                p.brand {
                    color: #1D1F22;
                    height: 27px;
                    font-family: "Raleway";
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 160%;
                }

                p.name {
                    color: #1D1F22;
                    width: 136px;
                    height: 52px;
                    font-family: "Raleway";
                    font-weight: 300;
                    font-size: 16px;
                    line-height: 160%;
                }`

            return large;

        }

    }
`;

export default CartItemName;