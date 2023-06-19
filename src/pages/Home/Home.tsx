import { Box, Button, Stack } from "@mui/material";
import Title from "../../components(app)/Title";
import { useEffect, useState } from "react";
import {
  GET_CITY_LIST_BY_OSTANID,
  GET_OSTAN_LIST,
  GET_REGION_LIST_BY_CITYID,
  GET_SHOP_LIST_BY_SUBREGIONID,
  GET_SUBREGION_LIST_BY_REGIONID,
} from "../../api/api";
import { usePersistStore } from "../../stores/PersistStore";
import ShopList from "../../components(app)/Home/ShopList";
import { SelectBar } from "../../components(app)/Home/SelectBar";

const Home = () => {
  const [ostanId, setOstanId] = useState(0);
  const [cityId, setCityId] = useState(0);
  const [regionId, setRegionId] = useState(0);
  const [neighborhoodId, setNeighborhoodId] = useState(0);
  const [stores, setStores] = useState([]);
  const token = usePersistStore((state) => state.token);

  useEffect(() => {
    GET_SHOP_LIST_BY_SUBREGIONID({
      token: token,
      subRegionId: neighborhoodId,
      setShopList: setStores,
      onSuccess: (res: { data: any }) => {
        console.log(res);
      },
      onFail: (err: any) => {
        console.log(err);
      },
    });
  }, [neighborhoodId]);

  return (
    <Stack my={6} alignItems={"center"}>
      <Title title={"صفحه اصلی"} />
      <SelectBar
        getCityId={setCityId}
        getNeighborhoodId={setNeighborhoodId}
        getPronvinceId={setOstanId}
        getRegionId={setRegionId}
      />
      <Box
        sx={{
          marginTop: "50px",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "end",
          position: "relative",
          width: "100%",
          padding: "2rem",
          boxSizing: "border-box",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(10px)",
          border: "1px solid #ccc",
          boxShadow: "0 0 10px #ccc",
          borderRadius: "25px",
        }}
      >
        <ShopList stores={stores} />
      </Box>
    </Stack>
  );
};

export default Home;
