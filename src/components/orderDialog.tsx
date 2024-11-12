import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";
import CustomButton from "./customButton";
import CustomTextField from "./customTextField";

interface OrderDialogProps {
  open: boolean;
  onClose: () => void;
  handleCheckout: () => void;
  onOrderSubmit: (success: boolean) => void;
}

export default function OrderDialog({
  open,
  onClose,
  handleCheckout,
  onOrderSubmit,
}: OrderDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phoneNumber: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    address: "",
    email: "",
    phoneNumber: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let errors = {
      name: "",
      address: "",
      email: "",
      phoneNumber: "",
    };

    if (!formData.name) errors.name = "Name is required.";
    if (!formData.address) errors.address = "Address is required.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Please enter a valid email.";
    if (!formData.phoneNumber || !/^\d{10,13}$/.test(formData.phoneNumber))
      errors.phoneNumber = "Valid phone number is 10-13 digits.";

    setFormErrors(errors);

    return !Object.values(errors).some((error) => error !== "");
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        name: "",
        address: "",
        email: "",
        phoneNumber: "",
      });
      onOrderSubmit(true);
      onClose();
    }, 2000);
  };

  const handleCancel = () => {
    onOrderSubmit(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} fullWidth>
      <DialogTitle sx={{ p: 2, pb: 1 }}>Order Information</DialogTitle>
      <DialogContent sx={{ p: 2 }}>
        <Box sx={{ display: "flex", pt: 1, flexDirection: "column", gap: 2 }}>
          <CustomTextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!formErrors.name}
            helperText={formErrors.name}
          />
          <CustomTextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={!!formErrors.address}
            helperText={formErrors.address}
          />
          <CustomTextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
          />
          <CustomTextField
            type="number"
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            error={!!formErrors.phoneNumber}
            helperText={formErrors.phoneNumber}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ display: "flex", p: 2 }}>
        <CustomButton
          text="Cancel"
          variant="outlined"
          onClick={handleCancel}
          color="primary"
          fullWidth
        />
        <CustomButton
          text={isSubmitting ? "Submitting..." : "Order"}
          onClick={handleSubmit}
          isLoading={isSubmitting}
          fullWidth
        />
      </DialogActions>
    </Dialog>
  );
}
