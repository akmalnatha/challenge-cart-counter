"use client";

import { useState } from "react";
import {
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Alert,
  Snackbar,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import Cart from "./sub-sections/cart";
import CustomButton from "./customButton";

interface CartProps {
  cart: Cart;
  handleQuantityChange: (productId: number, quantity: number) => void;
  handleCheckout: () => void;
}

export default function CartDrawer({
  cart,
  handleQuantityChange,
  handleCheckout,
}: CartProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ display: { xs: "block", md: "none" }, zIndex: 50 }}
      >
        <Toolbar>
          <Typography variant="h6" textAlign={"right"} sx={{ flexGrow: 1 }}>
            My Cart
          </Typography>
          <IconButton edge="end" color="inherit" onClick={toggleDrawer}>
            <ShoppingCart />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          display: { xs: "block", md: "none" },
          position: "relative",
          zIndex: 25,
        }}
      >
        <Box
          sx={{ width: { xs: 320, sm: 480 } }}
          height={"100%"}
          role="presentation"
        >
          <Cart
            cart={cart}
            handleQuantityChange={handleQuantityChange}
            handleCheckout={handleCheckout}
          />
        </Box>
      </Drawer>
    </>
  );
}
