import { ExpandMoreRounded } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
import React, { useEffect } from "react";
import {
  GET_CITIES,
  GET_CITIES_BY_PROVINCE_ID,
  GET_REGIONS_BY_CITY_ID,
  GET_SUBREGIONS_BY_REGION_ID,
} from "../../../GraphQL/QueriesLocation";
import { useLazyQuery, useQuery } from "@apollo/client";
interface LocationAccordionProps {
  id?: string | undefined;
  className?: string | undefined;
  title: string | undefined;
  children?: React.ReactNode;
  width?: string | undefined;
  backgroundColor?: string | undefined;
  borderRadius?: string | number | undefined;
  type: "province" | "city" | "region" | "subregion" | undefined;
}
const LocationAccordion = (props: LocationAccordionProps) => {
  const [expanded, setExpanded] = React.useState<string | false>(
    false
  );
  const [childs, setChilds] = React.useState<React.ReactNode[]>([]);
  let children = props.children;

  const [getCities, { loading: loadingCities, error: errorCities }] =
    useLazyQuery(GET_CITIES_BY_PROVINCE_ID, {
      variables: {
        id: props.id,
      },
      onCompleted: (data) => {
        console.log(data);
        setChilds(data.city_getCities.result.items);
      },
    });

    const [getRegions, { loading: loadingRegions, error: errorRegions }] =
    useLazyQuery(GET_REGIONS_BY_CITY_ID, {
      variables: {
        id: props.id,
      },
      onCompleted: (data) => {
        console.log(data);
        setChilds(data.region_getRegions.result.items);
      },
      onError : (e) => {
        console.log(e);
      }
    });


    const [getSubregions, { loading: loadingSubregions, error: errorSubregions }] =
    useLazyQuery(GET_SUBREGIONS_BY_REGION_ID, {
      variables: {
        id: props.id,
      },
      onCompleted: (data) => {
        console.log(data);
        setChilds(data.subregion_getSubregions.result.items);
      },
      onError : (e) => {
        console.log(e);
      }
    });

  const handleGet = () => {
    switch (props.type) {
      case "province":
        return getCities();
      case "city":
        return getRegions();
      case "region":
        return getSubregions();
      default:
        return;
    }
  };
  return (
    <Accordion
      expanded={expanded === "panel1"}
      elevation={0}
      onChange={(event, isExpanded) => {
        setExpanded(isExpanded ? "panel1" : false);
        handleGet();
      }}
      sx={{
        width: "100%",
        // borderRadius: "25px",
        backgroundColor: "rgba(255,255,255,0.5)",
        padding: "0rem",
        backdropFilter: "blur(10px)",
        boxShadow: "none",
        transition: "all 0.1s ease-in-out",
        outline: "none",
        border: "none",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreRounded />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          width: "100%",
          boxShadow: "none",
          backgroundColor: "transparent",
        }}
      >
        {props.title}
      </AccordionSummary>

      <AccordionDetails
        sx={{
          // boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          backgroundColor: props.backgroundColor
            ? props.backgroundColor
            : "rgba(230,230,230,0.5)",
          padding: "1rem",
          borderRadius: "15px",
        }}
      >
        <Box
          borderRadius={"25px"}
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
        >
          {props.children}
          {childs.map((child: any) => (
            <LocationAccordion
              key={child.id}
              title={child.name}
              type="city"
              id={child.id}
              backgroundColor={"rgba(255,255,255,0.5)"}
              borderRadius={"15px"}
              width={"100%"}
            />
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default LocationAccordion;
