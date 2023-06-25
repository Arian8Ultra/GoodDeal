import { useMutation, useQuery } from "@apollo/client";
import { Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { GET_PROVINCES } from "../../../GraphQL/QueriesLocation";
import LocationAccordion from "./LocationAccordion";
import { Box } from "@mui/material";
import IButton from "../../../components/IButton";
import {
  Green,
  GreenLight,
  onPrimary,
  primaryDark,
} from "../../../theme/Colors";
import { AddRounded } from "@mui/icons-material";
import LinkButton from "../../../components/LinkButton";
import NewModal from "../../../components/Modals";
import TextInput from "../../../components/TextInput";
import { CREATE_PROVINCE } from "../../../GraphQL/MutationLocation";

interface LocationListProps {
  id?: string | undefined;
  className?: string | undefined;
}

const LocationList = () => {
  const [provinces, setProvinces] = useState([]);
  const [modal, setModal] = useState({
    open: false,
    name: "",
  });
  const { loading, error, data ,refetch} = useQuery(GET_PROVINCES, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      console.log(data);
      setProvinces(data.province_getProvinces.result.items);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [addProvince] = useMutation(CREATE_PROVINCE,{
    onCompleted: (data) => {
        console.log(data);
        if (data.province_createProvince.status.code === 1) {
            alert("استان با موفقیت افزوده شد");
            refetch();
        }else{
            alert(data.province_createProvince.status.value + "استان افزوده نشد \n")
        }
        setModal({ ...modal, open: false });
    }
  })
  return (
    <Stack
      spacing={8}
      bgColor={"rgba(255,255,255,0.5)"}
      padding={"2rem"}
      borderRadius={"25px"}
      style={{
        backdropFilter: "blur(10px)",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"start"}
        alignItems={"center"}
      >
        <LinkButton
          icon={<AddRounded />}
          width={"max-content"}
          backgroundColor={Green}
          onClick={() => setModal({ ...modal, open: !modal.open })}
        >
          افزودن استان
        </LinkButton>
      </Box>
      {provinces.map((province: any) => {
        return (
          <LocationAccordion
            key={province.id}
            title={province.name}
            type="province"
            id={province.id}
          >
          </LocationAccordion>
        );
      })}
      <NewModal
        name="افزودن استان"
        open={modal.open}
        changeModal={() => setModal({ ...modal, open: modal.open ? false : true })}
        backgroundColor={onPrimary}
        isCloseable={true}
        
        color={primaryDark}
      >
        <Stack gap={10} width={"80%"}>
          <TextInput
            width={"100%"}
            fullWidth
            label="نام استان"
            value={modal.name}
            getText={(e: string) => setModal({ ...modal, name: e })}
          />
          <LinkButton
          onClick={()=>{
            addProvince({
              variables:{
                name: modal.name
              }
            })
          }}>افزودن</LinkButton>
        </Stack>
      </NewModal>
    </Stack>
  );
};

export default LocationList;
