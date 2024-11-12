import Card, { CardProps } from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, IconButton, Stack } from "@mui/material";
import {
  Add,
  Remove,
  Star,
  StarBorder,
  StarHalf,
} from "@mui/icons-material";
import CustomButton from "./customButton";
import { CartItem } from "@/lib/types/CartItem";

interface ItemCardProps extends Omit<CardProps, 'title'> {
  type?: "cart" | "list";
  productId: number;
  image: string;
  imageTitle: string;
  title: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  reviewerCount: number;
  onAddToCart?: (
    product: CartItem
  ) => void;
  cartQuantity: number;
  onQuantityChange: (productId: number, quantity: number) => void;
}

export default function ItemCard({
  type = "list",
  productId,
  image,
  imageTitle,
  title,
  description,
  price,
  category,
  rating,
  reviewerCount,
  onAddToCart,
  cartQuantity,
  onQuantityChange,
}: ItemCardProps) {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <>
        {Array.from({ length: fullStars }).map((_, index) => (
          <Star
            key={`full-${index}`}
            sx={{ color: "#FFBF00", fontSize: { xs: 16, md: 20 } }}
          />
        ))}
        {halfStar > 0 && (
          <StarHalf sx={{ color: "#FFBF00", fontSize: { xs: 16, md: 20 } }} />
        )}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <StarBorder
            key={`empty-${index}`}
            sx={{ color: "#FFBF00", fontSize: { xs: 16, md: 20 } }}
          />
        ))}
      </>
    );
  };

  const priceInIDR = price * 15000;

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(priceInIDR);

  return (
    <Card
      variant={"outlined"}
      sx={{
        width: "100%",
        display: type == "list" ? undefined : "flex",
        flexDirection: "row",
      }}
    >
      <CardMedia
        sx={{
          minWidth: type == "list" ? undefined : { xs: 100, md: 120 },
          minHeight: type == "list" ? 140 : undefined,
          mx: type == "list" ? "auto" : undefined,
          backgroundSize: "contain",
          backgroundPosition: "center",
          mt: type == "list" ? 2 : undefined,
          m: type == "list" ? undefined : 2,
        }}
        image={image}
        title={imageTitle}
      />
      <Box flexGrow={1}>
        <CardContent sx={{ pb: 1 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            fontWeight={600}
            textAlign={"left"}
            sx={{ margin: 0, fontSize: { xs: 16, md: 20 } }}
          >
            {title}
          </Typography>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={2}
            my={type == "list" ? 1.5 : 0.5}
          >
            <Typography
              variant="body2"
              sx={{ color: "neutrals.300", fontSize: { xs: 12, md: 14 } }}
            >
              {category}
            </Typography>
            {type == "list" && (
              <Typography
                variant="subtitle1"
                sx={{ fontSize: { xs: 14, md: 16 } }}
              >
                {formattedPrice}
              </Typography>
            )}
          </Box>
          {type == "list" && (
            <Typography
              variant="subtitle1"
              sx={{ color: "text.secondary", fontSize: { xs: 14, md: 16 } }}
            >
              {description}
            </Typography>
          )}
          {type == "list" && (
            <Stack
              spacing={0.5}
              direction={"row"}
              sx={{ mt: 0.5, alignItems: "center" }}
            >
              <Stack direction={"row"}>{renderStars(rating)}</Stack>
              <Typography
                variant="subtitle1"
                sx={{ color: "neutrals.300", fontSize: { xs: 14, md: 16 } }}
              >
                ({reviewerCount})
              </Typography>
            </Stack>
          )}
        </CardContent>
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          justifyContent={
            cartQuantity > 0 && type != "cart" ? "flex-end" : "space-between"
          }
          alignItems={"center"}
          gap={0.5}
          sx={{ px: 2, pb: 2, pt: type == "list" ? undefined : 0 }}
        >
          {type == "cart" && (
            <Typography variant="subtitle1">{formattedPrice}</Typography>
          )}
          <CardActions
            sx={{
              p: 0,
              flexGrow: type !== "cart" && cartQuantity == 0 ? 1 : undefined,
            }}
          >
            {cartQuantity > 0 ? (
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton
                  color="primary"
                  aria-label="minus"
                  onClick={() => onQuantityChange(productId, cartQuantity - 1)}
                >
                  <Remove sx={{ fontSize: { xs: 16, md: 20 } }} />
                </IconButton>
                <Typography sx={{ fontSize: { xs: 14, md: 16 } }}>
                  {cartQuantity}
                </Typography>
                <IconButton
                  color="primary"
                  aria-label="plus"
                  onClick={() => onQuantityChange(productId, cartQuantity + 1)}
                >
                  <Add sx={{ fontSize: { xs: 16, md: 20 } }} />
                </IconButton>
              </Stack>
            ) : (
              <CustomButton
                text="Add To Cart"
                fullWidth
                onClick={() =>
                  onAddToCart!({
                    productId: productId,
                    quantity: cartQuantity,
                    title,
                    description,
                    price,
                    image,
                    category,
                    rating: {
                      rate: rating,
                      count: reviewerCount
                    },
                  })
                }
              />
            )}
          </CardActions>
        </Box>
      </Box>
    </Card>
  );
}
