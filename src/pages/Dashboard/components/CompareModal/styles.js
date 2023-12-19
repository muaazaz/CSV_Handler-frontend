const mainContainer = {
    backgroundColor: "white",
    width: "80%",
    margin: "0 auto",
    padding: "1.5em 2.5em",
    borderRadius: "23px",
  },
  headerContainer = {
    display: "flex",
    flexGrow: "1",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tagsContainer = {
    display: "flex",
    flexDirection: "column",
  },
  tagHeaderStyle = {
    fontSize: "1.1875rem",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "150%",
  },
  selectedContainer = {
    display: "flex",
    alignItems: "center",

    justifyContent: "space-between",
    marginBottom: "1.19rem",
  },
  tagNameStyles = {
    fontSize: "1.4375rem",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "150%",
  },
  tagInfoStyles = {
    display: "flex",
    gap: "0.4rem",
  },
  bottomContainer = {
    display: "flex",
    flexGrow: "1",
    justifyContent: "flex-end",
  },
  divider = { margin: "1.5rem 0rem" },
  textStyles = {
    fontSize: "1.438rem",
    lineHeight: "2.156rem",
    fontWeight: "500",
    margin: "1rem 0rem",
  },
  checkboxStyles = {
    height: "1.3rem",
    width: "1.3rem",
    boxShadow: "0 0 0 2px #5184EC;",
    borderRadius: "0.1rem",
  };

export {
  mainContainer,
  tagsContainer,
  bottomContainer,
  headerContainer,
  divider,
  textStyles,
  tagHeaderStyle,
  selectedContainer,
  tagNameStyles,
  tagInfoStyles,
  checkboxStyles,
};
