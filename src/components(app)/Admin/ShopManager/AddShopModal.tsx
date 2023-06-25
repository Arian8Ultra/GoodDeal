/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import NewModal from "../../../components/Modals";
import { onPrimary, primary } from "../../../theme/Colors";
import { SelectMap } from "./SelectMap";
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
  const [center, setCenter] = useState([
    35.689720986449565, 51.47891772707084,
  ]);
  const [map, setMap] = useState(null)

  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const onMove = useCallback(() => {
    // @ts-ignore
    setPosition(map?.getCenter())
  }, [map])

  useEffect(() => {
    // @ts-ignore
    map?.on('move', onMove)
    return () => {
        // @ts-ignore
      map?.off('move', onMove)
    }
  }, [map, onMove])
  // const eventHandlers = useMemo(
  //   () => ({
  //     dragend() {
  //       const marker = markerRef.current;
  //       if (marker != null) {
  //         // @ts-ignore
  //         setPosition(marker.getLatLng());
  //         // @ts-ignore
  //         setCenter(marker.getLatLng());
  //           // @ts-ignore
  //         map.setView(center, 13)
  //       }
  //     },
  //   }),
  //   [],
  // );
  return (
    <NewModal
      name='افزودن فروشگاه'
      open={props.open}
      changeModal={props.changeModal}
      backgroundColor={onPrimary}
      color={primary}
      isCloseable={true}
    >
      {SelectMap(center, setMap, position, markerRef)}
      {props.children}
    </NewModal>
  );
};

export default AddShopModal;


