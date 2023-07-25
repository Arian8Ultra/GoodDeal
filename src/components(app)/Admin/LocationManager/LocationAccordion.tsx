/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AddRounded,
  ArrowDownwardRounded,
  DeleteRounded,
  EditRounded,
  ExpandMoreRounded,
} from "@mui/icons-material";
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
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import IButton from "../../../components/IButton";
import {
  Green,
  GreenLight,
  Red,
  onPrimary,
  primary,
  primaryDark,
  primaryLight,
  primaryLightTransparent,
} from "../../../theme/Colors";
import LinkButton from "../../../components/LinkButton";
import {
  CREATE_CITY,
  CREATE_REGION,
  CREATE_SUBREGION,
  DELETE_CITY,
  DELETE_PROVINCE,
  DELETE_REGION,
  DELETE_SUBREGION,
} from "../../../GraphQL/MutationLocation";
import { Center, HStack, Stack } from "@chakra-ui/react";
import NewModal from "../../../components/Modals";
import TextInput from "../../../components/TextInput";
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
  const [addModal, setAddModal] = React.useState({
    open: false,
    name: "",
    type: "",
    code: "",
  });
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
      fetchPolicy: "network-only",
      refetchWritePolicy: "overwrite",
    });

  const [
    getRegions,
    { loading: loadingRegions, error: errorRegions },
  ] = useLazyQuery(GET_REGIONS_BY_CITY_ID, {
    variables: {
      id: props.id,
    },
    onCompleted: (data) => {
      console.log(data);
      setChilds(data.region_getRegions.result.items);
    },
    onError: (e) => {
      console.log(e);
    },
    fetchPolicy: "network-only",
    refetchWritePolicy: "overwrite",
  });

  const [
    getSubregions,
    { loading: loadingSubregions, error: errorSubregions },
  ] = useLazyQuery(GET_SUBREGIONS_BY_REGION_ID, {
    variables: {
      id: props.id,
    },
    onCompleted: (data) => {
      console.log(data);
      setChilds(data.subregion_getSubregions.result.items);
    },
    onError: (e) => {
      console.log(e);
    },
    fetchPolicy: "network-only",
    refetchWritePolicy: "overwrite",
  });

  const [
    deleteProvince,
    { loading: loadingDeleteProvince, error: errorDeleteProvince },
  ] = useMutation(DELETE_PROVINCE, {
    variables: {
      id: props.id,
    },
    onCompleted: (data) => {
      console.log(data);
      if (data.province_deleteProvince.status.code === 1) {
        alert("استان با موفقیت حذف شد");
      } else {
        alert("مشکلی در حذف استان به وجود آمده است");
      }
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const [
    deleteCity,
    { loading: loadingDeleteCity, error: errorDeleteCity },
  ] = useMutation(DELETE_CITY, {
    variables: {
      id: props.id,
    },
    onCompleted: (data) => {
      console.log(data);
      if (data.city_deleteCity.status.code === 1) {
        alert("شهر با موفقیت حذف شد");
        window.location.reload();
      } else {
        alert("مشکلی در حذف شهر به وجود آمده است");
      }
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const [
    deleteRegion,
    { loading: loadingDeleteRegion, error: errorDeleteRegion },
  ] = useMutation(DELETE_REGION, {
    variables: {
      id: props.id,
    },
    onCompleted: (data) => {
      console.log(data);
      if (data.region_deleteRegion.status.code === 1) {
        alert("منطقه با موفقیت حذف شد");
        window.location.reload();
      } else {
        alert("مشکلی در حذف منطقه به وجود آمده است");
      }
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const [
    deleteSubregion,
    { loading: loadingDeleteSubregion, error: errorDeleteSubregion },
  ] = useMutation(DELETE_SUBREGION, {
    variables: {
      id: props.id,
    },
    onCompleted: (data) => {
      console.log(data);
      if (data.subregion_deleteSubregion.status.code === 1) {
        alert("زیر منطقه با موفقیت حذف شد");
        window.location.reload();
      } else {
        alert("مشکلی در حذف زیر منطقه به وجود آمده است");
      }
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const [addCity, { loading: loadingAddCity, error: errorAddCity }] =
    useMutation(CREATE_CITY, {
      variables: {
        name: addModal.name,
        provinceId: props.id,
      },
      onCompleted: (data) => {
        console.log(data);
        if (data.city_addCity.status.code === 1) {
          alert("شهر با موفقیت اضافه شد");
          setAddModal({
            name: "",
            code: "",
            open: false,
            type: "",
          });
          window.location.reload();
        } else {
          alert("مشکلی در اضافه کردن شهر به وجود آمده است");
        }
      },
      onError: (e) => {
        console.log(e);
      },
    });

  const [
    addRegion,
    { loading: loadingAddRegion, error: errorAddRegion },
  ] = useMutation(CREATE_REGION, {
    variables: {
      name: addModal.name,
      cityId: props.id,
      code: parseInt(addModal.code),
    },
    onCompleted: (data) => {
      console.log(data);
      if (data.region_addRegion.status.code === 1) {
        alert("منطقه با موفقیت اضافه شد");
        setAddModal({
          name: "",
          code: "",
          open: false,
          type: "",
        });
        window.location.reload();
      } else {
        alert("مشکلی در اضافه کردن منطقه به وجود آمده است");
      }
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const [
    addSubregion,
    { loading: loadingAddSubregion, error: errorAddSubregion },
  ] = useMutation(CREATE_SUBREGION, {
    variables: {
      name: addModal.name,
      regionId: props.id,
      code: parseInt(addModal.code),
    },
    onCompleted: (data) => {
      console.log(data);
      if (data.subregion_addSubregion.status.code === 1) {
        alert("زیر منطقه با موفقیت اضافه شد");
        setAddModal({
          name: "",
          code: "",
          open: false,
          type: "",
        });
        window.location.reload();
      } else {
        alert("مشکلی در اضافه کردن زیر منطقه به وجود آمده است");
      }
    },
    onError: (e) => {
      console.log(e);
    },
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

  const handleDelete = () => {
    switch (props.type) {
      case "province":
        return deleteProvince();
      case "city":
        return deleteCity();
      case "region":
        return deleteRegion();
      case "subregion":
        return deleteSubregion();
      default:
        return;
    }
  };

  const handleAdd = () => {
    switch (props.type) {
      case "province":
        return addCity();
      case "city":
        return addRegion();
      case "region":
        return addSubregion();
      default:
        return;
    }
  };
  return (
    <Accordion
      expanded={expanded === "panel1"}
      elevation={0}
      sx={{
        width: "100%",
        // borderRadius: "25px",
        backgroundColor: "transparent",
        padding: "0rem",
        // backdropFilter: "blur(10px)",
        boxShadow: "none",
        transition: "all 0.1s ease-in-out",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreRounded />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          width: "100%",
          boxShadow: "none",
          borderRadius: "10px",
          backgroundColor:
            expanded === "panel1"
              ? primaryLightTransparent
              : "transparent",
          "&:hover": {
            backgroundColor: primaryLightTransparent,
          },
        }}
      >
        <Box
          display={"grid"}
          gridTemplateColumns={"auto 1fr auto"}
          width={"100%"}
          gap={2}
          alignContent={"center"}
          alignItems={"center"}
        >
          <Center
            onClick={() => {
              setExpanded(expanded === "panel1" ? false : "panel1");
              handleGet();
            }}
            justifyContent={"flex-start"}
          >
            {/* {props.id} */}
            {props.id}
          </Center>
          <Center
            onClick={() => {
              setExpanded(expanded === "panel1" ? false : "panel1");
              handleGet();
            }}
            justifyContent={"flex-start"}
          >
            {/* {props.id} */}
            {props.title}
          </Center>
          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            gap={2}
            alignItems={"center"}
          >
            {props.type !== "subregion" && (
              <LinkButton
                icon={<AddRounded />}
                width={"auto"}
                backgroundColor={Green}
                fontSize={"0.8rem"}
                height={"max-content"}
                onClick={() => {
                  setAddModal({
                    ...addModal,
                    open: true,
                    type:
                      props.type == "province"
                        ? "شهر"
                        : props.type == "city"
                        ? "منطقه"
                        : props.type == "region"
                        ? "زیر منطقه"
                        : "",
                  });
                }}
              >
                {props.type === "province" && "افزودن شهر"}
                {props.type === "city" && "افزودن منطقه"}
                {props.type === "region" && "افزودن زیرمنطقه"}
              </LinkButton>
            )}

            <IButton
              backgroundColor={Red}
              hoverColor={"#ff0000"}
              height={"max-content"}
              fun={() => {
                confirm("آیا از حذف این مورد اطمینان دارید؟") &&
                  handleDelete();
              }}
            >
              <DeleteRounded
                sx={{
                  color: "white",
                  fontSize: "1rem",
                }}
              />
            </IButton>
            <IButton
              backgroundColor={primary}
              hoverColor={primaryLight}
              height={"max-content"}
            >
              <EditRounded
                sx={{
                  color: "white",
                  fontSize: "1rem",
                }}
              />
            </IButton>
          </Box>
        </Box>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          // boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          backgroundColor: props.backgroundColor
            ? props.backgroundColor
            : primaryLightTransparent,
          padding: "1rem",
          borderRadius: "15px",
          border: "1px solid rgba(0,0,0,0.1)",
          mt: "0.5rem",
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
              type={
                props.type === "province"
                  ? "city"
                  : props.type === "city"
                  ? "region"
                  : "subregion"
              }
              id={child.id}
              backgroundColor={"rgba(255,255,255,0.5)"}
              borderRadius={"15px"}
              width={"100%"}
            />
          ))}
        </Box>
      </AccordionDetails>
      <NewModal
        open={addModal.open}
        onClose={() => {
          setAddModal({ ...addModal, open: !addModal.open });
        }}
        backgroundColor={onPrimary}
        name={`افزودن ${addModal.type}`}
        isCloseable={true}
        color={primaryDark}
      >
        <Stack gap={10} width={"80%"}>
          <TextInput
            width={"100%"}
            fullWidth
            label={`نام ${addModal.type}`}
            value={addModal.name}
            getText={(e: string) =>
              setAddModal({ ...addModal, name: e })
            }
          />
          {addModal.type === "زیر منطقه" ||
          addModal.type === "منطقه" ? (
            <TextInput
              width={"100%"}
              fullWidth
              label={`کد ${addModal.type}`}
              value={addModal.code}
              type="number"
              getText={(e: string) =>
                setAddModal({ ...addModal, code: e })
              }
            />
          ) : null}
          <LinkButton
            onClick={() => {
              handleAdd();
            }}
          >
            افزودن
          </LinkButton>
        </Stack>
      </NewModal>
    </Accordion>
  );
};

export default LocationAccordion;
