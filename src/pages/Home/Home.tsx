import { Box, Button, Stack, Typography } from "@mui/material";
import Title from "../../components(app)/Title";
import Selector from "../../components/Selector";
import { useEffect, useState } from "react";
import {
  GET_CITY_LIST_BY_OSTANID,
  GET_OSTAN_LIST,
  GET_REGION_LIST_BY_CITYID,
  GET_SUBREGION_LIST_BY_REGIONID,
} from "../../api/api";
import { usePersistStore } from "../../stores/PersistStore";
import ShopList from "../../components(app)/Home/ShopList";

const Home = () => {
  const [ostans, setOstans] = useState([]);
  const [ostanId, setOstanId] = useState(0);
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState(0);
  const [regions, setRegions] = useState([]);
  const [regionId, setRegionId] = useState(0);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [neighborhoodId, setNeighborhoodId] = useState(0);
  const token = usePersistStore((state) => state.token);

  let ostanClick = () =>
    GET_OSTAN_LIST({
      token: token,
      onSuccess: (res: { data: any }) => {
        console.log(res);
      },
      setOstanList: setOstans,
      onFail: (err: any) => {
        console.log(err);
      },
    });

  useEffect(() => {
    ostanClick();
  }, []);

  useEffect(() => {
    GET_CITY_LIST_BY_OSTANID({
      token: token,
      ostanId,
      setCityList: setCities,
      onSuccess: (res: { data: any }) => {
        console.log(res);
      },
      onFail: (err: any) => {
        console.log(err);
      },
    });
  }, [ostanId]);

  useEffect(() => {
    GET_REGION_LIST_BY_CITYID({
      token: token,
      cityId,
      setRegionList: setRegions,
      onSuccess: (res: { data: any }) => {
        console.log(res);
      },
      onFail: (err: any) => {
        console.log(err);
      },
    });
  }, [cityId]);

  useEffect(() => {
    GET_SUBREGION_LIST_BY_REGIONID({
      token: token,
      regionId,
      setSubRegionList: setNeighborhoods,
      onSuccess: (res: { data: any }) => {
        console.log(res);
      },
      onFail: (err: any) => {
        console.log(err);
      },
    });
  }, [regionId]);

  return (
    <Stack my={6} alignItems={"center"}>
      <Title title={"صفحه اصلی"} />
      <Box
        height={"80px"}
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "end",
          position: "relative",
          width: "80%",
          backgroundColor:"rgba(233, 235, 255, 0.38)",
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
              items={ostans}
              width="10vw"
              fullWidth={true}
              getValue={setOstanId}
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
              getValue={setCityId}
              backgroundColor="#fff"
              borderRadius={"15px"}
              disabled={ostanId?false:true}
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
              getValue={setRegionId}
              backgroundColor="#fff"
              borderRadius={"15px"}
              disabled={cityId?false:true}
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
              getValue={setNeighborhoodId}
              backgroundColor="#fff"
              borderRadius={"15px"}
              disabled={regionId?false:true}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: "50px",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "end",
          position: "relative",
          width: "100%",
          padding:'2rem',
          boxSizing:'border-box',
          backgroundColor:"rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(10px)",
          border: "1px solid #ccc",
          boxShadow: "0 0 10px #ccc",
          borderRadius: "25px",
        }}
      >
        <ShopList >

        </ShopList>

      </Box>
    </Stack>
  );
};

export default Home;
