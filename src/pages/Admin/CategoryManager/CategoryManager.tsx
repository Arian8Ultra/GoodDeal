/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Center, Image, Stack } from "@chakra-ui/react";
import { AddRounded } from "@mui/icons-material";
import { Box } from "@mui/material";
import React from "react";
import { UPLOAD_FILE } from "../../../api/api";
import CategoryList from "../../../components(app)/Admin/CategoryManager/CategoryList";
import FileButton from "../../../components/FileButton";
import LinkButton from "../../../components/LinkButton";
import NewModal from "../../../components/Modals";
import TextInput from "../../../components/TextInput";
import { usePersistStore } from "../../../stores/PersistStore";
import {
  Green,
  onPrimary,
  primary,
} from "../../../theme/Colors";
import { GET_CATEGORIES } from "../../../GraphQL/QueriesShop";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CATEGORY } from "../../../GraphQL/MutationShop";

const CategoryManager = () => {
  const [thumbnail, setThumbnail] = React.useState();
  const [addModal, setAddModal] = React.useState({
    open: false,
    title: "",
    imageName: "",
  });
  const token = usePersistStore((state) => state.token);
  const [categories, setCategories] = React.useState([]);

  const {loading, error, data,refetch} = useQuery(GET_CATEGORIES,{
    onCompleted: (data) => {
      console.log(data);
      setCategories(data.category_getCategories.result.items);
    }
  })


  const [addCategory] = useMutation(ADD_CATEGORY,{
    onCompleted(data, clientOptions) {
      console.log(data);
      alert('دسته بندی با موفقیت اضافه شد');
      setAddModal({
        open:false,
        imageName : '',
        title: ''
      })
      // @ts-ignore
      setThumbnail([])
      refetch();
    },
    onError(error) {
      console.log(error);
      alert('دسته بندی اضافه نشد');
    }
  })

  return (
    <Stack
      width={"100%"}
      alignItems={"center"}
    >
      <Box
        width={"100%"}
        display="flex"
        justifyContent="start"
        alignItems="start"
        flexDirection="row"
      >
        <LinkButton
          backgroundColor={Green}
          icon={<AddRounded />}
          margin={"1rem"}
          width={"max-content"}
          onClick={() => {
            setAddModal({ ...addModal, open: !addModal.open });
          }}
        >
          افزودن دسته بندی
        </LinkButton>
      </Box>

      <CategoryList categories={categories}/>
      <NewModal
        width={{
          xs: "90%",
          sm: "90%",
          md: "80%",
          lg: "60%",
          xl: "30%",
        }}
        name="افزودن دسته بندی"
        backgroundColor={onPrimary}
        height={"80dvh"}
        isCloseable={true}
        color={primary}
        open={addModal.open}
        onClose={() => {
          setAddModal({ ...addModal, open: !addModal.open });
        }}
      >
        <Stack
          spacing={20}
          width={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <FileButton
            pl={10}
            pr={10}
            width={"100%"}
            borderRadius={"15px"}
            setFiles={(files: any) => {
              setThumbnail(files);
              console.log(files);
              
            }}
            text="انتخاب تصویر"
          />
          {thumbnail != null && (
            <Center>
              <Image
                src={URL.createObjectURL(thumbnail[0])}
                fit={"contain"}
                borderRadius={"15px"}
                width={"90%"}
                border={`3px solid ${primary}`}
                height={"400px"}
              />
            </Center>
          )}
          <Box width={'90%'}>
            <TextInput
              width={"100%"}
              fullWidth={true}
              placeholder="نام دسته بندی"
              getText={(text: string) => {
                setAddModal({ ...addModal, title: text });
              }}
            />
          </Box>
          <LinkButton
            backgroundColor={Green}
            icon={<AddRounded />}
            margin={"1rem"}
            width={"max-content"}
            onClick={() => {
              console.log(thumbnail);
              UPLOAD_FILE({
                file: thumbnail && thumbnail[0],
                token: token,
                onSuccess: (res: any) => {
                  console.log(res);
                  addCategory({
                    variables:{
                      imageName: res,
                      title: addModal.title
                    }
                  })
                },
                onFail: (err: any) => {
                  console.log(err);
                },
              });
            }}
          >
            افزودن دسته بندی
          </LinkButton>
        </Stack>
      </NewModal>
    </Stack>
  );
};

export default CategoryManager;
