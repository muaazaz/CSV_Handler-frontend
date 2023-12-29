const mainDiv = {
    display: { md: "flex", xs: "none" },
  },
  responsiveDiv = {
    color: "#007AFF",
    display: { xs: "flex", md: "none" },
    flexGrow: "1",
  },
  appBar = {
    width: "100%",
    backgroundColor: "white",
    marginBottom: "3%",
    paddingInline: "3.75em",
  },
  responsiveNavStyles = {
    color: "gray",
    textDecoration: "none",
  },
  avatarDiv = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: "0",
  },
  logoText = {
    fontFamily: "A-Space-Demo-Light",
    color: "black",
    fontSize: "23px",
    lineHeight: "34.5px",
    marginLeft: "0.25rem",
    minHeight: "100%",
    marginRight: "5em",
  },
  nameText = {
    fontSize: "1.4375rem",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "150%",
    color: "black",
  },
  NavStyles = ({ isActive }) => {
    return {
      color: isActive ? "black" : "gray",
      borderBottom: isActive ? "4px solid #007AFF" : "none",
      textDecoration: "none",
      minHeight: "5em",
      marginLeft: "4%",
      display: "flex",
      alignItems: "center",
    };
  };

export {
  mainDiv,
  responsiveDiv,
  NavStyles,
  appBar,
  responsiveNavStyles,
  avatarDiv,
  logoText,
  nameText,
};
