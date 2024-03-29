/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prefer-const */
import { Center, Text } from "@chakra-ui/react";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { Box, IconButton, Modal, Stack } from "@mui/material";
import {
  onPrimary,
  primaryLightTransparent
} from "../theme/Colors";
import { borderRadiuosMenu } from "../theme/Themes";

interface NewModalProps {
  width?: string | number | object;
  height?: string | number | object;
  color?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
  name?: string;
  open: boolean;
  onClose?: Function;
  backgroundColor?: string;
  isCloseable?: boolean;
  dividerColor?: string;
}

export default function NewModal(props: NewModalProps) {
  let { width,height, color, name, backgroundColor, isCloseable, dividerColor, ...rest } = props;
  name = props.name != null ? props.name : "عنوان";
  width = props.width != null ? props.width : "30vmax";
  backgroundColor = props.backgroundColor != null ? props.backgroundColor : primaryLightTransparent;
  isCloseable = props.isCloseable != null ? props.isCloseable : true;
  dividerColor = props.dividerColor != null ? props.dividerColor : "transparent";
  const handleClose = () => {
    if (props.isCloseable) props.onClose && props.onClose();
  };
  return (
    <Modal open={props.open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: width,
          maxHeight: height,
          bgcolor: backgroundColor,
          boxShadow: 24,
          borderRadius: borderRadiuosMenu,
          backdropFilter: "blur(5px)",
          p: 4,
          overflow: "auto",
        }}
        {...rest}
      >
        <Center>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            width={isCloseable ? "100%" : "max-content"}
          >
            <Text fontSize='25px' fontWeight='bold' color={color} textAlign={"center"}>
              {name}
            </Text>
            {isCloseable && (
              <IconButton onClick={handleClose}>
                <CancelRoundedIcon sx={{ color: color != null ? color : onPrimary }} />
              </IconButton>
            )}
          </Stack>
        </Center>
        <Box
          width='100%'
          height='2px'
          bgcolor={dividerColor}
          my={"10px"}
          borderRadius={"20px"}
        />
        <Center>{props.children}</Center>
      </Box>
    </Modal>
  );
}
