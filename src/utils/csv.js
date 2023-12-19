export const generateCSVData = (comparisons) => {
  const data = [];
  const headers = [
    { label: "First Name", key: "firstname" },
    { label: "Last Name", key: "lastname" },
    { label: "Contact", key: "contact" },
    { label: "Company", key: "company" },
  ];
  comparisons.forEach((comparison) => {
    data.push(...comparison.matchedRecords);
  });

  return { data, headers };
};
