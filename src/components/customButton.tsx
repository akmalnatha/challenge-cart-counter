"use client";

import styled from "@emotion/styled";
import { FileUpload } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  ButtonProps,
  SxProps,
  Theme,
} from "@mui/material";
import { ReactElement, MouseEventHandler, FormEventHandler } from "react";

interface CustomButtonProps extends ButtonProps {
  text?: string;
  fullHeight?: boolean;
  isLoading?: boolean;
  textWeight?: number;
  icon?: ReactElement;
  iconPosition?: "start" | "end";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onSubmit?: FormEventHandler<HTMLButtonElement>;
  file?: boolean;
  multipleFile?: boolean;
  onFileChange?: (files: FileList | null) => void;
  sx?: SxProps<Theme>;
}

export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: "100%",
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: "100%",
});
function CustomButton({
  text,
  variant = "contained",
  isLoading = false,
  textWeight = 400,
  icon,
  iconPosition = "start",
  size = "small",
  fullHeight = false,
  file = false,
  multipleFile = false,
  onFileChange,
  sx,
  ...buttonProps
}: CustomButtonProps) {
  const displayIcon = file ? (
    <FileUpload sx={{ fontSize: { xs: 16, sm: 24, md: 32 } }} />
  ) : (
    icon
  );

  if (text && displayIcon && !isLoading) {
    buttonProps[iconPosition === "start" ? "startIcon" : "endIcon"] =
      displayIcon;
  }

  return (
    <Button
      variant={variant}
      size={size}
      {...buttonProps}
      sx={{
        position: "relative",
        minWidth: 0,
        height: !fullHeight ? "auto" : "100%",
        lineHeight: text ? 1.2 : 0,
        // bgcolor:
        //   variant == "contained"
        //     ? `${customColor}.${mainColor}`
        //     : "transparent",
        // color:
        //     variant == "contained"
        //       ? `${customColor}.${textColor}`
        //       : `${customColor}.${mainColor}`,
        fontWeight: textWeight,
        borderWidth: variant == "outlined" ? 1 : 0,
        // borderColor: `${customColor}.${mainColor}`,
        borderRadius: 2.25,
        px: !fullHeight
          ? text
            ? size == "large"
              ? 3.5
              : size == "medium"
              ? 4
              : 3.25
            : 0
          : undefined,
        py: !fullHeight
          ? text
            ? size == "large"
              ? 2.5
              : size == "medium"
              ? 2
              : 1.25
            : 0
          : undefined,
        fontSize: {
          xs: size === "large" ? 24 : 12,
          md: size === "large" ? 28 : size === "medium" ? 15 : 12,
          lg: size === "large" ? 32 : size === "medium" ? 18 : 14,
        },
        // "&.MuiButtonBase-root, & .MuiButton-root": {
        //   color:
        //     variant == "contained"
        //       ? `${customColor}.${textColor}`
        //       : `${customColor}.${mainColor}`
        // },
        // "&:hover": {
        //   bgcolor:
        //     variant == "contained"
        //       ? `${customColor}.${mainColorHover}`
        //       : `${customColor}.50`,
        //   color:
        //     variant == "contained"
        //       ? `${customColor}.${textColor}`
        //       : `${customColor}.${mainColorHover}`,
        //   borderColor: `${customColor}.${mainColorHover}`,
        // },
        "&:active": {
          transform: "scale(0.98)",
        },
        ...(text === undefined && {
          "& .MuiButton-startIcon, & .MuiButton-endIcon": {
            margin: 0,
            color: "inherit"
          },
        }),
        "&.Mui-disabled": {
        //   color:
        //     variant == "contained"
        //       ? `${customColor}.${textColor}`
        //       : `${customColor}.${mainColor}`,
        //   bgcolor:
        //     variant == "contained"
        //       ? `${customColor}.${mainColor}`
        //       : "transparent",
        //   borderColor: `${customColor}.${mainColor}`,
          cursor: "not-allowed",
        //   opacity: 0.5,
        },
        ...sx,
      }}
    >
      {isLoading ? (
        <CircularProgress size={20} sx={{ color: "neutrals.light" }} />
      ) : text ? (
        text
      ) : (
        displayIcon
      )}
      {file && (
        <VisuallyHiddenInput
          type="file"
          onChange={(event) => {
            if (onFileChange) {
              onFileChange(event.target.files);
            }
          }}
          multiple={multipleFile}
        />
      )}
    </Button>
  );
}

export default CustomButton;
