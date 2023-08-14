/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import NewModal from "../../components/Modals";
import {
  Red,
  RedLight,
  background,
  primary,
} from "../../theme/Colors";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_GALLERY } from "../../GraphQL/QueriesGallery";
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Pagination,
  Stack,
} from "@mui/material";
import { IMAGE_URL } from "../../../config";
import { DeleteForever } from "@mui/icons-material";
import { DELETE_PHOTO } from "../../GraphQL/MutationGallery";
import FileButton from "../../components/FileButton";
import { usePersistStore } from "../../stores/PersistStore";
import { UPLOAD_FILE } from "../../api/api";
interface GalleryModalProps {
  open: boolean;
  onClose: () => void;
  setId: (id: string) => void;
  setName: (name: string) => void;
  setPhoto: (photo: any) => void;
}
const GalleryModal = ({
  open,
  onClose,
  setId,
  setName,
  setPhoto,
}: GalleryModalProps) => {
  const [page, setPage] = React.useState(1);
  const token = usePersistStore((state) => state.token);
  const { data, loading, error, refetch } = useQuery(
    GET_ALL_GALLERY,
    {
      variables: {
        take: 12,
        skip: (page - 1) * 12,
      },
    }
  );

  const [deletePhoto] = useMutation(DELETE_PHOTO, {
    onCompleted(data) {
      console.log(data);
      alert("عکس با موفقیت حذف شد");
      refetch();
    },
    onError(error) {
      console.log(error);
      alert("عکس حذف نشد");
    },
  });

  useEffect(() => {
    refetch({
      skip: (page - 1) * 12,
    });
  }, [page, refetch]);

  return loading ? (
    <div>loading...</div>
  ) : error ? (
    <div>error</div>
  ) : (
    <NewModal
      name="گالری"
      open={open}
      onClose={onClose}
      backgroundColor={background}
      isCloseable={true}
      color={primary}
      height={"80vh"}
      width={{
        xs: "100%",
        sm: "100%",
        md: "70%",
        lg: "60%",
        xl: "50%",
      }}
    >
      <Stack width={"100%"}>
        <FileButton
          width={"10%"}
          position={"relative"}
          borderRadius={"15px"}
          setFiles={(files: any) => {
            console.log(files);
            UPLOAD_FILE({
              file: files && files[0],
              token: token,
              onSuccess: (res: any) => {
                console.log(res);
                refetch();
              },
              onFail: (err: any) => {
                console.log(err);
              },
            });
          }}
          text="آپلود تصویر"
        />

        <ImageList
          variant="masonry"
          cols={4}
          gap={8}
          sx={{
            // outline: '2px solid #ccc',
            width: "100%",
            overflowX: "hidden",
          }}
        >
          {data?.photoGallery_getPhotos?.result?.items?.map(
            (item: { name: string; id: string }) => (
              <ImageListItem
                key={item.id}
                sx={{
                  borderRadius: "15px",
                  overflow: "hidden",
                  cursor: "pointer",
                  border: "1px solid #ccc",
                  width: "100%",
                  position: "relative",
                }}
              >
                <img
                  src={`${IMAGE_URL}/${item.name}`}
                  srcSet={`${IMAGE_URL}/${item.name}`}
                  alt={item.name}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  onClick={() => {
                    console.log(item.name);
                    setId(item.id);
                    setName(item.name);
                    setPhoto(item);
                    onClose();
                  }}
                />
                <ImageListItemBar
                  position="below"
                  title={item.name}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    top: "0.5rem",
                    backgroundColor: Red,
                    "&:hover": {
                      backgroundColor: RedLight,
                    },
                  }}
                  onClick={() => {
                    deletePhoto({
                      variables: {
                        id: item.id,
                      },
                    });
                  }}
                >
                  <DeleteForever sx={{ color: "white" }} />
                </IconButton>
              </ImageListItem>
            )
          )}
        </ImageList>
        <Pagination
          count={
            Math.ceil(data?.photoGallery_getPhotos?.result?.totalCount / 12)
          }
          page={page}
          onChange={(e, value) => {
            setPage(value);
          }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "1rem",
          }}
        />
      </Stack>
    </NewModal>
  );
};

export default GalleryModal;
