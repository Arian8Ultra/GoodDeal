import { Box, Typography } from "@mui/material";
import Selector from "../../components/Selector";

export function SelectBar({
  ostans,
  setOstanId,
  cities,
  setCityId,
  ostanId,
  regions,
  setRegionId,
  cityId,
  neighborhoods,
  setNeighborhoodId,
  regionId,
}: {
  ostans: never[];
  setOstanId: Function | undefined;
  cities: never[];
  setCityId: Function | undefined;
  ostanId: number;
  regions: never[];
  setRegionId: Function | undefined;
  cityId: number;
  neighborhoods: never[];
  setNeighborhoodId: Function | undefined;
  regionId: number;
}) {
  return (
    <Box
      height={"80px"}
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "end",
        position: "relative",
        width: "80%",
        backgroundColor: "rgba(233, 235, 255, 0.38)",
        border: "1px solid #ccc",
        boxShadow: "0 0 10px #ccc",
        borderRadius: "25px",
      }}
    >
      <Box
        height={"100%"}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            bottom: "-25%",
          }}
        >
          <Typography variant="h6" component="h6" sx={{ mb: 1 }}>
            استان
          </Typography>
          <Selector
            items={ostans}
            width="10vw"
            fullWidth={true}
            getValue={setOstanId}
            backgroundColor="#fff"
            borderRadius={"15px"}
          />
        </Box>
      </Box>
      <Box
        height={"100%"}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            bottom: "-25%",
          }}
        >
          <Typography variant="h6" component="h6" sx={{ mb: 1 }}>
            شهر
          </Typography>
          <Selector
            items={cities}
            width="10vw"
            fullWidth={true}
            getValue={setCityId}
            backgroundColor="#fff"
            borderRadius={"15px"}
            disabled={ostanId ? false : true}
          />
        </Box>
      </Box>
      <Box
        height={"100%"}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            bottom: "-25%",
          }}
        >
          <Typography variant="h6" component="h6" sx={{ mb: 1 }}>
            منطقه
          </Typography>
          <Selector
            items={regions}
            width="10vw"
            fullWidth={true}
            getValue={setRegionId}
            backgroundColor="#fff"
            borderRadius={"15px"}
            disabled={cityId ? false : true}
          />
        </Box>
      </Box>
      <Box
        height={"100%"}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            bottom: "-25%",
          }}
        >
          <Typography variant="h6" component="h6" sx={{ mb: 1 }}>
            محله
          </Typography>
          <Selector
            items={neighborhoods}
            width="10vw"
            fullWidth={true}
            getValue={setNeighborhoodId}
            backgroundColor="#fff"
            borderRadius={"15px"}
            disabled={regionId ? false : true}
          />
        </Box>
      </Box>
    </Box>
  );
}
