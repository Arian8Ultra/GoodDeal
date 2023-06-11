import { MenuBook, MenuBookRounded, MenuRounded } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import IButton from "../../components/IButton";

interface Props {
  children?: React.ReactNode;
  loaded?: boolean;
  loading?: boolean;
  id?: string;
  className?: string;
  stores?: any;
  style?: React.CSSProperties;
}
const ShopList = (props: Props) => {
  let stores = props.stores ? props.stores : [];
  const navigate = useNavigate()
  return (
    <Stack width={"100%"} spacing={'1rem'}>
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
        <Typography textAlign={"center"}>قیمت گذاری</Typography>
      </Box>

      {stores.map((store: any) => (
        <Box
          display={"grid"}
          gridTemplateColumns={"repeat(5, 1fr)"}
          gap={"1rem"}
          padding={"1rem"}
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
            {store.address}
          </Typography>
          <IButton pageTitle={store.name} backgroundColor={'transparent'} width={'100%'} fun={()=>{
            navigate(`/home/shop/${store.id}`)
          }}>
            <MenuRounded />
          </IButton>
        </Box>
      ))}
    </Stack>
  );
};

export default ShopList;
