"use client";

import { Alert, Box, Snackbar } from "@mui/material";
import Shop from "../sub-sections/shop";
import Cart from "../sub-sections/cart";
import { useEffect, useState } from "react";
import Banner from "../banner";
import CartDrawer from "../cartDrawer";
import OrderDialog from "../orderDialog";

export default function Content() {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<Cart>({
    userId: 2,
    date: undefined,
    products: [],
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const createCart = async () => {
    try {
      const cartData: Omit<Cart, "id"> = {
        userId: 2,
        date: undefined,
        products: [],
      };

      const response = await fetch("/api/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartData),
      });

      if (!response.ok) throw new Error("Failed to create cart");

      const data: Cart = await response.json();
      setCart(data);
    } catch (error) {
      console.error("Error creating cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!cart || products.length === 0) return;

    const updatedProducts = cart.products.map((cartItem: CartItem) => {
      const product = products.find(
        (product) => product.id === cartItem.productId
      );
      if (product && !cartItem.image) {
        return { ...cartItem, ...product };
      }
      return cartItem;
    });

    const isCartUpdated = updatedProducts.some(
      (updatedItem, index: number) => updatedItem !== cart.products[index]
    );

    if (isCartUpdated) {
      setCart((prevCart) => ({
        ...prevCart,
        products: updatedProducts,
      }));
    }
  }, [cart, products]);

  const handleQuantityChange = (productId: number, quantity: number) => {
    if (!cart) return;

    if (quantity === 0) {
      setCart({
        ...cart,
        products: cart.products.filter((item) => item.productId !== productId),
      });
    } else {
      setCart({
        ...cart,
        products: cart.products.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        ),
      });
    }
  };

  const handleCheckout = () => {
    if (cart && cart.products.length === 0) {
      setSnackbarMessage("Cart cannot be empty on checkout!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } else {
      setDialogOpen(true);
    }
  };

  const handleOrderSubmit = (success: boolean) => {
    if (success) {
      setSnackbarMessage("Order placed successfully!");
      setSnackbarSeverity("success");
    } else {
      setSnackbarMessage("Error placing order. Please try again.");
      setSnackbarSeverity("error");
    }
    setSnackbarOpen(true);
  };

  useEffect(() => {
    createCart();
    fetchProducts();
  }, []);

  return (
    <>
      <CartDrawer
        cart={cart}
        handleQuantityChange={handleQuantityChange}
        handleCheckout={handleCheckout}
      />
      <Box
        display={"flex"}
        flexDirection={"column"}
        height={{ xs: "calc(100vh - 56px)", md: "auto" }}
        overflow={"hidden"}
      >
        <Banner />
        <Box
          display={"flex"}
          flexDirection={{ xs: "column", md: "row" }}
          overflow={"auto"}
          flexGrow={1}
          gap={{ xs: 4, md: 0 }}
          height={{ xs: "100%", md: "100vh" }}
        >
          <Box
            flexGrow={1}
            height={"100%"}
            sx={{
              overflowY: "auto",
              maxHeight: "100%",
            }}
          >
            <Shop
              cart={cart}
              setCart={setCart}
              handleQuantityChange={handleQuantityChange}
              products={products}
            />
          </Box>
          <Box
            minWidth={{ md: "45%", lg: "33%" }}
            maxWidth={{ md: "45%", lg: "33%" }}
            sx={{
              display: { xs: "none", md: "block" },
              position: "sticky",
              top: 32,
              height: "100%",
              overflowY: "auto",
            }}
          >
            <Cart
              cart={cart}
              handleQuantityChange={handleQuantityChange}
              handleCheckout={handleCheckout}
            />
          </Box>
        </Box>
      </Box>
      <OrderDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        handleCheckout={handleCheckout}
        onOrderSubmit={handleOrderSubmit}
      />
      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={() => {
          setSnackbarOpen(false);
        }}
      >
        <Alert
          onClose={() => {
            setSnackbarOpen(false);
          }}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
