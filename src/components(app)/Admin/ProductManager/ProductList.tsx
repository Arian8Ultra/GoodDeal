import { Stack } from "@chakra-ui/react";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import LinkButton from "../../../components/LinkButton";
import { AddRounded, DeleteRounded } from "@mui/icons-material";
import {
  Green,
  Red,
  onPrimary,
  primary,
} from "../../../theme/Colors";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../../GraphQL/QueryProducts";
import NewModal from "../../../components/Modals";
import { GET_CATEGORIES } from "../../../GraphQL/QueriesShop";
import TextInput from "../../../components/TextInput";
import Selector from "../../../components/Selector";
import { Link } from "react-router-dom";
import { ADD_PRODUCT, DELETE_PRODUCT } from "../../../GraphQL/MutationProduct";
import IButton from "../../../components/IButton";

const ProductList = () => {
  const [addModal, setAddModal] = useState({
    open: false,
    name: "",
    categoryId: -1,
    unit: "",
    description: "",
  });

  const [categories, setCategories] = useState([]);
  const [deleteProduct]=useMutation(DELETE_PRODUCT)
  const { data, loading, error,refetch} = useQuery(GET_PRODUCTS, {
    onCompleted(data) {
      console.log(data);
    },
    onError(error) {
      console.log(error);
    },
  });

  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(GET_CATEGORIES, {
    onCompleted: (data) => {
      console.log(data);
      setCategories(
        data.category_getCategories.result?.items.map(
          (item: { id: any; title: any }) => {
            return { id: item.id, name: item.title };
          }
        )
      );
    },
    onError(error) {
      console.log(error);
    },
    notifyOnNetworkStatusChange: true,
  });

  const [addProduct] = useMutation(ADD_PRODUCT, {
    variables: {
      name: addModal.name,
      categoryId: addModal.categoryId,
      unit: addModal.unit,
      description: addModal.description,
    },
    onCompleted(data) {
      console.log(data);
      alert("محصول با موفقیت اضافه شد");
      refetch();
    },
    onError(error) {
      console.log(error);
    },
  });
  return (
    <Stack
      spacing={8}
      bgColor={"rgba(255,255,255,0.5)"}
      padding={"2rem"}
      borderRadius={"25px"}
      alignItems={"center"}
      justifyContent={"center"}
      style={{
        backdropFilter: "blur(10px)",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"start"}
        alignItems={"center"}
        width={"100%"}
        my={"1rem"}
      >
        <LinkButton
          icon={<AddRounded />}
          width={"max-content"}
          backgroundColor={Green}
          onClick={() =>
            setAddModal({ ...addModal, open: !addModal.open })
          }
        >
          افزودن محصول
        </LinkButton>
      </Box>

      <Box
              display={"grid"}
              gridTemplateColumns={{
                xs: "repeat(3,1fr)",
                md: "repeat(4,1fr)",
              }}
              justifyContent={"center"}
              alignItems={"center"}
              width={"90%"}
              padding={"1rem"}
              borderRadius={"15px"}
              sx={{
                backgroundColor: "rgba(200,200,200,0.5)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 0 10px rgba(0,0,0,0.2)",

              }}
            >
              <Typography variant={"h6"} textAlign={'center'}>نام محصول</Typography>
              <Typography variant={"h6"} textAlign={'center'}>واحد</Typography>
              <Typography variant={"h6"} textAlign={'center'}>دسته بندی</Typography>
              <Typography variant={"h6"} textAlign={'center'}>عملیات ها</Typography>

            </Box>

      {data &&
        data.product_getProducts.result?.items?.map(
          (item: {
            id: any;
            name: any;
            description: any;
            unit: any;
            categoryId: any;
          }) => (
            <Box
              display={"grid"}
              gridTemplateColumns={{
                xs: "repeat(3,1fr)",
                md: "repeat(4,1fr)",
                lg: "repeat(4,1fr)",
              }}
              justifyContent={"center"}
              alignItems={"center"}
              width={"90%"}
              sx={{
                backgroundColor: "rgba(255,255,255,0.5)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 0 10px rgba(0,0,0,0.2)",

              }}
              padding={"1rem"}
              borderRadius={"15px"}
            >
              <Typography variant={"h6"}>{item.name}</Typography>
              <Typography variant={"h6"}textAlign={'center'}>{item.unit}</Typography>
              <Typography variant={"h6"}textAlign={'center'}>
                {item.categoryId}
              </Typography>
              <Box
                display={"flex"}
                justifyContent={"end"}
                alignItems={"center"}
              >
                <IButton
                  backgroundColor={Red}
                  hoverColor={"#ff0000"}
                  fun={() =>
                    confirm("آیا از حذف این محصول اطمینان دارید؟") &&
                    deleteProduct({
                      variables:{
                        id:item.id
                      },
                      onCompleted(data){
                        console.log(data)
                        refetch()
                      },
                      onError(error){
                        console.log(error)
                      }
                    })
                  }
                >
                  <DeleteRounded sx={{
                    color: "white",
                  }} />
                </IButton>
              </Box>
            </Box>
          )
        )}

      <NewModal
        backgroundColor={onPrimary}
        isCloseable={true}
        open={addModal.open}
        onClose={() => setAddModal({ ...addModal, open: false })}
        name={"افزودن محصول"}
        color={primary}
        width={{
          xs: "90%",
          md: "80%",
          lg: "50%",
        }}
        height={"80dvh"}
      >
        <Stack width={"100%"}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            width={"100%"}
          >
            <Typography variant={"h6"}>نام محصول</Typography>
            <TextInput
              label="نام محصول"
              value={addModal.name}
              getText={(e: string) =>
                setAddModal({ ...addModal, name: e })
              }
              width={"100%"}
              fullWidth
            />
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            width={"100%"}
          >
            <Typography variant={"h6"}>توضیحات محصول</Typography>
            <TextInput
              label="توضیحات محصول"
              value={addModal.description}
              getText={(e: string) =>
                setAddModal({ ...addModal, description: e })
              }
              width={"100%"}
              fullWidth
            />
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            width={"100%"}
          >
            <Typography variant={"h6"}>واحد محصول</Typography>
            <TextInput
              label="واحد محصول"
              value={addModal.unit}
              getText={(e: string) =>
                setAddModal({ ...addModal, unit: e })
              }
              width={"100%"}
              fullWidth
            />
          </Box>

          <Box
            display={"flex"}
            flexDirection={"column"}
            width={"100%"}
          >
            <Typography variant={"h6"}>دسته بندی محصول</Typography>
            <Selector
              items={categories}
              itemType="object"
              label={"دسته بندی محصول"}
              getValue={(e: any) =>
                setAddModal({ ...addModal, categoryId: e })
              }
              valueOut="id"
            />
          </Box>

          <LinkButton
            width={"max-content"}
            backgroundColor={Green}
            onClick={addProduct}
          >
            افزودن محصول
          </LinkButton>
        </Stack>
      </NewModal>
    </Stack>
  );
};

export default ProductList;
