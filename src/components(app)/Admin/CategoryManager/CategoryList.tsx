import { useMutation } from "@apollo/client";
import { Image, Stack } from "@chakra-ui/react";
import { DeleteRounded } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import { IMAGE_URL } from "../../../../config";
import { DELETE_CATEGORY } from "../../../GraphQL/MutationShop";
import IButton from "../../../components/IButton";
import { Red } from "../../../theme/Colors";

interface Props {
  categories: {
    id: number;
    title: string;
    imageName: string;
  }[];

  children?: React.ReactNode;
}
const CategoryList = (props: Props) => {
  console.log(props.categories);

  const [deleteCategory,{loading}]= useMutation(DELETE_CATEGORY)

  return (
    <Stack
      width={"90%"}
      spacing={8}
      bgColor={"rgba(255,255,255,0.5)"}
      padding={"2rem"}
      borderRadius={"25px"}
      justifyContent={"center"}
      alignItems={"center"}
      style={{
        backdropFilter: "blur(10px)",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
      }}
    >
      {props.categories?.map((category) => (
        <Box
          key={category.id}
          width={"100%"}
          display={"grid"}
          gridTemplateColumns={"repeat(3,1fr)"}
          boxShadow={"0 0 10px rgba(0,0,0,0.2)"}
          sx={{
            backgroundColor: "white",
          }}
          padding={"0.5rem"}
          borderRadius={"15px"}
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
            w={"50px"}
            aspectRatio={"1/1"}
            src={`${import.meta.env.REACT_APP_IMAGE_URL || IMAGE_URL}${category.imageName}`}
            loading="lazy"
            alt={category.title}
          />
          <Box
            display={"flex"}
            justifyContent={"end"}
            alignItems={"center"}
            width={"100%"}
          >
            <IButton backgroundColor={Red} hoverColor={"#ff0000"} fun={()=>{
              confirm("آیا از حذف این دسته بندی اطمینان دارید؟") &&
              deleteCategory({
                variables:{
                  id:category.id
                },
                refetchQueries: ["GetCategories"],
                onCompleted(data, clientOptions) {
                  console.log(data);
                  window.location.reload()
                },
                onError(err) {
                  console.log(err);
                }
              })
            }}>
              <DeleteRounded
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

export default CategoryList;
