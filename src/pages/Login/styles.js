const mainContainer = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  loginForm = {
    width: { md: "40%", xs: "90%" },
    boxShadow: "1px 0px 10px 1px grey",
    borderRadius: "23px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: "22em",
    padding: "1rem",
  },
  logo = { maxWidth: "20em", maxHeight: "20em" },
  headerText = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  welcomeText = {
    textAlign: "center",
    fontSize: { md: "3em", xs: "2em" },
    fontWeight: "bold",
  },
  forgotPassText = { color: "gray", textAlign: "center", marginTop: "1em" };

export {
  loginForm,
  logo,
  mainContainer,
  forgotPassText,
  welcomeText,
  headerText,
};
