import { createMuiTheme } from "@material-ui/core/styles";
import {Shadows} from "@material-ui/core/styles/shadows";

const theme = createMuiTheme({
  // shadows: Array(25).fill("none") as Shadows,
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
  },
});

export default theme;
