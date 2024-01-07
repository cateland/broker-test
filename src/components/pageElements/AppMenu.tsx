import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export function AppMenu() {
  return (
    <AppBar position="static" component="nav">
      <Toolbar>
        <Stack direction="row" spacing={2} alignItems="baseline">
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            Tinubu
          </Typography>
          <Typography variant="subtitle2" component="h2" sx={{ flexGrow: 1 }}>
            Credit Solution Vanilla
          </Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
