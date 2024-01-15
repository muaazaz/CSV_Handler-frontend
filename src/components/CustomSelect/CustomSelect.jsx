import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const CustomSelect = ({
  placeholder,
  options,
  value,
  setValue,
  label,
  disabled,
  removeArrow,
  defaultValue,
}) => {
  const [inputProps, setInputProps] = useState({});
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    if (removeArrow) setInputProps({ IconComponent: () => null });
  }, [removeArrow]);
  return (
    <FormControl sx={{ minWidth: "27.5rem", marginBottom: "1rem" }}>
      <Typography
        sx={{
          fontSize: "0.75rem",
          fontWeight: 500,
          lineHeight: "150%",
          marginBottom: "0.5rem",
        }}
      >
        {label}:
      </Typography>
      <Select
        onChange={handleChange}
        value={value || ""}
        defaultValue={defaultValue}
        disabled={disabled}
        renderValue={(val) => {
          if (!val) {
            return <em>{placeholder}</em>;
          }
          return val;
        }}
        inputProps={inputProps}
        sx={{ borderRadius: "0.5rem", height: "2.8125rem" }}
      >
        {options.map((option, index) => (
          <MenuItem key={index + option.name} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
