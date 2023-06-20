import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
mutation product_addProduct(
    $name: String!
    $categoryId: Int!
    $unit: String!
    $description: String!
) {
    product_addProduct(input: {
        name: $name
        categoryId: $categoryId
        unit : $unit
        description: $description
    }){
        result{
            name
            unit
            description
            categoryId
            id
        }
        status{
            code
            value
        }
    }
}
`