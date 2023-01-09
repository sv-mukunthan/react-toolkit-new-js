import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import uuid from "react-uuid";

export default function SelectBox({
  options,
  value,
  label,
  onChange,
  error,
  errorText,
  style,
  name,
}) {
  return (
    <FormControl sx={{ width: "100%", margin: "16px 0 8px 0", ...style }}>
      <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
      <Select
        fullWidth
        error={error}
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={value}
        label={label}
        onChange={onChange}
        defaultValue={value || ""}
        name={name}
      >
        {options.map((option) => (
          <MenuItem value={option.value} key={uuid()} disabled={!option.value}>
            <p style={{ margin: 0 }}>
              {!option.value ? "Select" : option.title}
            </p>
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText error>{errorText}</FormHelperText>}
    </FormControl>
  );
}
