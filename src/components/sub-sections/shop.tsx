import { Box, InputAdornment, Stack } from "@mui/material";
import CustomTextField from "../customTextField";
import ItemCard from "../itemCard";
import { useState } from "react";
import { Search } from "@mui/icons-material";
import { CartInterface } from "@/lib/types/Cart";
import { Product } from "@/lib/types/Product";
import { CartItem } from "@/lib/types/CartItem";

interface ShopProps {
  cart: CartInterface;
  setCart: React.Dispatch<React.SetStateAction<CartInterface>>;
  handleQuantityChange: (productId: number, quantity: number) => void;
  products: Product[];
}

export default function Shop({
  cart,
  setCart,
  handleQuantityChange,
  products,
}: ShopProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleAddToCart = (product: CartItem) => {
    setCart((prevCart) => {
      if (!prevCart) return prevCart;

      const existingProduct = prevCart.products.find(
        (item) => item.productId === product.productId
      );

      if (existingProduct) {
        return {
          ...prevCart,
          products: prevCart.products.map((item) =>
            item.productId === product.productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...prevCart,
        products: [
          ...prevCart.products,
          { ...product, productId: product.productId, quantity: 1 },
        ],
      };
    });
  };

  return (
    <Box>
      <Box
        sx={{
          bgcolor: "white",
          position: "sticky",
          top: 0,
          pl: 4,
          py: 4,
          pb: 4,
          pr: { xs: 4, md: 2 },
          zIndex: 10,
        }}
      >
        <CustomTextField
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for products..."
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <Stack spacing={4} sx={{ pr: { xs: 4, md: 2 }, pl: 4, pb: 4 }}>
        {filteredProducts.map((product: Product) => {
          const cartItem = cart
            ? cart.products.find(
                (item: CartItem) => item.productId === product.id
              )
            : null;
          const cartQuantity = cartItem ? cartItem.quantity : 0;
          return (
            <ItemCard
              key={product.id}
              productId={product.id}
              image={product.image}
              imageTitle={product.title}
              title={product.title}
              description={product.description}
              price={product.price}
              category={product.category}
              rating={product.rating.rate}
              reviewerCount={product.rating.count}
              onAddToCart={handleAddToCart} // Pass the function to handle adding products to cart
              cartQuantity={cartQuantity}
              onQuantityChange={handleQuantityChange}
            />
          );
        })}
      </Stack>
    </Box>
  );
}
