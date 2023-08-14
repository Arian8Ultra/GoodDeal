import { useQuery } from "@apollo/client";
import { Box } from "@mui/material";
import { lazy, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  GET_SHOP_CATEGORY
} from "../../../GraphQL/QueriesShop";
import Title from "../../../components(app)/Title";
const CategoryCard = lazy(() => import("../../../components(app)/Category/CategoryCard"));

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const { shopId, categoryId } = useParams();
  const shop = useLocation().state?.store;

  const { loading, error } = useQuery(GET_SHOP_CATEGORY, {
    variables: {
      id: shopId,
    },
    onCompleted: (data) => {
      console.log(data);
      setCategories(data.shop_getCategories.result.items);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  return (
    <Box>
      <Title title="دسته بندی ها"/>
    <Box
      display={"grid"}
      gridTemplateColumns={{
        xs: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
        xl: "repeat(5, 1fr)",
      }}
      gap={"2rem"}
      justifyContent={"center"}
      alignItems={"center"}
      padding={"1rem"}
    >
      {shop?.shopCategories?.map((category: any) => (
        // <Box key={category.category.id}>
        //     <h1>{category.category.title}</h1>
        // </Box>
        <CategoryCard
          imageName={category.category.imageName}
          title={category.category.title}
          id={category.category.id}
          key={category.category.id}
        />
      ))}
    </Box>
    </Box>
  );
};

export default Categories;
