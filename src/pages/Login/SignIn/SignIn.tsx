import { Form } from "react-router-dom";
import TextInput from "../../../components/TextInput";
import { Stack } from "@mui/material";
import LinkButton from "../../../components/LinkButton";
import { Center, Image } from "@chakra-ui/react";
import logo from "../../../assets/logo.svg";
import { useState } from "react";
import { VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material";
import { primary, primaryLightTransparent, secondary } from "../../../theme/Colors";
import { SIGNIN } from "../../../api/api";
import { usePersistStore } from "../../../stores/PersistStore";

const SignIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const setUser = usePersistStore((state) => state.setUser);
  const firstName = usePersistStore((state) => state.firstName);
  const lastName = usePersistStore((state) => state.lastName);
  const token = usePersistStore((state) => state.token);

  const handleSignIn = () => {
    setLoading(true);
    setError(false);
    SIGNIN({
      username: userName,
      password: password,
      onSuccess: (res: any) => {
        console.log(res);
        setUser(res.firstName, res.lastName, res.token);
        setLoading(false);
      },
      onFail: (err: any) => {
        console.log(err);
        setLoading(false);
        setError(true);
      },
    });
  };
  return (
    <Form onSubmit={handleSignIn}>
      <Stack width={"100%"} spacing={5}>
        <Center>
          <Image
            src={logo}
            width={'70%'}
            objectFit={"cover"}
            objectPosition={"center"}
            alt={"user profile picture"}
          />
        </Center>
        <TextInput
          id="username"
          name="userName"
          getText={setUserName}
          label="نام کاربری"
          dir="rtl"
          width={{
            xs: "100%",
            sm: "100%",
            md: "20vmax",
            lg: "20vmax",
            xl: "20vmax",
          }}
        />
        <TextInput
          id="password"
          name="password"
          getText={setPassword}
          label="رمز عبور"
          dir="rtl"
          type={showPassword ? "text" : "password"}
          width={{
            xs: "100%",
            sm: "100%",
            md: "20vmax",
            lg: "20vmax",
            xl: "20vmax",
          }}
          hasIcon
          icon={!showPassword ? <VisibilityOffRounded /> : <VisibilityRounded />}
          iconClick={() => setShowPassword(!showPassword)}
          iconColor={primary}
        />
        <LinkButton type="submit">ورود</LinkButton>
        <LinkButton
          backgroundColor="transparent"
          textColor={primary}
          hoverColor={primaryLightTransparent}
          link="/signup"
        >
          ثبت نام
        </LinkButton>
      </Stack>
    </Form>
  );
};

export default SignIn;
