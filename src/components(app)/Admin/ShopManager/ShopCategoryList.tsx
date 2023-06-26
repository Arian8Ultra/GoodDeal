import { Image, Stack } from "@chakra-ui/react";
import { Box, Typography } from "@mui/material";
import React from "react";
import { IMAGE_URL } from "../../../../config";
import IButton from "../../../components/IButton";
import {
  AddRounded,
  DeleteRounded,
  KeyRounded,
} from "@mui/icons-material";
import { Green, Red } from "../../../theme/Colors";
import { useMutation } from "@apollo/client";
import {
  ADD_SHOP_CATEGORY,
  DELETE_CATEGORY,
} from "../../../GraphQL/MutationShop";

interface Props {
  categories: {
    id: number;
    title: string;
    imageName: string;
  }[];
  shopId: string;

  children?: React.ReactNode;
}
const ShopCategoryList = (props: Props) => {
  const [addCategoryToShop, { loading }] = useMutation(
    ADD_SHOP_CATEGORY,
    {
      onCompleted(data, clientOptions) {
        console.log(data);
        alert("Category Added");
        window.location.reload();
      },
      onError(err) {
        console.log(err);
        alert("Category Not Added");
      },
    }
  );

  // const [deleteCategory,{loading}]= useMutation(DELETE_CATEGORY)

  return (
    <Stack
      width={"90%"}
      spacing={"1rem"}
      bgColor={"rgba(255,255,255,0.5)"}
      borderRadius={"25px"}
      justifyContent={"center"}
      alignItems={"center"}
      style={{
        backdropFilter: "blur(10px)",
      }}
    >
      <Typography textAlign={"center"}>
        دسته بندی های فروشگاه
      </Typography>
      {props.categories?.map((category) => (
        <Box
          display={"grid"}
          width={"100%"}
          gridTemplateColumns={"repeat(3, 1fr)"}
          gap={"1rem"}
          padding={"0.5rem"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{
            border: "1px solid #ccc",
            borderRadius: "1rem",
            background: "rgba(255,255,255,0.3)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Typography
            variant={"h6"}
            paddingX={"1rem"}
            sx={{
              alignSelf: "center",
            }}
          >
            {category.title}
          </Typography>
          <Image
            w={"30px"}
            aspectRatio={"1/1"}
            src={`${IMAGE_URL}${category.imageName}`}
            loading="lazy"
            alt={category.title}
          />
          <Box
            display={"flex"}
            justifyContent={"end"}
            alignItems={"center"}
            width={"100%"}
          >
            <IButton
              backgroundColor={Green}
              hoverColor={"#ff0000"}
              fun={() => {
                addCategoryToShop({
                  variables: {
                    shopId: props.shopId,
                    categoryId: category.id,
                  },
                });
              }}
            >
              <AddRounded
                sx={{
                  color: "white",
                }}
              />
            </IButton>
            {/* <IButton
                      backgroundColor={primary}
                      hoverColor={primaryLight}
                      fun={() => {
                        props.editUser && props.editUser(user);
                      }}
                    >
                      <EditRounded
                        sx={{
                          color: "white",
                        }}
                      />
                    </IButton> */}
          </Box>
        </Box>
      ))}
    </Stack>
  );
};

export default ShopCategoryList;
