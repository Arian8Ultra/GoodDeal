import { Center, Image } from "@chakra-ui/react";
import { AccountCircleRounded, ArrowCircleLeftRounded } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import headerImage from "../assets/header.svg";
import mainLayoutBackground from "../assets/mainLayoutBackground.svg";
import { usePersistStore } from "../stores/PersistStore";
import useLayoutStore from "../stores/layoutStore";
import { onPrimary, primary, primaryLight, secondary } from "../theme/Colors";
import { borderRadiuos } from "../theme/Themes";
import { useEffect, useState } from "react";
import CAN from "../components/CAN";
import useAbilityStore from "../stores/abilityStore";

function MainLayout() {
  let pageName = useLayoutStore((state) => state.pageName);
  const firstName = usePersistStore((state) => state.firstName);
  const lastName = usePersistStore((state) => state.lastName);
  const logout = usePersistStore((state) => state.logout);
  let role = usePersistStore((state) => state.role);
  role = role === "admin" ? "مدیر" : "کاربر";
  pageName = pageName ? pageName : "صفحه اصلی";
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const token = usePersistStore((state) => state.token);
  const clearAbilities = useAbilityStore(
    (state) => state.clearAbilities
  );
  
  useEffect(() => {
    if (!token) {
      clearAbilities();
      logout();
    }
  }, [token, logout]);


  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      boxSizing={"border-box"}
      position={"relative"}
      display={"flex"}
      flexDirection={"column"}
      alignContent={"center"}
    >
      <Box width={"100%"}>
        <Image src={headerImage} alt='header' width={"100%"} />
      </Box>
      <Box
        width={{
          xs: "100%",
          sm: "100%",
          md: "100%",
          lg: "85%",
        }}
        padding={{
          xs: 0,
          sm: 0,
          md: 4,
          lg: 8
        }}
        sx={{
          backgroundColor: onPrimary,
          backgroundImage: `url(${mainLayoutBackground})`,
          backgroundRepeat: "no-repeat",
          backgroundPositionY: "100%",
          position: "absolute",
          translate: "50%",
          left: "50%",
          top: "65%",
          borderRadius: borderRadiuos,
          border: "1px solid #E0E0E0",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            backgroundColor: primary,
            padding: 2,
            borderRadius: borderRadiuos,
          }}
        >
          <Stack direction={"row"} justifyContent={"space-between"} width={"100%"}>
            <Center>
              <Typography
                sx={{
                  color: onPrimary,
                  fontWeight: "bold",
                  fontSize: "x-large",
                }}
              >
                {pageName}
              </Typography>
            </Center>
            <Box display={"flex"} flexDirection={"row"} gap={1}>
              <Stack mx={3}>
                <Typography
                  sx={{
                    color: onPrimary,
                    fontWeight: "normal",
                    fontSize: "medium",
                    textAlign: "left",
                  }}
                >
                  {firstName} {lastName}
                </Typography>
                <Typography
                  sx={{
                    color: onPrimary,
                    fontWeight: "normal",
                    fontSize: "medium",
                    textAlign: "left",
                  }}
                >
                  {role}
                </Typography>
              </Stack>
              <IconButton
                sx={{
                  color: secondary,
                  width: "50px",
                  height: "50px",
                  padding: 0,
                }}
                onClick={handleMenu}
              >
                <AccountCircleRounded
                  sx={{
                    width: "50px",
                    height: "50px",
                    color: secondary,
                  }}
                />
              </IconButton>
              <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <CAN permissionNeeded="ADMIN">
                    <MenuItem onClick={()=>{
                      navigate("/admin")
                    }}>
                      پنل مدیریت
                    </MenuItem>
                  </CAN>
                </Menu>
              <Center>
                {window.location.pathname === "/home" ? (
                  <IconButton
                    sx={{
                      color: primary,
                      width: "45px",
                      height: "45px",
                      padding: 0,
                    }}
                    onClick={logout}
                  >
                    <Center
                      bgColor={secondary}
                      width={"100%"}
                      height={"100%"}
                      borderRadius={"100%"}
                    >
                      <svg
                        width="23"
                        height="24"
                        viewBox="0 0 23 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_217_1318)">
                          <path
                            d="M3.72697 18.686C2.89868 18.686 2.45774 19.6168 3.07066 20.174C4.30406 21.2951 5.78242 22.1395 7.40357 22.6363C9.67899 23.3336 12.1204 23.3109 14.3819 22.5713C16.6434 21.8318 18.6104 20.4129 20.0043 18.5156C21.3981 16.6184 22.1482 14.339 22.1482 12.0003C22.1482 9.66159 21.3981 7.38218 20.0043 5.48494C18.6104 3.58769 16.6434 2.1688 14.3819 1.42924C12.1204 0.689678 9.67899 0.666949 7.40357 1.36427C5.78242 1.86109 4.30406 2.70546 3.07066 3.8266C2.45774 4.38373 2.89868 5.31456 3.72697 5.31456H4.43193C4.67223 5.31456 4.90314 5.22628 5.09118 5.07666C6.34845 4.07633 7.85733 3.4222 9.46256 3.18523C11.1918 2.92996 12.9593 3.16963 14.5531 3.87546C16.1469 4.5813 17.4992 5.72332 18.4478 7.16449C19.3964 8.60565 19.901 10.2847 19.901 12.0003C19.901 13.7158 19.3964 15.3949 18.4478 16.8361C17.4992 18.2772 16.1469 19.4193 14.5531 20.1251C12.9593 20.8309 11.1918 21.0706 9.46256 20.8153C7.85733 20.5784 6.34845 19.9242 5.09118 18.9239C4.90314 18.7743 4.67223 18.686 4.43193 18.686H3.72697Z"
                            fill={primary}
                            stroke={primary}
                          />
                          <path
                            d="M5.61121 9.42871V10.643H11.926H12.426V11.143V12.8573V13.3573H11.926H5.61121V14.5716V15.5753L4.81002 14.9707L1.40261 12.3992L0.873758 12.0001L1.40261 11.601L4.81002 9.02961L5.61121 8.42498V9.42871Z"
                            fill={primary}
                            stroke={primary}
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_217_1318">
                            <rect
                              width="23"
                              height="24"
                              transform="matrix(-1 0 0 1 23 0)"
                              fill="white"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </Center>
                  </IconButton>
                ) : (
                  <IconButton
                    sx={{
                      color: secondary,
                      width: "53px",
                      height: "53px",
                      padding: 0,
                    }}
                    onClick={() => navigate(-1)}
                  >
                    <ArrowCircleLeftRounded
                      sx={{
                        width: "53px",
                        height: "53px",
                        color: secondary,
                      }}
                    />
                  </IconButton>
                )}
              </Center>
            </Box>
          </Stack>
        </Box>
        <Box padding={2}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default MainLayout;
