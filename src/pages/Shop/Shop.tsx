/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Typography } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { primary } from "../../theme/Colors";
import "./Shop.css";

const Shop = () => {
  const { shopId, categoryId } = useParams();
  const shop = useLocation().state?.store;
  const center =
    shop?.xCoordinate && shop?.yCoordinate
      ? [shop.xCoordinate, shop.yCoordinate]
      : [35.689720986449565, 51.47891772707084];
  console.log(shop);
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
          justifyContent={"center"}
          alignItems={"start"}
          flexDirection={"column"}
        >
          <Typography
            variant={"h5"}
            component={"h6"}
            fontSize={{
              xs: "1rem",
              lg: "1.1rem",
            }}
          >
            نام فروشگاه :
          </Typography>
          <Typography
            variant={"h6"}
            component={"h6"}
            fontStyle={"bold"}
            fontSize={{
              xs: "0.9rem",
              lg: "1rem",
            }}
          >
            {shop?.name}
          </Typography>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"start"}
          flexDirection={"column"}
        >
          <Typography
            variant={"h5"}
            component={"h6"}
            fontSize={{
              xs: "1rem",
              lg: "1.1rem",
            }}
          >
            نام/ کدملی صاحب فروشگاه :
          </Typography>
          <Typography
            variant={"h6"}
            component={"h6"}
            fontSize={{
              xs: "0.9rem",
              lg: "1rem",
            }}
          >
            {shop?.ownerFullName}
          </Typography>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"start"}
          flexDirection={"column"}
        >
          <Typography
            variant={"h5"}
            component={"h6"}
            fontSize={{
              xs: "1rem",
              lg: "1.1rem",
            }}
          >
            آدرس :
          </Typography>
          <Typography
            variant={"h6"}
            component={"h6"}
            fontSize={{
              xs: "0.9rem",
              lg: "1rem",
            }}
          >
            {shop?.fullAddress}
          </Typography>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"start"}
          flexDirection={"column"}
        >
          <Typography
            variant={"h5"}
            component={"h6"}
            fontSize={{
              xs: "1rem",
              lg: "1.1rem",
            }}
          >
            شماره تماس :
          </Typography>
          <Typography
            variant={"h6"}
            component={"h6"}
            fontSize={{
              xs: "0.9rem",
              lg: "1rem",
            }}
          >
            {shop?.phoneNumber}
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
        gridRow={{
          xs: "2",
          sm: "2",
          md: "1",
          lg: "1",
        }}
        gridColumn={{
          xs: "1/3",
          sm: "1/3",
          md: "2/3",
          lg: "2/3",
        }}
        position={"relative"}
      >
        <MapContainer
          // @ts-ignore
          center={center}
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
          {/* @ts-ignore */}
          <Marker position={center} />
        </MapContainer>
      </Box>

      <Box
        width={"100%"}
        gridColumn={"1/3"}
        padding={"1rem"}
        margin={"auto"}
        sx={{
          borderRadius: "15px",
          backgroundColor: "rgba(255,255,255,0.5)",
          backdropFilter: "blur(10px)",
          border: " 1px solid #4763E4",
          borderColor: primary,
          boxSizing: "border-box",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Shop;
