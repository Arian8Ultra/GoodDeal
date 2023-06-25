import React from "react";
import LinkButton from "../../../components/LinkButton";
import AddShopModal from "../../../components(app)/Admin/ShopManager/AddShopModal";

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
      <LinkButton
        onClick={() => setAddModal({ ...addModal, open: !addModal.open })}
      >افزودن فروشگاه</LinkButton>
      <AddShopModal open={addModal.open} changeModal={
        () => setAddModal({ ...addModal, open: !addModal.open })
      }/>
    </div>
  );
};

export default ShopManager;
