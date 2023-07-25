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
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import Selector from "../../../components/Selector";
import { Typography } from "@mui/material";
import LinkButton from "../../../components/LinkButton";
import { AddRounded } from "@mui/icons-material";
import { ADD_SHOP } from "../../../GraphQL/MutationShop";
interface Props {
  children?: React.ReactNode;
  open: boolean;
  onClose: () => void;
}
const AddShopModal = (props: Props) => {
  const [center, setCenter] = useState([
    35.689720986449565, 51.47891772707084,
  ]);
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState({
    lat: 35.689720986449565,
    lng: 51.47891772707084,
  });
  const [input, setInput] = useState({
    cityId: 0,
    fullAddress: "",
    goodsType: "",
    plaque: 0,
    name: "",
    ownerFullName: "",
    phoneNumber: "",
    postalCode: "",
    provinceId: "",
    regionId: "",
    subregionId: "",
    // xCoordinate: "",
    // yCoordinate: "",
  });
  const markerRef = useRef(null);
  const onMove = useCallback(() => {
    // @ts-ignore
    setPosition(map?.getCenter());
  }, [map]);

  const [addShop] = useMutation(ADD_SHOP, {

    onCompleted: (data) => {
      console.log(data);
      alert("فروشگاه با موفقیت اضافه شد");
    },
    onError: (e) => {
      console.log(e);
      alert("خطایی رخ داده است" + e);
    },
  });

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






  const checkInput = () => {
    if (
      input.cityId &&
      input.fullAddress &&
      input.name &&
      input.ownerFullName &&
      input.phoneNumber
    ) {
      console.log(position);
      return true;
    } else {
      console.log(input);
      return false;
    }
  }

  return (
    <NewModal
      name="افزودن فروشگاه"
      open={props.open}
      onClose={props.onClose}
      backgroundColor={onPrimary}
      color={primary}
      height={"80dvh"}
      isCloseable={true}
    >
      <Stack spacing={"1rem"} width={"100%"}>
        {SelectMap(center, setMap, position, markerRef)}
        <TextInput
          label="نام فروشگاه"
          width={"100%"}
          getText={(text:string) => {
            setInput({ ...input, name: text });
          }}
        />
        <TextInput
          label="نام و نام خانوادگی مالک"
          width={"100%"}
          getText={(text:string) => {
            setInput({ ...input, ownerFullName: text });
          }}
        />
        <TextInput
          label="شماره تلفن"
          width={"100%"}
          type="number"
          autoComplete="phone"
          getText={(text:string) => {
            setInput({ ...input, phoneNumber: text });
          }}        
          />

        <TextInput
          label="کد پستی"
          width={"100%"}
          type="number"
          getText={(text:string) => {
            setInput({ ...input, postalCode: text });
          }}
        />
        <TextInput
          label="آدرس کامل"
          width={"100%"}
          // multiline={true}
          // rows={4}
          getText={(text:string) => {
            setInput({ ...input, fullAddress: text });
          }}
        />
        <TextInput
          label="شماره پلاک"
          width={"100%"}
          type="number"
          getText={(text:string) => {
            setInput({ ...input, plaque: parseFloat(text) });
          }}
        />

        <TextInput
          label="نوع کالا"
          width={"100%"}
          getText={(text:string) => {
            setInput({ ...input, goodsType: text });
          }}
        />
        <Typography variant="h6" component="h6" sx={{ mb: 1 }}>
          استان
        </Typography>
        <Selector
          items={provinces}
          width={"100%"}
          fullWidth={true}
          getValue={(id: any | SetStateAction<undefined>) => {
            setProvinceId(id);
            setInput({ ...input, provinceId: id });
          }}
          backgroundColor="#fff"
          borderRadius={"15px"}
        />

        <Typography variant="h6" component="h6" sx={{ mb: 1 }}>
          شهر
        </Typography>
        <Selector
          items={cities}
          width={"100%"}
          fullWidth={true}
          getValue={(id: any | SetStateAction<undefined>) => {
            setCityId(id);
            setInput({ ...input, cityId: id });

          }}
          backgroundColor="#fff"
          borderRadius={"15px"}
          disabled={provinceId ? false : true}
        />

        <Typography variant="h6" component="h6" sx={{ mb: 1 }}>
          منطقه
        </Typography>
        <Selector
          items={regions}
          width={"100%"}
          fullWidth={true}
          getValue={(id: any | SetStateAction<undefined>) => {
            setRegionId(id);
            setInput({ ...input, regionId: id });

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
          width={"100%"}
          // fullWidth={true}
          getValue={(id: any | SetStateAction<undefined>) => {
            setNeighborhoodId(id);
            setInput({ ...input, subregionId: id });
          }}
          backgroundColor="#fff"
          borderRadius={"15px"}
          disabled={regionId ? false : true}
        />

        <LinkButton backgroundColor={primary} icon={<AddRounded />} onClick={()=>{
          if(checkInput()){
            console.log(input);
            addShop({
              variables: {
                cityId: input.cityId,
                fullAddress: input.fullAddress,
                goodsType: input.goodsType,
                plaque: input.plaque,
                name: input.name,
                ownerFullName: input.ownerFullName,
                phoneNumber: input.phoneNumber,
                postalCode: input.postalCode,
                provinceId: input.provinceId,
                regionId: input.regionId,
                subregionId: input.subregionId,
                xCoordinate: position.lat,
                yCoordinate: position.lng,
              },
            });
          }else{
            alert("لطفا تمامی فیلد ها را پر کنید")
          }
        }}>
          افزودن فروشگاه
        </LinkButton>
      </Stack>
      {props.children}
    </NewModal>
  );
};

export default AddShopModal;
