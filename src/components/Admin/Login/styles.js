const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 15,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit * 3}px`
  },
  title: {
    padding: "15px",
    marginTop: "-30px",
    borderRadius: "3px",
    backgroundColor: theme.palette.primary.main,
    boxShadow: "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgb(138, 188, 228)",
    textAlign: "center",
    width: "100%"
  },
  headline: {
    color: "#FFFFFF",
    marginTop: 0,
    minHeight: "auto",
    fontWeight: 300,
    marginBottom: "3px",
    textDecoration: "none"
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

export default styles;
