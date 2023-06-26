import { Box } from "@mui/material";
import React from "react";
import LinkButton from "../../components/LinkButton";

const PanelGrid = () => {
  return (
    <Box
      display={"grid"}
      sx={{ flexGrow: 1, backdropFilter: "blur(10px)" }}
      gridTemplateColumns={{
        xs: "1fr",
        sm: "1fr",
        md: "repeat(5, 1fr)",
        lg: "repeat(5, 1fr)",
      }}
      padding={"2rem"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"2rem"}
      borderRadius={"25px"}
      bgcolor={"rgba(255,255,255,0.5)"}
    >
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <LinkButton padding={"2rem"} link="userManager">
          مدیریت کاربران
        </LinkButton>
      </Box>
      <Box
        display={"flex"}
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <LinkButton padding={"2rem"} link="productManager">
          مدیریت محصولات
        </LinkButton>
      </Box>
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <LinkButton padding={"2rem"} link="shopManager">
          مدیریت فروشگاه ها
        </LinkButton>
      </Box>
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <LinkButton padding={"2rem"} link="categoryManager">
          مدیریت دسته بندی ها
        </LinkButton>
      </Box>
      <Box
        display={"flex"}
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <LinkButton padding={"2rem"} link="locationManager">
          مدیریت مکان ها
        </LinkButton>
      </Box>
    </Box>
  );
};

export default PanelGrid;
