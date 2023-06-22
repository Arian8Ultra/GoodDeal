import { useQuery } from "@apollo/client";
import { Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { GET_PROVINCES } from "../../../GraphQL/QueriesLocation";
import LocationAccordion from "./LocationAccordion";

interface LocationListProps {
  id?: string | undefined;
  className?: string | undefined;
}

const LocationList = () => {
  const [provinces, setProvinces] = useState([]);
  const { loading, error, data } = useQuery(GET_PROVINCES, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      console.log(data);
      setProvinces(data.province_getProvinces.result.items);
    },
    onError: (error) => {
      console.log(error);
    },
  });
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
      {provinces.map((province: any) => {
        return (
          <LocationAccordion title={province.name} type="province" id={province.id}>
            {/* {province.cities.map((city: any) => {
                return <LocationAccordion title={city.name} type="city" />
            })} */}
          </LocationAccordion>
        );
      })}
    </Stack>
  );
};

export default LocationList;
