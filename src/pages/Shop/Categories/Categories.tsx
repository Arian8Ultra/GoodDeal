import React, { useState } from 'react'
import { GET_CATEGORIES } from '../../../GraphQL/Queries.shop'
import { useQuery } from '@apollo/client';
import { Box } from '@mui/material';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const {loading , error} = useQuery(GET_CATEGORIES, {
        onCompleted: (data) => {
            console.log(data);
            setCategories(data.shop_getCategories.result.items);
        },
        onError: (e) => {
            console.log(e);
        },
    })
  return (
    <Box display={"grid"} 
    gridTemplateColumns={{
        xs: "repeat(1, 1fr)",
        sm: "repeat(1, 1fr)",
        md: "repeat(1, 1fr)",
        lg: "repeat(1, 1fr)",
        xl: "repeat(1, 1fr)",
      }}
      gap={"1rem"}
      padding={"1rem"}>
        {categories.map((category:any)=>(
            <Box key={category.id}>
                <h1>{category.name}</h1>
            </Box>
        ))}
      </Box>

  )
}

export default Categories