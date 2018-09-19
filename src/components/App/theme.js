import { createMuiTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

const theme = createMuiTheme({
  direction: "rtl",
  palette: {
    primary: blue
  },
  typography: {
    fontSize: 12,
    button: {
      fontSize: "1rem"
    }
  }
});

export default theme;
