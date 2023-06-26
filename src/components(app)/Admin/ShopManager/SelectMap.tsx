/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box } from "@mui/system";
import React from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

export function SelectMap(
  center: number[],
  setMap: React.Dispatch<React.SetStateAction<null>>,
  // eventHandlers: { dragend(): void },
  position: {
    lat: number;
    lng: number;
  },
  markerRef: React.MutableRefObject<null>,
) {
  return (
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
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        // @ts-ignore
        ref={setMap}
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
          //   @ts-ignore
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker
        // @ts-ignore
          position={position}
          ref={markerRef}
        ></Marker>
      </MapContainer>
    </Box>
  );
}
