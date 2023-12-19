const mainContainer = {
    minHeight: "42.125em",
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
  uploadContainer = {
    height: "28.125rem",
    backgroundColor: "#E6EDFB",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "23px",
    cursor: "pointer",
  },
  cancelContainer = {
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
  uploadingTextStyle = {
    fontSize: "0.75rem",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "150%",
    marginTop: "1rem",
  };

export {
  mainContainer,
  uploadContainer,
  cancelContainer,
  headerContainer,
  divider,
  textStyles,
  uploadingTextStyle,
};
