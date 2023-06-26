import React from 'react'
import LocationList from '../../../components(app)/Admin/LocationManager/LocationList'
import { Box } from '@mui/material'
import { Stack } from '@chakra-ui/layout'
import TextInput from '../../../components/TextInput'

const LocationManager = () => {
  const [provinceSearch, setProvinceSearch] = React.useState('')
  const [citySearch, setCitySearch] = React.useState('')
  const [regionSearch, setRegionSearch] = React.useState('')
  const [neighborhoodSearch, setNeighborhoodSearch] = React.useState('')

  return (
    <div>
      {/* <Stack
      spacing={8}
      bgColor={"rgba(255,255,255,0.5)"}
      padding={"2rem"}
      borderRadius={"25px"}
      direction={"row"}
      my={"2rem"}
      justifyContent={"space-evenly"}
      style={{
        backdropFilter: "blur(10px)",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",

      }}
    >
      <TextInput label={"جستجو استان"} />
      <TextInput label={"جستجو شهر"} />
      <TextInput label={"جستجو منطقه"} />
      <TextInput label={"جستجو محله"} />

    </Stack> */}
      <LocationList/>
    </div>
  )
}

export default LocationManager