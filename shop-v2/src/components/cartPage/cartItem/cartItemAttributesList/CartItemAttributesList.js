import styled from "styled-components";

const CartItemAttributesList = styled.ul`
    ${(props) => {

        const common = `
            margin-top: 8px;
            list-style-type: none;
            display: grid;
            grid-template-columns: repeat(4, auto);
            
            li:nth-child(n + 5) {
                margin-top: 8px;
            }
            
            li:nth-child(n + 2) {
                margin-left: 8px;
            }
            
            li:nth-child(4n + 1) {
                margin-left: 0px;
            }
            `
        const size = props.large ?
            `
            grid-template-columns: repeat(4, 80px);
            grifd-auto-rows: 350px;
            
            li {
                display: flex;
                flex-basis: 63px;
                align-items: center;
                justify-content: center;
                width: auto;
                height: 45px;
                font-family: 'Source Sans Pro';
                font-weight: 400;
                font-size: 16px;
                line-height: 18px;            
                cursor: pointer;
                border: 1px solid black;                
            }`
            :`
            li {    
                display: flex;
                flex-basis: 24px;
                justify-content: center;
                align-items: center;
                width: auto;
                height: 24px;
                font-family: 'Source Sans Pro';
                font-weight: 400;
                font-size: 14px;
                line-height: 160%;
                cursor: pointer;
                border: 1px solid black;                
            }`;

        const type = 
                props.type === "text" ?
                `li:hover {
                    color: white;
                    background-color: #1D1F22;
                }
                li.selected {
                    color: white;
                    background-color: #1D1F22;                
                }`
                : props.type === "swatch" ?
                `
                li:hover {
                    border: 1px solid #5ECE7B;
                }
                li.selected {
                    border: 1px solid #5ECE7B;
                }`
                : null;

        return common + size + type;

        }
    }
`;

export default CartItemAttributesList;