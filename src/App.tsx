import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { BrokerSelectionCard } from "./components/application/broker/BrokerSelectionCard";
import { AppMenu } from "./components/pageElements/AppMenu";
import { LeftMenu } from "./components/pageElements/LeftMenu";

function App() {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          flexGrow: 1,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AppMenu />
        <Box
          flex={1}
          display="grid"
          gridTemplateColumns="256px 1fr 256px"
          gridTemplateRows="1fr"
          gridTemplateAreas='"leftMenu main aside"'
          gap={2}
        >
          <Box gridColumn="leftMenu">
            <LeftMenu />
          </Box>
          <Box gridColumn="main">
            <Grid item xs={10} sx={{ p: 2 }}>
              <Box component="form" sx={{ flexGrow: 1 }}>
                <Stack spacing={2}>
                  <BrokerSelectionCard />
                </Stack>
              </Box>
            </Grid>
          </Box>
          <Box gridColumn="aside" component="aside">
            aside
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default App;
