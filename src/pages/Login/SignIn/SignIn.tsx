import { useMutation } from "@apollo/client";
import { Center, Image } from "@chakra-ui/react";
import {
  VisibilityOffRounded,
  VisibilityRounded,
} from "@mui/icons-material";
import { CircularProgress, Stack } from "@mui/material";
import { useState } from "react";
import { Form } from "react-router-dom";
import { USER_SIGNIN } from "../../../GraphQL/MutationUser";
import logo from "../../../assets/logo.svg";
import LinkButton from "../../../components/LinkButton";
import TextInput from "../../../components/TextInput";
import { convertRoleToPersian } from "../../../functions/function";
import { usePersistStore } from "../../../stores/PersistStore";
import useAbilityStore from "../../../stores/abilityStore";
import { primary } from "../../../theme/Colors";

const SignIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const setUser = usePersistStore((state) => state.setUser);
  const firstName = usePersistStore((state) => state.firstName);
  const lastName = usePersistStore((state) => state.lastName);
  const token = usePersistStore((state) => state.token);
  const addAbility = useAbilityStore((state) => state.addAbility);

  const [SignIn, { loading, error }] = useMutation(USER_SIGNIN, {
    variables: {
      userName: userName,
      password: password,
    },
    onCompleted: (data) => {
      console.log(data);
      console.log("permission added");
      setUser(
        data.user_signIn.result.user?.firstName,
        data.user_signIn.result.user?.lastName,
        data.user_signIn.result?.token,
        data.user_signIn.result.user?.userRoles.length > 0
          ? convertRoleToPersian(
              data.user_signIn.result.user?.userRoles[0].roleType
            )
          : "",
        data.user_signIn.result.user?.id
      );
      data.user_signIn.result.user?.userRoles &&
        data.user_signIn.result.user?.userRoles.map((role: any) => {
          addAbility(role.roleType);
          console.log(role.roleType);
        });
      sessionStorage.setItem("token", data.user_signIn.result?.token);
      localStorage.setItem("token", data.user_signIn.result?.token);
      sessionStorage.setItem("userId", data.user_signIn.result.user?.id);
      localStorage.setItem("userId", data.user_signIn.result.user?.id);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleSignIn = () => {
    // SIGNIN({
    //   username: userName,
    //   password: password,
    //   onSuccess: (res: any) => {
    //     console.log(res);
    //     setUser(res.firstName, res.lastName, res.token);
    //   },
    //   onFail: (err: any) => {
    //     console.log(err);
    //   },
    // });
    SignIn();
    // setUser('آرین','رضایی','123456789')
  };
  return (
    <Form onSubmit={handleSignIn}>
      <Stack width={"100%"} spacing={5}>
        <Center>
          <Image
            src={logo}
            width={"70%"}
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
          icon={
            showPassword ? (
              <VisibilityOffRounded />
            ) : (
              <VisibilityRounded />
            )
          }
          iconClick={() => setShowPassword(!showPassword)}
          iconColor={primary}
        />
        <LinkButton width={"100%"} type="submit" onClick={handleSignIn} disabled={loading} icon={
          loading ? <CircularProgress variant="indeterminate" /> : null
        }>
          ورود
        </LinkButton>
      </Stack>
    </Form>
  );
};

export default SignIn;
