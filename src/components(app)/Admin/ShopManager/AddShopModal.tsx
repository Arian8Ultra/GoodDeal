import React from 'react'
import NewModal from '../../../components/Modals'

interface Props {
  children?: React.ReactNode;
  loaded?: boolean;
  loading?: boolean;
  id?: string;
  className?: string;
  stores?: any;
  style?: React.CSSProperties;
}
const AddShopModal = () => {
  return (
    <NewModal
    name='افزودن فروشگاه'

  )
}

export default AddShopModal