import {
  AppBar,
  Autocomplete,
  Box,
  Button,
  createTheme,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  Link,
  Stack,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import image from "../image/image.webp";

const Header = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "#fde8ef",
        minHeight: 120,
        justifyContent: "center",
        boxShadow: "none",
      }}
    >
      <Stack
        sx={{
          minHeight: "unset",
          alignItems: "flex-start",
          position: "relative",
          bgcolor: "#fde8ef",
        }}
      >

      </Stack>
    </AppBar>
  );
};

export default Header;
