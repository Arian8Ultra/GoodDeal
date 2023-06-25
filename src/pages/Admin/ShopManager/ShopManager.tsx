import React from "react";
import LinkButton from "../../../components/LinkButton";

const ShopManager = () => {
  const [addModal, setAddModal] = React.useState({
    open: false,
    cityId: "",
    fullAddress: "",
    goodsType: "",
    plaque: "",
    imageName: "",
    name: "",
    ownerFullName: "",
    phoneNumber: "",
    postalCode: "",
    provinceId: "",
    regionId: "",
    subregionId: "",
    xCoordinate: "",
    yCoordinate: "",
  });
  return (
    <div>
      <LinkButton>افزودن فروشگاه</LinkButton>
    </div>
  );
};

export default ShopManager;
