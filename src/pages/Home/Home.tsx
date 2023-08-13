import { useLazyQuery } from "@apollo/client";
import { Box, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { GET_SHOPS_BY_CITY_ID, GET_SHOPS_BY_REGION_ID, GET_SHOPS_BY_SUBREGION_ID, GET_SHOPS_SEARCH } from "../../GraphQL/QueriesShop";
import { SelectBar } from "../../components(app)/Home/SelectBar";
import ShopList from "../../components(app)/Home/ShopList";
import Title from "../../components(app)/Title";
import { usePersistStore } from "../../stores/PersistStore";
import useLayoutStore from "../../stores/layoutStore";

const Home = () => {
  const [, setOstanId] = useState(0);
  const [cityId, setCityId] = useState(0);
  const [regionId, setRegionId] = useState(0);
  const [neighborhoodId, setNeighborhoodId] = useState(0);
  const [search, setSearch] = useState("");
  const [stores, setStores] = useState([]);
  const changePageName = useLayoutStore((state) => state.changePageName);
  const [getShops, { loading, error ,refetch}] = useLazyQuery(GET_SHOPS_BY_SUBREGION_ID, {
    variables: {
      id: neighborhoodId,
    },
    onCompleted: (data) => {
      console.log(data);
      setStores(data.shop_getShops.result.items);
    }
  });

  const [getShopsByCityId,{loading:loadingCity,error:errorCity}] = useLazyQuery(GET_SHOPS_BY_CITY_ID, {
    variables: {
      id: cityId,
    },
    onCompleted: (data) => {
      console.log(data);
      setStores(data.shop_getShops.result.items);
    }
  });

  const [getShopsByRegionId,{loading:loadingRegion,error:errorRegion}] = useLazyQuery(GET_SHOPS_BY_REGION_ID,{
    variables: {
      id: regionId,
    },
    onCompleted: (data) => {
      console.log(data);
      setStores(data.shop_getShops.result.items);
    }
  })


  const [getShopsBySearch,{loading:loadingSearch,error:errorSearch}] = useLazyQuery(GET_SHOPS_SEARCH,{
    variables: {
      search: search,
    },
    onCompleted: (data) => {
      console.log(data);
      setStores(data.shop_getShops.result.items);
    }
  })

  useEffect(() => {
    console.log('getting shops');
    getShops()
  }, [getShops, neighborhoodId]);

  useEffect(() => {
    console.log('getting shops with cityId of: '+cityId);
    getShopsByCityId()
  }, [cityId, getShopsByCityId]);

  useEffect(() => {
    console.log('getting shops with region id of: '+regionId);
    getShopsByRegionId()
  }, [getShopsByRegionId, regionId]);

  useEffect(()=>{
    changePageName("صفحه اصلی")
  },[changePageName])

  useEffect(()=>{
    getShopsBySearch()
  },[getShopsBySearch,search])
  

  return (
    <Stack my={6} alignItems={"center"}>
      <Title title={"صفحه اصلی"} />
      <SelectBar
        getCityId={setCityId}
        getNeighborhoodId={setNeighborhoodId}
        getPronvinceId={setOstanId}
        getRegionId={setRegionId}
      />
      <TextField
        sx={{
          width: "80%",
          marginTop: "50px",
          // change the border radius
          "& .MuiOutlinedInput-root": {
            borderRadius: "15px",
          }
        }}
        label="جستجو"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Box
        sx={{
          marginTop: "10px",
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
