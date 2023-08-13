/* eslint-disable @typescript-eslint/no-empty-function */
import { useMutation } from "@apollo/client";
import { Image, Stack } from "@chakra-ui/react";
import {
  AddRounded,
  DeleteRounded,
  EditRounded,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import { IMAGE_URL } from "../../../../config";
import {
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
} from "../../../GraphQL/MutationShop";
import IButton from "../../../components/IButton";
import {
  Green,
  Red,
  background,
  primary,
  primaryLight,
} from "../../../theme/Colors";
import NewModal from "../../../components/Modals";
import TextInput from "../../../components/TextInput";
import LinkButton from "../../../components/LinkButton";
import GalleryModal from "../../Gallery/GalleryModal";

interface Props {
  categories: {
    id: number;
    title: string;
    imageName: string;
  }[];

  children?: React.ReactNode;
}
const CategoryList = (props: Props) => {
  // console.log(props.categories);

  const [editModal, setEditModal] = React.useState({
    open: false,
    name: "",
    imageName: "",
    id: 0,
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
  const [image, setImage] = React.useState({
    name: "",
    id: "",
  });
  const [deleteCategory, { loading }] = useMutation(DELETE_CATEGORY);
  const [updateCategory, { loading: updateLoading }] = useMutation(
    UPDATE_CATEGORY,
    {
      variables: {
        id: editModal.id,
        title: editModal.name,
        imageName: editModal.imageName,
      },
      onCompleted() {
        alert("دسته بندی با موفقیت ویرایش شد");
        setEditModal({
          open: false,
          name: "",
          imageName: "",
          id: 0,
        });
        // window.location.reload();
      }
    }
  );
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
            src={`${
              import.meta.env.REACT_APP_IMAGE_URL || IMAGE_URL
            }${category.imageName}`}
            loading="lazy"
            alt={category.title}
          />
          <Box
            display={"flex"}
            justifyContent={"end"}
            alignItems={"center"}
            width={"100%"}
            gap={2}
          >
            <IButton
              backgroundColor={Red}
              hoverColor={"#ff0000"}
              fun={() => {
                confirm("آیا از حذف این دسته بندی اطمینان دارید؟") &&
                  deleteCategory({
                    variables: {
                      id: category.id,
                    },
                    refetchQueries: ["GetCategories"],
                    onCompleted(data, clientOptions) {
                      console.log(data);
                      window.location.reload();
                    },
                    onError(err) {
                      console.log(err);
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
                setEditModal({
                  ...editModal,
                  open: true,
                  name: category.title,
                  imageName: category.imageName,
                  id: category.id,
                });
              }}
            >
              <EditRounded
                sx={{
                  color: "white",
                }}
              />
            </IButton>
          </Box>
        </Box>
      ))}

      <NewModal
        name="ویرایش دسته بندی"
        backgroundColor={background}
        color={primary}
        open={editModal.open}
        onClose={() => {
          setEditModal({
            ...editModal,
            open: false,
          });
        }}
        isCloseable={true}
        height={"80vh"}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
          height={"100%"}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
            height={"100%"}
          >
            {/* <Typography
              variant={"h6"}
              paddingX={"1rem"}
              sx={{
                alignSelf: "center",
              }}
            >
              {editModal.name}
            </Typography> */}
            <TextInput
              value={editModal.name}
              getText={(e: { target: { value: any } }) => {
                setEditModal({
                  ...editModal,
                  name: e.target.value,
                });
              }}
              label={"نام دسته بندی"}
            />

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
              تغییر عکس از گالری
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
                setEditModal({
                  ...editModal,
                  imageName: photo.name,
                });
              }}
            />

            <Image
              w={"50%"}
              aspectRatio={"1/1"}
              src={`${
                import.meta.env.REACT_APP_IMAGE_URL || IMAGE_URL
              }${editModal.imageName}`}
              loading="lazy"
              alt={editModal.name}
            />
            <LinkButton
              onClick={() => {
                updateCategory();
              }}
              backgroundColor={primary}
              icon={<EditRounded />}
              margin={"1rem"}
              width={"max-content"}
            >
              ویرایش دسته بندی
            </LinkButton>
          </Box>
        </Box>
      </NewModal>
    </Stack>
  );
};

export default CategoryList;
