/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import NewModal from "../../../components/Modals";
import { onPrimary, primary } from "../../../theme/Colors";
import { SelectMap } from "./SelectMap";
import { Stack } from "@chakra-ui/layout";
import TextInput from "../../../components/TextInput";
import {
  GET_CITIES_BY_PROVINCE_ID,
  GET_PROVINCES,
  GET_REGIONS_BY_CITY_ID,
  GET_SUBREGIONS_BY_REGION_ID,
} from "../../../GraphQL/QueriesLocation";
import { useLazyQuery, useQuery } from "@apollo/client";
import Selector from "../../../components/Selector";
import { Typography } from "@mui/material";
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
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const onMove = useCallback(() => {
    // @ts-ignore
    setPosition(map?.getCenter());
    // @ts-ignore
    props.setXCoordinate && props.setXCoordinate(map?.getCenter().lat);
    // @ts-ignore
    props.setYCoordinate && props.setYCoordinate(map?.getCenter().lng);
  }, [map]);

  useEffect(() => {
    // @ts-ignore
    map?.on("move", onMove);
    return () => {
      // @ts-ignore
      map?.off("move", onMove);
    };
  }, [map, onMove]);

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [regions, setRegions] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [provinceId, setProvinceId] = useState();
  const [cityId, setCityId] = useState();
  const [regionId, setRegionId] = useState();
  const [neighborhoodId, setNeighborhoodId] = useState();

  const { loading, error } = useQuery(GET_PROVINCES, {
    onCompleted: (data) => {
      console.log(data.province_getProvinces);
      setProvinces(data.province_getProvinces.result.items);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const [getCities, { loading: loadingCities, error: errorCities }] =
    useLazyQuery(GET_CITIES_BY_PROVINCE_ID, {
      variables: {
        id: provinceId,
      },
      onCompleted: (data) => {
        console.log(data);
        setCities(data.city_getCities.result.items);
      },
    });

  const [
    getRegions,
    { loading: loadingRegions, error: errorRegions },
  ] = useLazyQuery(GET_REGIONS_BY_CITY_ID, {
    variables: {
      id: cityId,
    },
    onCompleted: (data) => {
      console.log(data);
      setRegions(data.region_getRegions.result.items);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const [
    getNeighborhoods,
    { loading: loadingNeighborhoods, error: errorNeighborhoods },
  ] = useLazyQuery(GET_SUBREGIONS_BY_REGION_ID, {
    variables: {
      id: regionId,
    },
    onCompleted: (data) => {
      console.log(data);
      setNeighborhoods(data.subregion_getSubregions.result.items);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  useEffect(() => {
    if (provinceId) {
      getCities();
    }
  }, [provinceId]);

  useEffect(() => {
    if (cityId) {
      getRegions();
    }
  }, [cityId]);

  useEffect(() => {
    if (regionId) {
      getNeighborhoods();
    }
  }, [regionId]);

  return (
    <NewModal
      name='افزودن فروشگاه'
      open={props.open}
      changeModal={props.changeModal}
      backgroundColor={onPrimary}
      color={primary}
      height={"80dvh"}
      isCloseable={true}
    >
      <Stack spacing={"1rem"} width={"100%"}>
        {SelectMap(center, setMap, position, markerRef)}
        <TextInput
          label='نام فروشگاه'
          width={"100%"}
          getText={props.setName}
        />
        <TextInput
          label='نام و نام خانوادگی مالک'
          width={"100%"}
          getText={props.setOwnerFullName}
        />
        <TextInput
          label='شماره تلفن'
          width={"100%"}
          getText={props.setPhoneNumber}
        />

        <TextInput
          label='کد پستی'
          width={"100%"}
          type='number'
          getText={props.setPostalCode}
        />
        <TextInput
          label='آدرس کامل'
          width={"100%"}
          multiline={true}
          rows={4}
          getText={props.setFullAddress}
        />
        <TextInput
          label='شماره پلاک'
          width={"100%"}
          type='number'
          getText={props.setPlaque}
        />

        <TextInput
          label='نوع کالا'
          width={"100%"}
          getText={props.setGoodsType}
        />

        <TextInput
          label='نام تصویر'
          width={"100%"}
          getText={props.setImageName}
        />
          <Typography variant="h6" component="h6" sx={{ mb: 1 }}>
            استان
          </Typography>
        <Selector
          items={provinces}
          width={{
            xs: "50vw",
            sm: "40vw",
            md: "10vw",
            lg: "10vw",
          }}
          fullWidth={true}
          getValue={(id: any | SetStateAction<undefined>) => {
            setProvinceId(id);
            props.setProvinceId && props.setProvinceId(id);
          }}
          backgroundColor='#fff'
          borderRadius={"15px"}
        />

        <Typography variant='h6' component='h6' sx={{ mb: 1 }}>
          شهر
        </Typography>
        <Selector
          items={cities}
          width={{
            xs: "50vw",
            sm: "40vw",
            md: "10vw",
            lg: "10vw",
          }}
          fullWidth={true}
          getValue={(id: any | SetStateAction<undefined>) => {
            setCityId(id);
            props.setCityId && props.setCityId(id);
          }}
          backgroundColor='#fff'
          borderRadius={"15px"}
          disabled={provinceId ? false : true}
        />


          <Typography variant="h6" component="h6" sx={{ mb: 1 }}>
            منطقه
          </Typography>
          <Selector
            items={regions}
            width={{
              xs: "50vw",
              sm: "40vw",
              md: "10vw",
              lg: "10vw",
            }}
            fullWidth={true}
            getValue={(id: any | SetStateAction<undefined>) => {
              setRegionId(id);
              props.setRegionId && props.setRegionId(id);
            }}
            backgroundColor="#fff"
            borderRadius={"15px"}
            disabled={cityId ? false : true}
          />


          <Typography variant="h6" component="h6" sx={{ mb: 1 }}>
            محله
          </Typography>
          <Selector
            items={neighborhoods}
            width={{
              xs: "50vw",
              sm: "40vw",
              md: "10vw",
              lg: "10vw",
            }}
            // fullWidth={true}
            getValue={(id: any | SetStateAction<undefined>) => {
              setNeighborhoodId(id);
              props.setSubregionId && props.setSubregionId(id);
            }}
            backgroundColor="#fff"
            borderRadius={"15px"}
            disabled={regionId ? false : true}
          />
      </Stack>
      {props.children}
    </NewModal>
  );
};

export default AddShopModal;
