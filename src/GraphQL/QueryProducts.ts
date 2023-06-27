import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
query poducts_getProducts($take: Int, $skip: Int){
    product_getProducts{
        result(take: $take, skip: $skip){
            items{
                id
                name
                unit
                categoryId
            }
            pageInfo{
                hasNextPage
                hasPreviousPage
            }
            totalCount
        }
        status
    }
}
`


export const GET_PRODUCTS_BY_CATEGORY = gql`
query poducts_getProductsByCategory($take: Int, $skip: Int, $categoryId: Int){
    product_getProducts{
        result(take: $take, skip: $skip, where: {categoryId: {eq: $categoryId}}){
            items{
                id
                name
                unit
                categoryId
            }
            pageInfo{
                hasNextPage
                hasPreviousPage
            }
            totalCount
        }
        status
    }
}`