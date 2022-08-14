import styled from "styled-components";

const CartItemCounter = styled.div`
    ${(props) => {
        return props.large ?
            `
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            width: 45px;
            height: 288px;
            font-weight: 500;
            font-size: 16px;
            line-height: 160%;
            color: #1D1F22;
            
            p {
                font-family: 'Raleway';
                font-style: normal;
                font-weight: 500;
                font-size: 24px;
                line-height: 160%;            
            }

            button {
                flex-direction: row;
                width: 45px;
                height: 45px;
                border: 1px solid #1D1F22;
                background-color: #fff;
            }
            `
            : `
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            width: 24px;
            height: 190px;
            font-weight: 500;
            font-size: 16px;
            line-height: 160%;
            color: #1D1F22;

            p {
                font-family: 'Raleway';
                font-style: normal;
                font-weight: 500;
                font-size: 16px;
                line-height: 160%;        
            }

            button {
                flex-direction: row;
                width: 24px;
                height: 24px;
                border: 1px solid #1D1F22;
                background-color: #fff;
            }`
        }
    }

    button:hover {
        color: #FFFFFF;
        background-color: #1D1F22;
    }
`;

export default CartItemCounter;