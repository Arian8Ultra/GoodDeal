import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { MenuBook, MenuBookRounded, MenuRounded } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import IButton from "../../components/IButton";

const Shop = () => {
    let {shopId, categoryId} = useParams()
    let shop = useLocation().state
  return (
    <Box
    display={'grid'}
    gridTemplateColumns={{
      xs: 'repeat(1, 1fr)',
      sm: 'repeat(1, 1fr)',
      md: 'repeat(2, 1fr)',
      lg: 'repeat(2, 1fr)',
      xl: 'repeat(2, 1fr)',
    }}
    gap={'1rem'}
    padding={'1rem'}
    >

    </Box>
  )
}

export default Shop