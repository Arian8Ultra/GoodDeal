/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useMemo, useRef, useState } from "react";
import NewModal from "../../../components/Modals";
import {
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import { Box } from "@mui/system";
interface Props {
  children?: React.ReactNode;
  open: boolean;
  changeModal: () => void;
  setCityId?: (value: string) => void;
  setFullAddress?: (value: string) => void;
  setGoodsType?: (value: string) => void;
  setPlaque?: (value: string) => void;
  setImageName?: (value: string) => void;
  setName?: (value: string) => void;
  setOwnerFullName?: (value: string) => void;
  setPhoneNumber?: (value: string) => void;
  setPostalCode?: (value: string) => void;
  setProvinceId?: (value: string) => void;
  setRegionId?: (value: string) => void;
  setSubregionId?: (value: string) => void;
  setXCoordinate?: (value: string) => void;
  setYCoordinate?: (value: string) => void;
}
const AddShopModal = (props: Props) => {
  const map = useRef(null);
  const [center, setCenter] = useState([
    35.689720986449565, 51.47891772707084,
  ]);
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          // @ts-ignore
          setPosition(marker.getLatLng());
          // @ts-ignore
          setCenter(marker.getLatLng());
        }
      },
    }),
    [],
  );
  return (
    <NewModal
      name='افزودن فروشگاه'
      open={props.open}
      changeModal={props.changeModal}
    >
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
          ref={map}
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
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <Marker
            draggable={true}
            eventHandlers={eventHandlers}
            // @ts-ignore
            position={position}
            ref={markerRef}
          >
          </Marker>
        </MapContainer>
      </Box>
      {props.children}
    </NewModal>
  );
};

export default AddShopModal;
