/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Typography } from "@mui/material";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer
} from "react-leaflet";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { primary } from "../../theme/Colors";
import "./Shop.css";


const Shop = () => {
  const { shopId, categoryId } = useParams();
  const shop = useLocation().state?.shop;
  return (
    <Box
      display={"grid"}
      gridTemplateColumns={{
        xs: "repeat(1, 1fr)",
        sm: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(2, 1fr)",
        xl: "repeat(2, 1fr)",
      }}
      gap={"1rem"}
      padding={"1rem"}
    >
      <Box
        display={"grid"}
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          sm: "repeat(1, 1fr)",
          md: "repeat(1, 1fr)",
          lg: "repeat(1, 1fr)",
        }}
        gap={"1rem"}
        padding={"1rem"}
      >
        <Box
          display={"flex"}
          justifyContent={"start"}
          alignItems={"center"}
        >
          <Typography variant={"h6"} component={"h6"}>
            نام فروشگاه :
          </Typography>
          <Typography variant={"h6"} component={"h6"}>
            {shop?.name}
          </Typography>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"start"}
          alignItems={"center"}
        >
          <Typography variant={"h6"} component={"h6"}>
            نام صاحب فروشگاه :
          </Typography>
          <Typography variant={"h6"} component={"h6"}>
            {shop?.ownerFullName}
          </Typography>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"start"}
          alignItems={"center"}
        >
          <Typography variant={"h6"} component={"h6"}>
            آدرس :
          </Typography>
          <Typography variant={"h6"} component={"h6"}>
            {shop?.address}
          </Typography>
        </Box>
      </Box>

      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
        height={{
          xs: "50vh",
          sm: "50vh",
          md: "50vh",
          lg: "40vh",
          xl: "40vh",
        }}
        position={"relative"}
      >
        <MapContainer
          // @ts-ignore
          center={[35.689720986449565, 51.47891772707084]}
          zoom={13}
          scrollWheelZoom={true}
          style={{
            border: " 2px solid #4763E4",
            width: "100%",
            height: "100%",
            borderRadius: "15px",
            zIndex: 0,
            backgroundColor: "rgba(255,255,255,0.5)",
            backdropFilter: "blur(10px)",
            position: "absolute",
            top: 0,
            left: 0,
            transform: "translate(0,0)",
          }}
        >
          <TileLayer
            // @ts-ignore
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </Box>

      <Box width={"100%"} gridColumn={"1/3"} padding={'2rem'} sx={{
        borderRadius: '15px',
        backgroundColor: "rgba(255,255,255,0.5)",
        backdropFilter: "blur(10px)",
        border: " 1px solid #4763E4",
        borderColor:primary
      }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Shop;
