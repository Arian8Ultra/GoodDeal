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




export const ADD_PRICE_RECORD = gql`
mutation priceRecord_addPriceRecord (
    $isApproved: Boolean!
    $price: Decimal!
    $productId: Int!
    $shopId: Int!
    $userId: String!

){
    priceRecord_addPriceRecord(input: {
        isApproved:$isApproved
        price:$price
        productId:$productId
        shopId:$shopId
        userId:$userId
    }){
        result{
            userId
            id
            isApproved
            price          
        }
        status{
            code
            value
        }
        __typename
    }
}`


export const DELETE_PRODUCT = gql`
mutation product_deleteProduct($id: Int!) {
    product_deleteProduct(entityId: $id){
        result{
            name
            unit
            description
        }
        status{
            code
            value
        }
    }
}`