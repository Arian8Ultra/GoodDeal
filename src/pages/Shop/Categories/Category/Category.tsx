import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { GET_PRODUCTS_BY_CATEGORY } from "../../../../GraphQL/QueryProducts";
import ProductCard from "../../../../components(app)/Products/ProductCard";
import { Box } from "@mui/material";

const Category = () => {
  const { categoryId } = useParams();
  const { shopId } = useParams();

  const { loading, error, data } = useQuery(
    GET_PRODUCTS_BY_CATEGORY,
    {
      variables: {
        categoryId: categoryId && parseInt(categoryId),
        take: 100,
        skip: 0,
      },
      onCompleted(data) {
        console.log(data);
      },
      onError(error) {
        console.log(error);
      },
    }
  );
  return (
    <Box
      display={"grid"}
      gridTemplateColumns={{
        xs: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
        xl: "repeat(5, 1fr)",
      }}
      gap={'1rem'}
      padding={"1rem"}
    >
      {data &&
        data.product_getProducts.result.items.map((product: any) => (
          <ProductCard
            id={product.id}
            title={product.name}
            price={product.price}
            isApproved={product.isApproved}
            unit={product.unit}
          />
        ))}
    </Box>
  );
};

export default Category;
