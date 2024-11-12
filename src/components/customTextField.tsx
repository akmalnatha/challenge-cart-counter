import { SxProps, TextField, TextFieldProps } from "@mui/material";
import React from "react";

export default function CustomTextField(props: TextFieldProps) {
  return (
    <TextField
      {...props}
      sx={{
        ...(props.sx as SxProps),
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          "& fieldset": {
            borderColor: "neutrals.400",
          },
          "&:hover fieldset": {
            borderColor: "primary.light",
          },
          "&.Mui-focused fieldset": {
            borderColor: "primary.main",
          }
        },
        "& .MuiFilledInput-root": {
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          "&:before, &:after": {
            borderBottom: "1px solid", 
            borderColor: "neutrals.400",
          },
          "&:hover:before": {
            borderColor: "primary.light", 
          },
          "&.Mui-focused:after": {
            borderColor: "primary.main", 
          },
          "&:focus-within": {
            bgcolor: "primary.100",
          },
        },
        "& .MuiInput-root": {
          "&:before, &:after": {
            borderBottom: "1px solid", 
            borderColor: "neutrals.400",
          },
          "&:hover:not(.Mui-disabled, .Mui-error):before": {
            borderColor: "primary.light", 
          },
          "&:hover:after": {
            borderColor: "primary.light", 
          },
          "&.Mui-focused:after": {
            borderColor: "primary.main", 
          }
        },
        "& .MuiInputLabel-root": {
          color: "neutrals.400",
        },
        "& .MuiFormHelperText-root": {
          marginX: 0,
          color: "neutrals.400"
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "primary.main",
        },
        "& .MuiOutlinedInput-root.Mui-disabled": {
          "& fieldset": {
            borderColor: "neutrals.100",
          },
          "& input": {
            color: "neutrals.100",
            WebkitTextFillColor: "neutrals.100",
          },
        },
        "& .MuiInputLabel-root.Mui-disabled": {
          color: "neutrals.100",
        },
      }}
    ></TextField>
  );
}
