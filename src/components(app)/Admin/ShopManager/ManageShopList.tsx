/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AddBusinessRounded,
  DeleteRounded,
  MenuRounded,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import IButton from "../../../components/IButton";
import useLayoutStore from "../../../stores/layoutStore";
import {
  Red,
  onPrimary,
  primary,
  primaryLight,
} from "../../../theme/Colors";
import {
  DELETE_SHOP,
  DELETE_SHOP_CATEGORY,
} from "../../../GraphQL/MutationShop";
import { useMutation, useQuery } from "@apollo/client";
import NewModal from "../../../components/Modals";
import CategoryList from "../CategoryManager/CategoryList";
import { GET_CATEGORIES } from "../../../GraphQL/QueriesShop";
import ShopCategoryList from "./ShopCategoryList";

interface Props {
  children?: React.ReactNode;
  id?: string;
  className?: string;
  stores?: any;
  style?: React.CSSProperties;
  addCategoryModal?: {
    open: boolean;
    id: string;
  };
}

const ManageShopList = (props: Props) => {
  const stores = props.stores ? props.stores : [];
  const [addCategoryModal, setAddCategoryModal] = React.useState({
    open: false,
    id: "",
    shopCategories: [],
  });
  const [categories, setCategories] = React.useState([]);
  const changePageName = useLayoutStore(
    (state) => state.changePageName
  );
  const [deleteShop] = useMutation(DELETE_SHOP);
  const [deleteCategory] = useMutation(DELETE_SHOP_CATEGORY);

  const { loading, error, data, refetch } = useQuery(GET_CATEGORIES, {
    onCompleted: (data) => {
      console.log(data);
      setCategories(data.category_getCategories.result.items);
    },
  });
  const navigate = useNavigate();
  return (
    <Stack width={"100%"} spacing={"1rem"}>
      <Box
        display={"grid"}
        gridTemplateColumns={"repeat(5, 1fr)"}
        gap={"1rem"}
      >
        <Typography textAlign={"center"} gridColumn={"1/2"}>
          نام فروشگاه
        </Typography>
        <Typography textAlign={"center"} gridColumn={"2/5"}>
          آدرس
        </Typography>
        <Typography textAlign={"center"}>عملیات ها</Typography>
      </Box>

      {stores.map((store: any) => (
        <Box
          display={"grid"}
          key={store.id}
          gridTemplateColumns={"repeat(5, 1fr)"}
          gap={"1rem"}
          padding={"0.5rem"}
          alignItems={"center"}
          sx={{
            border: "1px solid #ccc",
            borderRadius: "1rem",
            background: "rgba(255,255,255,0.3)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Typography textAlign={"center"} gridColumn={"1/2"}>
            {store.name}
          </Typography>
          <Typography textAlign={"center"} gridColumn={"2/5"}>
            {store.fullAddress}
          </Typography>
          <Box
            display={"flex"}
            justifyContent={"end"}
            alignItems={"center"}
            width={"100%"}
            gap={"1rem"}
          >
            <IButton
              backgroundColor={Red}
              hoverColor={"#ff0000"}
              fun={() => {
                deleteShop({
                  variables: {
                    id: store.id,
                  },
                  onCompleted(data, clientOptions) {
                    console.log(data);
                    alert("فروشگاه با موفقیت حذف شد");
                    window.location.reload();
                  },
                  onError(err) {
                    console.log(err);
                    alert("مشکلی در حذف فروشگاه به وجود آمده است");
                  },
                });
              }}
            >
              <DeleteRounded
                sx={{
                  color: "white",
                }}
              />
            </IButton>
            <IButton
              backgroundColor={primary}
              hoverColor={primaryLight}
              fun={() => {
                setAddCategoryModal({
                  open: true,
                  id: store.id,
                  shopCategories: store.shopCategories,
                });
                console.log(store.shopCategories);
              }}
            >
              <AddBusinessRounded
                sx={{
                  color: "white",
                }}
              />
            </IButton>
          </Box>
        </Box>
      ))}
      <NewModal
        open={addCategoryModal.open}
        onClose={() =>
          setAddCategoryModal({
            open: false,
            id: "",
            shopCategories: [],
          })
        }
        name={"افزودن دسته بندی"}
        backgroundColor={onPrimary}
        height={"80dvh"}
        isCloseable={true}
        color={primary}
        width={{
          xs: "100%",
          sm: "80%",
          md: "50%",
        }}
      >
        <Stack
          width={"100%"}
          height={"100%"}
          spacing={"1rem"}
          padding={"1rem"}
          sx={{
            overflowY: "auto",
          }}
        >
          <Typography textAlign={"center"}>
            دسته بندی های فروشگاه
          </Typography>
          {addCategoryModal.shopCategories.map((category: any) => (
            <Box
              display={"grid"}
              gridTemplateColumns={"repeat(2, 1fr)"}
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
              <Typography textAlign={"center"}>
                {category.category.title}
              </Typography>

              <Box
                width={"100%"}
                display={"flex"}
                justifyContent={"end"}
              >
                <IButton
                  backgroundColor={Red}
                  hoverColor={"#ff0000"}
                  fun={() => {
                    deleteCategory({
                      variables: {
                        id: category.category.id,
                      },
                      onCompleted(data, clientOptions) {
                        console.log(data);
                        alert("دسته بندی با موفقیت حذف شد");
                      },
                      onError(err) {
                        console.log(err);
                        alert(
                          "مشکلی در حذف دسته بندی به وجود آمده است"
                        );
                      },
                    });
                  }}
                >
                  <DeleteRounded
                    sx={{
                      color: "white",
                    }}
                  />
                </IButton>
              </Box>
            </Box>
          ))}
        </Stack>
        <ShopCategoryList
          categories={categories}
          shopId={addCategoryModal.id}
        />
      </NewModal>
    </Stack>
  );
};

export default ManageShopList;
