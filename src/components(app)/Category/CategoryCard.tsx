import { Center, Image } from "@chakra-ui/react";
import { Box, Typography } from "@mui/material";
import React from "react";
import { IMAGE_URL } from "../../../config";
import { primary, secondary } from "../../theme/Colors";
import { useLocation, useNavigate, useParams } from "react-router-dom";
interface Props {
  children?: React.ReactNode;
  title?: string;
  id?: string;
  imageName?: string;
}

const CategoryCard = (props: Props) => {
    const { shopId } = useParams();
    const navigate = useNavigate();
    const shop = useLocation().state?.store;

  return (
      <Center
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        position={"relative"}
        border={`1px solid ${primary}`}
        boxShadow={"0 0 5px #ccc"}
        height={"100%"}
        sx={{
          aspectRatio: "1/1",
        }}
        borderRadius={"25px"}
        onClick={() => {
            navigate(`category/${props.id}`, { state: { store: shop } });
        }}
      >
        <Image
          src={`${import.meta.env.REACT_APP_IMAGE_URL || IMAGE_URL}${props.imageName}`}
          loading="lazy"
          alt={props.title}
          width={"70%"}
          height={"70%"}
          objectFit={"contain"}
          position={"absolute"}
          transform={"translate(-50%, -50%)"}
          top={"50%"}
          left={"50%"}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "25px",
            outline: `3px solid ${secondary}`,
            zIndex: 1,
            // backgroundColor: "rgba(100,100,100,0.5)",
            opacity: 0,
            // backdropFilter: "blur(10px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "end",
            transition: "all 0.3s ease",
            "&:hover": {
              opacity: 1,
              cursor: "pointer",
            },
          }}
        >
          <Typography
            variant={"h6"}
            component={"h6"}
            color={primary}
            sx={{
              background: `linear-gradient(rgba(255,255,255,1), rgba(255,255,255,0.5))`,
              padding: "1rem",
              borderRadius: "25px",
              outline: `3px solid ${primary}`,
              width: "100%",
              textAlign: "center",
              zIndex: 2,
              boxShadow: "0 -5px 5px #ccc",
              // backdropFilter: "blur(10px)",
            }}
          >
            {props.title}
          </Typography>
        </Box>
      </Center>
  );
};

export default CategoryCard;
