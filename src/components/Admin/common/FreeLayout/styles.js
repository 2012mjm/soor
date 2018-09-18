import layoutBackground from "./images/background.jpg";

const styles = theme => ({
  layout: {
    color: "#fff",
    border: 0,
    height: "100%",
    margin: 0,
    display: "flex",
    position: "relative",
    maxHeight: "1000px",
    minHeight: "100vh",
    alignItems: "center",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundImage: `url(${layoutBackground})`
  },
  mask: {
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "block",
    content: "",
    zIndex: 2,
    position: "absolute"
  },
  container: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(350 + theme.spacing.unit * 3 * 2)]: {
      width: 350,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
});

export default styles;
