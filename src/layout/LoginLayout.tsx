import { Box, Typography } from "@mui/material";
import gandonPattern from "../assets/Gandom.png";
import { Image } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import { primary, primaryLight } from "../theme/Colors";
import { useEffect } from "react";

interface LoginLayoutProps {
  children?: React.ReactNode;
  id?: string;
}
const LoginLayout = (props: LoginLayoutProps) => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(()=>{
    if(token){
      navigate("/home")
    }
  },[navigate, token])
  return (
    <Box
      height={"100dvh"}
      width={"100dvw"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      position={"relative"}
    >
      <Image
        src={gandonPattern}
        position={"absolute"}
        top={"50%"}
        left={"70%"}
        height={"100%"}
        objectFit={"cover"}
        objectPosition={"center"}
        zIndex={-1}
        transform={"translate(-50%, -50%)"}
      />
      <Box
        width={"100%"}
        height={"max-content"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        padding={"2rem"}
        sx={{
            "@media (max-width: 600px)": {
                flexDirection: "column",
                width: "max-content",
            },
            "@media (min-width: 600px)": {
                flexDirection: "row",
                width: "max-content",
            },
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: "35px",
            backdropFilter: "blur(10px)",
            border: `1.5px solid ${primaryLight}`,
        }}
      >
        <Outlet/>
        {props.children}
      </Box>
      <Typography sx={{
        position:'fixed',
        bottom:0,
        right:0,
        color:'black',
        fontSize:'0.5rem'
      }}>
        v{import.meta.env.REACT_APP_VERSION ? import.meta.env.REACT_APP_VERSION : 1.6}
      </Typography>
    </Box>
  );
};

export default LoginLayout;
