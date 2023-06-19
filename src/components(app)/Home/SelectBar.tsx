import { useLazyQuery, useQuery } from "@apollo/client";
import { Box, Typography } from "@mui/material";
import {SetStateAction, useEffect, useState } from "react";
import {
  GET_CITIES_BY_PROVINCE_ID,
  GET_PROVINCES,
  GET_REGIONS_BY_CITY_ID,
  GET_SUBREGIONS_BY_REGION_ID,
} from "../../GraphQL/QueriesLocation";
import Selector from "../../components/Selector";

interface SelectBarProps {
  getPronvinceId: (id: number) => void;
  getCityId: (id: number) => void;
  getRegionId: (id: number) => void;
  getNeighborhoodId: (id: number) => void;
  className?: string;
  children?: React.ReactNode;
}
export function SelectBar(props: SelectBarProps) {
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
        setCities(data.province_getProvinces.result.items);
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
      setRegions(data.province_getRegions.result.items);
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
      setNeighborhoods(data.province_getSubRegions.result.items);
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
    <Box
      height={"80px"}
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "end",
        position: "relative",
        width: "80%",
        backgroundColor: "rgba(233, 235, 255, 0.38)",
        border: "1px solid #ccc",
        boxShadow: "0 0 10px #ccc",
        borderRadius: "25px",
      }}
    >
      <Box
        height={"100%"}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            bottom: "-25%",
          }}
        >
          <Typography variant="h6" component="h6" sx={{ mb: 1 }}>
            استان
          </Typography>
          <Selector
            items={provinces}
            width="10vw"
            fullWidth={true}
            getValue={(id: any | SetStateAction<undefined>) => {
              setProvinceId(id);
              props.getPronvinceId(id);
            }}
            backgroundColor="#fff"
            borderRadius={"15px"}
          />
        </Box>
      </Box>
      <Box
        height={"100%"}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            bottom: "-25%",
          }}
        >
          <Typography variant="h6" component="h6" sx={{ mb: 1 }}>
            شهر
          </Typography>
          <Selector
            items={cities}
            width="10vw"
            fullWidth={true}
            getValue={(id: any | SetStateAction<undefined>) => {
              setCityId(id);
              props.getCityId(id);
            }}
            backgroundColor="#fff"
            borderRadius={"15px"}
            disabled={provinceId ? false : true}
          />
        </Box>
      </Box>
      <Box
        height={"100%"}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            bottom: "-25%",
          }}
        >
          <Typography variant="h6" component="h6" sx={{ mb: 1 }}>
            منطقه
          </Typography>
          <Selector
            items={regions}
            width="10vw"
            fullWidth={true}
            getValue={(id: any | SetStateAction<undefined>) => {
              setRegionId(id);
              props.getRegionId(id);
            }}
            backgroundColor="#fff"
            borderRadius={"15px"}
            disabled={cityId ? false : true}
          />
        </Box>
      </Box>
      <Box
        height={"100%"}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            bottom: "-25%",
          }}
        >
          <Typography variant="h6" component="h6" sx={{ mb: 1 }}>
            محله
          </Typography>
          <Selector
            items={neighborhoods}
            width="10vw"
            fullWidth={true}
            getValue={(id: any | SetStateAction<undefined>) => {
              setNeighborhoodId(id);
              props.getNeighborhoodId(id);
            }}
            backgroundColor="#fff"
            borderRadius={"15px"}
            disabled={regionId ? false : true}
          />
        </Box>
      </Box>
    </Box>
  );
}
