import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { Star } from "@mui/icons-material";

export function LeftMenu() {
  return (
    <MenuList
      sx={{ p: 2, bgcolor: (theme) => theme.palette.menu.main, height: "100%" }}
    >
      {["Dashboard", "Submissions", "Quotations", "Policies", "Audit log"].map(
        (text) => (
          <MenuItem key={text}>
            <ListItemIcon
              sx={{ color: (theme) => theme.palette.menu.contrastText }}
            >
              <Star fontSize="small" />
            </ListItemIcon>
            <ListItemText
              sx={{ color: (theme) => theme.palette.menu.contrastText }}
            >
              {text}
            </ListItemText>
          </MenuItem>
        ),
      )}
    </MenuList>
  );
}
