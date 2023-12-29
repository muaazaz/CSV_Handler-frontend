const mainDiv = {
    backgroundColor: "white",
    margin: "0 auto",
    borderRadius: "24px",
    padding: "1.813rem 2.5rem",
  },
  headerDiv = {
    display: "flex",
    alignItems: "center",
    flexDirection: { md: "row", xs: "column" },
    gap: { md: "0rem", xs: "1rem" },
  },
  buttonsDiv = {
    display: "flex",
    justifyContent: { md: "flex-end", xs: "center" },
    alignItems: { md: "none", xs: "center" },
    flexGrow: "1",
  },
  searchField = {
    border: "1px solid #D9D9D9",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "2.813rem",
    borderRadius: "12px",
    width: "21.875rem",
    marginLeft: { md: "2rem", xs: "0rem" },
    padding: "0px, 8px, 0px, 16px",
  },
  searchInput = {
    border: "none",
    borderRadius: "12px",
    minHeight: "80%",
    width: "70%",
    fontFamily: "Poppins",
  };

export { mainDiv, headerDiv, buttonsDiv, searchField, searchInput };
