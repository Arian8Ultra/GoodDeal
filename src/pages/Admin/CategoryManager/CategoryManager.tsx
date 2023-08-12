/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMutation, useQuery } from "@apollo/client";
import { Center, Image, Stack } from "@chakra-ui/react";
import { AddRounded } from "@mui/icons-material";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { IMAGE_URL } from "../../../../config";
import { ADD_CATEGORY } from "../../../GraphQL/MutationShop";
import { GET_CATEGORIES } from "../../../GraphQL/QueriesShop";
import CategoryList from "../../../components(app)/Admin/CategoryManager/CategoryList";
import GalleryModal from "../../../components(app)/Gallery/GalleryModal";
import LinkButton from "../../../components/LinkButton";
import NewModal from "../../../components/Modals";
import TextInput from "../../../components/TextInput";
import { usePersistStore } from "../../../stores/PersistStore";
import { Green, onPrimary, primary } from "../../../theme/Colors";

const CategoryManager = () => {
  const [thumbnail, setThumbnail] = React.useState();
  const [image, setImage] = React.useState({
    name: "",
    id: "",
  });
  const [addModal, setAddModal] = React.useState({
    open: false,
    title: "",
    imageName: "",
  });
  const [galleryModal, setGalleryModal] = React.useState({
    open: false,
    id: "",
    name: "",
    photo: {
      name: "",
      id: "",
    },
  });
  // const token = usePersistStore((state) => state.token);
  const [categories, setCategories] = React.useState([]);

  const { refetch } = useQuery(GET_CATEGORIES, {
    onCompleted: (data) => {
      // console.log(data);
      setCategories(data.category_getCategories.result.items);
    },
  });

  const [addCategory] = useMutation(ADD_CATEGORY, {
    onCompleted() {
      // console.log(data);
      alert("دسته بندی با موفقیت اضافه شد");
      setAddModal({
        open: false,
        imageName: "",
        title: "",
      });
      // @ts-ignore
      setThumbnail([]);
      refetch();
    },
    onError(error) {
      console.log(error);
      alert("دسته بندی اضافه نشد");
    },
  });

  useEffect(() => {
    console.log(galleryModal.name);
  }, [galleryModal.name]);

  return (
    <Stack width={"100%"} alignItems={"center"}>
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

      <CategoryList categories={categories} />
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
          <LinkButton
            onClick={() => {
              setGalleryModal({
                ...galleryModal,
                open: !galleryModal.open,
              });
            }}
            backgroundColor={Green}
            icon={<AddRounded />}
            margin={"1rem"}
            width={"max-content"}
          >
            انتخاب از گالری
          </LinkButton>

          <GalleryModal
            open={galleryModal.open}
            onClose={() => {
              setGalleryModal({
                ...galleryModal,
                open: !galleryModal.open,
              });
            }}
            setId={(id: string) => {
              setGalleryModal({ ...galleryModal, id: id });
            }}
            setName={(name: string) => {
              setGalleryModal({ ...galleryModal, name: name });
            }}
            setPhoto={(photo: any) => {
              console.log(photo);
              setImage({ name: photo.name, id: photo.id });
              setGalleryModal({ ...galleryModal, photo: photo });
            }}
          />
          {thumbnail != null && (
            <Center>
              {image.name !== "" && (
                <Image
                  src={`${IMAGE_URL}/${image.name}`}
                  fit={"contain"}
                  borderRadius={"15px"}
                  width={"90%"}
                  border={`3px solid ${primary}`}
                  height={"400px"}
                />
              )}
            </Center>
          )}
          <Box width={"90%"}>
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
              addCategory({
                variables: {
                  imageName: image.name,
                  title: addModal.title,
                },
              });
              // UPLOAD_FILE({
              //   file: thumbnail && thumbnail[0],
              //   token: token,
              //   onSuccess: (res: any) => {
              //     console.log(res);
              //     addCategory({
              //       variables: {
              //         imageName: image.name,
              //         title: addModal.title,
              //       },
              //     });
              //   },
              //   onFail: (err: any) => {
              //     console.log(err);
              //   },
              // });
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
