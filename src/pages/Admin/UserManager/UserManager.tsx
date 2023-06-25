/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import UserList from "../../../components(app)/Admin/UserManager/UserList";
import NewModal from "../../../components/Modals";
import TextInput from "../../../components/TextInput";
import Selector from "../../../components/Selector";
import { useMutation } from "@apollo/client";
import {
  ADD_ROLE_TO_USER,
  USER_SIGNUP,
} from "../../../GraphQL/MutationUser";
import { Stack } from "@mui/system";
import { onPrimary, primaryDark } from "../../../theme/Colors";
import LinkButton from "../../../components/LinkButton";
import { Typography } from "@mui/material";

const UserManager = () => {
  const [newUserModal, setNewUserModal] = React.useState({
    open: false,
    name: "افزودن کاربر جدید",
    email: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    nationalCode: "",
    password: "",
    phoneNumber: "",
    userName: "",
    userType: "",
  });

  const [roleModal, setRoleModal] = React.useState({
    open: false,
    name: "افزودن نقش به کاربر",
    roleType: "",
    userId: "",
    user:{
      firstName:"",
      lastName:"",
      userName:"",
      id:"",
    }
  });

  const [userSignUp, { loading }] = useMutation(USER_SIGNUP, {
    onCompleted(data, clientOptions) {
      console.log(data);
      alert("کاربر با موفقیت اضافه شد");
    },
    onError(error) {
      console.log(error);
    },
  });

  const [addRoleToUser, { loading: loadingAddUserToRole }] =
    useMutation(ADD_ROLE_TO_USER);

  return (
    <div>
      <UserList
        openModal={() => {
          setNewUserModal({
            ...newUserModal,
            open: !newUserModal.open,
          });
        }}
        addRole={(user: any) => {
          setRoleModal({
            ...roleModal,
            open: !roleModal.open,
            userId: user.id,
            user:user
          });
        }}
      />
      <NewModal
        name="افزودن کاربر جدید"
        open={newUserModal.open}
        changeModal={() =>
          setNewUserModal({
            ...newUserModal,
            open: !newUserModal.open,
          })
        }
        isCloseable={true}
        backgroundColor={onPrimary}
        color={primaryDark}
      >
        <Stack spacing={2} width={"80%"}>
          <TextInput
            width={"100%"}
            label="نام کاربری"
            placeholder="نام کاربری"
            getText={(text: string) =>
              setNewUserModal({
                ...newUserModal,
                userName: text,
              })
            }
          />

          <TextInput
            width={"100%"}
            label="رمز عبور"
            placeholder="رمز عبور"
            autoComplete="password"
            type="password"
            getText={(text: string) =>
              setNewUserModal({
                ...newUserModal,
                password: text,
              })
            }
          />

          <TextInput
            width={"100%"}
            type="password"
            label="تکرار رمز عبور"
            placeholder="تکرار رمز عبور"
            getText={(text: string) =>
              setNewUserModal({
                ...newUserModal,
                confirmPassword: text,
              })
            }
          />

          <TextInput
            width={"100%"}
            label="ایمیل"
            placeholder="ایمیل"
            getText={(text: string) =>
              setNewUserModal({
                ...newUserModal,
                email: text,
              })
            }
          />

          <TextInput
            width={"100%"}
            label="نام"
            placeholder="نام"
            getText={(text: string) =>
              setNewUserModal({
                ...newUserModal,
                firstName: text,
              })
            }
          />

          <TextInput
            width={"100%"}
            label="نام خانوادگی"
            placeholder="نام خانوادگی"
            getText={(text: string) =>
              setNewUserModal({
                ...newUserModal,
                lastName: text,
              })
            }
          />

          <TextInput
            width={"100%"}
            label="کد ملی"
            placeholder="کد ملی"
            getText={(text: string) =>
              setNewUserModal({
                ...newUserModal,
                nationalCode: text,
              })
            }
            type="number"
          />

          <TextInput
            width={"100%"}
            placeholder="شماره تلفن"
            label="شماره تلفن"
            getText={(text: string) =>
              setNewUserModal({
                ...newUserModal,
                phoneNumber: text,
              })
            }
            type="number"
          />

          <Selector
            label="نوع کاربر"
            itemType="object"
            valueOut="value"
            items={[
              { name: "مدیر", value: "SUPER_ADMIN" },
              { name: "مامور", value: "ADMIN" },
              { name: "ادیتور", value: "EDITOR" },
              { name: "کاربر معمولی", value: "NORMAL" },
            ]}
            getValue={(value: string) =>
              setNewUserModal({
                ...newUserModal,
                userType: value,
              })
            }
          />
          <LinkButton
            onClick={() => {
              userSignUp({
                variables: {
                  userName: newUserModal.userName,
                  email: newUserModal.email,
                  firstName: newUserModal.firstName,
                  lastName: newUserModal.lastName,
                  nationalCode: newUserModal.nationalCode,
                  phoneNumber: newUserModal.phoneNumber,
                  password: newUserModal.password,
                  confirmPassword: newUserModal.confirmPassword,
                },
                onCompleted(data, clientOptions) {
                  console.log(data);
                  alert("کاربر با موفقیت اضافه شد");
                },
                onError(error) {
                  console.log(error);
                },
              });
            }}
            backgroundColor={primaryDark}
            textColor={onPrimary}
          >
            ثبت کاربر
          </LinkButton>
        </Stack>
      </NewModal>

      <NewModal
        name={"افزودن نقش به کاربر"}
        open={roleModal.open}
        changeModal={() =>
          setRoleModal({
            ...roleModal,
            open: !roleModal.open,
          })
        }
        isCloseable={true}
        backgroundColor={onPrimary}
        color={primaryDark}
      >
        <Stack spacing={2} width={"80%"}>
          <Typography variant="h6" color="textPrimary">
            {roleModal.user.firstName + " " + roleModal.user.lastName}
          </Typography>
          <Selector
            label="نوع نقش"
            itemType="object"
            valueOut="value"
            items={[
              { name: "مدیر ارشد", value: "SUPER_ADMIN" },
              { name: "مدیر", value: "ADMIN" },
              { name: "ادیتور", value: "EDITOR" },
              { name: "کاربر معمولی", value: "NORMAL" },
            ]}
            getValue={(value: string) =>
              setRoleModal({
                ...roleModal,
                roleType: value,
              })
            }
          />
          <LinkButton
            onClick={() => {
              addRoleToUser({
                variables: {
                  userId: roleModal.userId,
                  roleType: roleModal.roleType,
                },
                onCompleted(data, clientOptions) {
                  console.log(data);
                  alert("نقش با موفقیت اضافه شد");
                  window.location.reload();
                },
                onError(error) {
                  console.log(error);
                },
              });
            }}
            backgroundColor={primaryDark}
            textColor={onPrimary}
          >
            افزودن نقش
          </LinkButton>
        </Stack>
      </NewModal>
    </div>
  );
};

export default UserManager;
