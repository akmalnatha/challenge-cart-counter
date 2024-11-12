"use client";

import { ShoppingCart } from "@mui/icons-material";
import { Box, Stack, Toolbar, Typography } from "@mui/material";
import CustomButton from "../customButton";
import ItemCard from "../itemCard";

interface CartProps {
  cart: Cart;
  handleQuantityChange: (productId: number, quantity: number) => void;
  handleCheckout: () => void;
}

export default function Cart({
  cart,
  handleQuantityChange,
  handleCheckout,
}: CartProps) {
  const calculateSubtotal = (): number => {
    if (!cart || !cart.products) return 0;
    return cart.products.reduce((total, item) => {
      return total + item.price * 15000 * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();

  const formattedSubtotal = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(subtotal);

  return (
    <Box
      minWidth={240}
      height={"100%"}
      pr={{ md: 4 }}
      pl={{ md: 2 }}
      py={{ md: 4 }}
      flexGrow={1}
      overflow={"hidden"}
    >
      <Box
        borderRadius={2}
        boxShadow={1}
        overflow={"hidden"}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Toolbar sx={{ display: { xs: "block", md: "none" } }}></Toolbar>
        <Box
          display={{ xs: "none", md: "flex" }}
          justifyContent="space-between"
          alignItems="center"
          p={2}
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            fontWeight: 700,
            fontSize: 20,
          }}
        >
          <Box display="flex" gap={2} alignItems="center">
            <ShoppingCart sx={{ fontSize: 20 }} />
            <Typography variant="h6">My Cart</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            overflowY: "auto",
          }}
        >
          <Box overflow={"auto"} flexGrow={1} px={2} py={2}>
            <Box
              minHeight={"100%"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={
                cart && cart.products.length > 0 ? "start" : "center"
              }
              alignItems={"center"}
              gap={2}
            >
              {cart && cart.products.length > 0 ? (
                cart.products.map((item) => (
                  <ItemCard
                    key={item.productId}
                    type="cart"
                    productId={item.productId}
                    image={item.image}
                    imageTitle={item.title}
                    title={item.title}
                    description={item.description}
                    price={item.price}
                    category={item.category}
                    rating={item.rating?.rate}
                    reviewerCount={item.rating?.count}
                    cartQuantity={item.quantity}
                    onQuantityChange={handleQuantityChange}
                  />
                ))
              ) : (
                <Typography sx={{ color: "text.secondary", px: 2 }}>
                  No Items In Cart!
                </Typography>
              )}
            </Box>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"end"}
            py={2}
            px={2}
            borderTop={1}
            sx={{ borderColor: "neutrals.100" }}
          >
            <Stack spacing={0.5}>
              <Typography fontSize={14} sx={{ color: "neutrals.300" }}>
                Subtotal
              </Typography>
              <Typography fontSize={16} color="black" fontWeight={700}>
                {formattedSubtotal}
              </Typography>
            </Stack>
            <CustomButton
              text="Checkout"
              color="primary"
              onClick={handleCheckout}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
