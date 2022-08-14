import apolloClient from "../client/Client";
import { gql } from "@apollo/client/core"

const fetchQueryData = async (selectedQuery, selectedVariables = {}) => {

    const {data} = await apolloClient.query({
      query: selectedQuery, 
      variables: selectedVariables
    });

    return data;

}

const CATEGORY_NAMES = gql`
    query CATEGORY_NAMES {
        categories {
            name
        }
    }
`;

const PRODUCTS_BY_CATEGORY = gql`
    query PRODUCTS_BY_CATEGORY($title: String!) {
        category(input: {title: $title}) {
            products {
                id
                name
                brand
                inStock
                gallery
                description
                attributes {
                    id
                    name
                    type
                    items {
                        id
                        value
                        displayValue
                    }
                }
                prices {
                    currency {
                        label
                        symbol
                    }
                    amount
                }
            }
        }
    }
`;

const AVAILABLE_CURRENCIES = gql`
    query AVAILABLE_CURRENCIES {
        currencies {
            label
            symbol
        }
    }
`;

const GET_PRODUCT_BY_ID = gql`
    query SELECT_PRODUCT_BY_ID($productId: String!) {
        product(id: $productId) {
            id
            name
            brand
            inStock
            gallery
            description
            attributes {
                id
                name
                type
                items {
                    displayValue
                    value
                    id
                }
            }
            prices {
                currency {
                    label
                    symbol
                }
                amount
            }
        }
    }
`

export { fetchQueryData, 
         CATEGORY_NAMES, 
         PRODUCTS_BY_CATEGORY, 
         AVAILABLE_CURRENCIES,
         GET_PRODUCT_BY_ID };