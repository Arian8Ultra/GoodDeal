import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import TextInput from "../../components/TextInput";
import LinkButton from "../../components/LinkButton";
import { GET_PRICE_RECORDS_BY_PRODUCT_AND_USER_AND_SHOP } from "../../GraphQL/QueryProducts";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { usePersistStore } from "../../stores/PersistStore";
import { ADD_PRICE_RECORD } from "../../GraphQL/MutationProduct";
import { Green, Red, primary } from "../../theme/Colors";
interface Props {
  id?: string | number;
  title?: string;
  price?: number;
  isApproved?: boolean;
  unit?: string;
}
const ProductCard = (props: Props) => {
  const [price, setPrice] = useState(props.price || "");
  const [buttonColor, setButtonColor] = useState(primary);
  const [isApproved, setIsApproved] = useState(
    props.isApproved || false
  );
  const { shopId } = useParams<{ shopId: string }>();
  const userId = usePersistStore((state) => state.id);
  const {
    loading: priceLoading,
    error: priceError,
    data: priceData,
  } = useQuery(GET_PRICE_RECORDS_BY_PRODUCT_AND_USER_AND_SHOP, {
    variables: {
      productId: props.id,
      userId: userId && userId,
      shopId: shopId && parseInt(shopId),
    },
    onCompleted(data) {
      console.log(data);
      setPrice(
        data.priceRecord_getTodayPriceRecords.result.items[0].price
      );
      setIsApproved(
        data.priceRecord_getTodayPriceRecords.result.items[0]
          .isApproved
      );
    },
    onError(error) {
      console.log(error);
    },
  });

  const [addPriceRecord] = useMutation(ADD_PRICE_RECORD, {
    onCompleted(data) {
      console.log(data);
      setButtonColor(Green);
      if(data.priceRecord_addPriceRecord.result.isApproved){
        setIsApproved(true)
        setButtonColor(primary)
      }
    },
    onError(error) {
      console.log(error);
      setButtonColor(Red);
    },
  });
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100%"}
      padding={"1rem"}
      boxShadow={"0 0 10px rgba(0,0,0,0.2)"}
      borderRadius={"15px"}
      gap={"1rem"}
    >
      <Typography variant={"h6"}>{props.title}</Typography>
      <Typography variant={"h6"}>{props.price}</Typography>
      <TextInput
        label="قیمت محصول"
        value={String(price)}
        getText={(e: string) => setPrice(parseFloat(e))}
        width={"100%"}
        fullWidth={true}
        hasStickyText={true}
        stickyTextColor="rgba(0,0,0,0.5)"
        stickyText={props.unit}
        disabled={isApproved}
      />
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
        gap={"1rem"}
      >
        <LinkButton
          backgroundColor={buttonColor}
          disabled={isApproved}
          onClick={() => {
            addPriceRecord({
              variables: {
                isApproved: false,
                price: price,
                productId: props.id,
                shopId: shopId && parseInt(shopId),
                userId: userId && userId,
              },
            });
          }}
        >
          ذخیره
        </LinkButton>
        <LinkButton
          backgroundColor={isApproved ? Green : primary}
          disabled={isApproved}
          onClick={() => {
            addPriceRecord({
              variables: {
                isApproved: true,
                price: price,
                productId: props.id,
                shopId: shopId && parseInt(shopId),
                userId: userId && userId,
              },
            });
          }}
        >
          ثبت
        </LinkButton>
      </Box>

      {!isApproved && (
        <Typography variant={"body2"}>در انتظار تایید</Typography>
      )}
      {isApproved && (
        <Typography variant={"body2"}>تایید شده</Typography>
      )}
    </Box>
  );
};

export default ProductCard;
