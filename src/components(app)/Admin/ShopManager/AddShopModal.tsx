/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import NewModal from "../../../components/Modals";
import { onPrimary, primary } from "../../../theme/Colors";
import { SelectMap } from "./SelectMap";
import { Stack } from "@chakra-ui/layout";
import TextInput from "../../../components/TextInput";
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
    // @ts-ignore
    props.setXCoordinate && props.setXCoordinate(map?.getCenter().lat)
    // @ts-ignore
    props.setYCoordinate && props.setYCoordinate(map?.getCenter().lng)
  }, [map])

  useEffect(() => {
    // @ts-ignore
    map?.on('move', onMove)
    return () => {
        // @ts-ignore
      map?.off('move', onMove)
    }
  }, [map, onMove])

  return (
    <NewModal
      name='افزودن فروشگاه'
      open={props.open}
      changeModal={props.changeModal}
      backgroundColor={onPrimary}
      color={primary}
      height={'80dvh'}
      isCloseable={true}
    >
        <Stack spacing={'1rem'} width={'100%'}>
      {SelectMap(center, setMap, position, markerRef)}
      <TextInput
        label="نام فروشگاه"
        width={"100%"}
        getText={
            props.setName
        }
        />
        <TextInput
        label="نام و نام خانوادگی مالک"
        width={"100%"}
        getText={
            props.setOwnerFullName
        }
        />
        <TextInput
        label="شماره تلفن"
        width={"100%"}
        getText={
            props.setPhoneNumber
        }
        />

        <TextInput
        label="کد پستی"
        width={"100%"}
        type="number"
        getText={
            props.setPostalCode
        }
        />
        <TextInput
        label="آدرس کامل"
        width={"100%"}
        multiline={true}
        rows={4}
        getText={
            props.setFullAddress
        }
        />
        <TextInput
        label="شماره پلاک"
        width={"100%"}
        type="number"
        getText={
            props.setPlaque
        }
        />

        <TextInput
        label="نوع کالا"
        width={"100%"}

        getText={
            props.setGoodsType
        }
        />

        <TextInput
        label="نام تصویر"
        width={"100%"}
        getText={
            props.setImageName
        }
        />

        <TextInput
        label="شناسه استان"
        width={"100%"}
        type="number"
        getText={
            props.setProvinceId
        }
        />

        </Stack>
      {props.children}
    </NewModal>
  );
};

export default AddShopModal;


