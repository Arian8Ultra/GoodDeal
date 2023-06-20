import { useQuery } from "@apollo/client";
import { Stack } from "@chakra-ui/react";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { GET_USERS } from "../../../GraphQL/QueriesUser";
import IButton from "../../../components/IButton";
import {
  AddRounded,
  Delete,
  DeleteRounded,
  EditRounded,
} from "@mui/icons-material";
import {
  Green,
  GreenLight,
  Red,
  RedLight,
  primary,
  primaryLight,
} from "../../../theme/Colors";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const { data, loading, error } = useQuery(GET_USERS, {
    onCompleted: (data) => {
      console.log(data);
      setUsers(data.user_getUsers.result.items);
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
      <Box
        display={"flex"}
        justifyContent={"start"}
        alignItems={"center"}
      >
        <IButton backgroundColor={Green} hoverColor={GreenLight}>
          <AddRounded />
        </IButton>
      </Box>
      <Box
        display={"grid"}
        gridTemplateColumns={{
          xs: "repeat(3, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(5, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        padding={"2rem"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"2rem"}
        borderRadius={"25px"}
        bgcolor={"rgba(220,220,220,0.8)"}
      >
        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            sx={{
              color: "black",
              fontWeight: "bold",
            }}
          >
            نام
          </Typography>
        </Box>

        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            sx={{
              color: "black",
            }}
          >
            نام خانوادگی
          </Typography>
        </Box>

        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            sx={{
              color: "black",
            }}
          >
            نوع کاربر
          </Typography>
        </Box>

        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            sx={{
              color: "black",
            }}
          >
            شماره تماس
          </Typography>
        </Box>

        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            sx={{
              color: "black",
            }}
          >
            عملیات ها
          </Typography>
        </Box>
      </Box>

      {users?.map((user: any) => (
        <a>
          <Box
            display={"grid"}
            gridTemplateColumns={{
              xs: "repeat(3, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(5, 1fr)",
              lg: "repeat(5, 1fr)",
            }}
            padding={"1rem"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"2rem"}
            borderRadius={"25px"}
            bgcolor={"rgba(255,255,255,0.5)"}
            sx={{
              transition: "all 0.1s ease-in-out",
              boxShadow: "0 0 10px rgba(0,0,0,0.2)",
              backdropFilter: "blur(10px)",
              "&:hover": {
                backgroundColor: "rgba(220,220,220,0.5)",
                cursor: "pointer",
              },
            }}
          >
            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography sx={{ color: "black" }}>
                {user.firstName}
              </Typography>
            </Box>

            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography sx={{ color: "black" }}>
                {user.lastName}
              </Typography>
            </Box>

            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography sx={{ color: "black" }}>
                {user.userType ? user.userType : "کاربر عادی"}
              </Typography>
            </Box>

            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography sx={{ color: "black" }}>
                {user.phoneNumber}
              </Typography>
            </Box>

            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box
                display={"flex"}
                justifyContent={"space-evenly"}
                alignItems={"center"}
                width={"100%"}
              >
                <IButton backgroundColor={Red} hoverColor={"#ff0000"}>
                  <DeleteRounded
                    sx={{
                      color: "white",
                    }}
                  />
                </IButton>
                <IButton
                  backgroundColor={primary}
                  hoverColor={primaryLight}
                >
                  <EditRounded
                    sx={{
                      color: "white",
                    }}
                  />
                </IButton>
              </Box>
            </Box>
          </Box>
        </a>
      ))}
    </Stack>
  );
};

export default UserList;
