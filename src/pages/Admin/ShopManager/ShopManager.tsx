import React from "react";
import LinkButton from "../../../components/LinkButton";
import AddShopModal from "../../../components(app)/Admin/ShopManager/AddShopModal";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  GET_SHOPS_BY_CITY_ID,
  GET_SHOPS_BY_REGION_ID,
  GET_SHOPS_BY_SUBREGION_ID,
} from "../../../GraphQL/QueriesShop";
import useLayoutStore from "../../../stores/layoutStore";
import { usePersistStore } from "../../../stores/PersistStore";
import { Box, Stack } from "@mui/material";
import { SelectBar } from "../../../components(app)/Home/SelectBar";
import ShopList from "../../../components(app)/Home/ShopList";
import { AddRounded } from "@mui/icons-material";
import { Green } from "../../../theme/Colors";
import ManageShopList from "../../../components(app)/Admin/ShopManager/ManageShopList";
const ShopManager = () => {
  const [addModal, setAddModal] = React.useState({
    open: false,
    cityId: "",
    fullAddress: "",
    goodsType: "",
    plaque: "",
    name: "",
    ownerFullName: "",
    phoneNumber: "",
    postalCode: "",
    provinceId: "",
    regionId: "",
    subregionId: "",
    xCoordinate: "",
    yCoordinate: "",
  });
  const [ostanId, setOstanId] = useState(0);
  const [cityId, setCityId] = useState(0);
  const [regionId, setRegionId] = useState(0);
  const [neighborhoodId, setNeighborhoodId] = useState(0);
  const [stores, setStores] = useState([]);
  const token = usePersistStore((state) => state.token);
  const changePageName = useLayoutStore(
    (state) => state.changePageName
  );
  const [getShops, { loading, error, refetch }] = useLazyQuery(
    GET_SHOPS_BY_SUBREGION_ID,
    {
      variables: {
        id: neighborhoodId,
      },
      onCompleted: (data) => {
        console.log(data);
        setStores(data.shop_getShops.result.items);
      },
    }
  );

  const [
    getShopsByCityId,
    { loading: loadingCity, error: errorCity },
  ] = useLazyQuery(GET_SHOPS_BY_CITY_ID, {
    variables: {
      id: cityId,
    },
    onCompleted: (data) => {
      console.log(data);
      setStores(data.shop_getShops.result.items);
    },
  });

  const [
    getShopsByRegionId,
    { loading: loadingRegion, error: errorRegion },
  ] = useLazyQuery(GET_SHOPS_BY_REGION_ID, {
    variables: {
      id: regionId,
    },
    onCompleted: (data) => {
      console.log(data);
      setStores(data.shop_getShops.result.items);
    },
  });

  useEffect(() => {
    console.log("getting shops");
    getShops();
  }, [getShops, neighborhoodId]);

  useEffect(() => {
    console.log("getting shops with cityId of: " + cityId);
    getShopsByCityId();
  }, [cityId, getShopsByCityId]);

  useEffect(() => {
    console.log("getting shops with region id of: " + regionId);
    getShopsByRegionId();
  }, [getShopsByRegionId, regionId]);

  return (
    <Stack my={6} alignItems={"center"}>
      <LinkButton
      margin={"1rem"}
      width={'max-content'}
      backgroundColor={Green}
      icon={
        <AddRounded/>
      }
        onClick={() =>
          setAddModal({ ...addModal, open: !addModal.open })
        }
      >
        افزودن فروشگاه
      </LinkButton>
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
        <ManageShopList stores={stores}/>
      </Box>

      <AddShopModal
        open={addModal.open}
        onClose={() =>
          setAddModal({ ...addModal, open: !addModal.open })
        }
      />
    </Stack>
  );
};

export default ShopManager;
