/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import UserList from "../../../components(app)/Admin/UserManager/UserList";
import NewModal from "../../../components/Modals";
import TextInput from "../../../components/TextInput";
import Selector from "../../../components/Selector";
import { useMutation } from "@apollo/client";
import { USER_SIGNUP } from "../../../GraphQL/MutationUser";
import { Stack } from "@mui/system";
import { onPrimary, primaryDark } from "../../../theme/Colors";
import LinkButton from "../../../components/LinkButton";

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

  const [userSignUp, { loading }] = useMutation(USER_SIGNUP, {
    onCompleted(data, clientOptions) {
      console.log(data);
      alert("کاربر با موفقیت اضافه شد");
    },
    onError(error) {
      console.log(error);
    },
  });

  return (
    <div>
      <UserList
        openModal={() => {
          setNewUserModal({
            ...newUserModal,
            open: !newUserModal.open,
          });
        }}
      />
      <NewModal
        name='افزودن کاربر جدید'
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
        <Stack spacing={2} width={'100%'}>
          <TextInput
            placeholder='نام کاربری'
            getText={(text: string) =>
              setNewUserModal({
                ...newUserModal,
                userName: text,
              })
            }
          />
          <TextInput
            placeholder='ایمیل'
            getText={(text: string) =>
              setNewUserModal({
                ...newUserModal,
                email: text,
              })
            }
          />

          <TextInput
            placeholder='نام'
            getText={(text: string) =>
              setNewUserModal({
                ...newUserModal,
                firstName: text,
              })
            }
          />

          <TextInput
            placeholder='نام خانوادگی'
            getText={(text: string) =>
              setNewUserModal({
                ...newUserModal,
                lastName: text,
              })
            }
          />

          <TextInput
            placeholder='کد ملی'
            getText={(text: string) =>
              setNewUserModal({
                ...newUserModal,
                nationalCode: text,
              })
            }
            type='number'
          />

          <TextInput
            placeholder='شماره تلفن'
            getText={(text: string) =>
              setNewUserModal({
                ...newUserModal,
                phoneNumber: text,
              })
            }
            type='number'
          />

          <Selector
            label='نوع کاربر'
            itemType="string"
            items={[
              { label: "مدیر", value: "superviser" },
              { label: "کاربر", value: "" },
            ]}
            getValue={(value: string) =>
              setNewUserModal({
                ...newUserModal,
                userType: value,
              })
            }
          />
          <LinkButton onClick={
            () => {
              userSignUp({
                variables: {
                  userName: newUserModal.userName,
                  email: newUserModal.email,
                  firstName: newUserModal.firstName,
                  lastName: newUserModal.lastName,
                  nationalCode: newUserModal.nationalCode,
                  phoneNumber: newUserModal.phoneNumber,
                  userType: newUserModal.userType,
                },
              });
            }
          }
          backgroundColor={primaryDark}
          textColor={onPrimary}
          >
            ثبت کاربر
          </LinkButton>
        </Stack>
      </NewModal>
    </div>
  );
};

export default UserManager;
