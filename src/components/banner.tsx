import { Box } from "@mui/material";
import Image from "next/image";

export default function Banner() {
  return (
    <Box
      position={"relative"}
      width="100%"
      sx={{
        position: "relative",
        paddingBottom: "32.5%", // This ensures the height is 41.6% of the width
      }}
    >
      <Image
        src={`/img/banner.png`}
        alt="Banner"
        fill
        sizes="1440px"
        style={{ objectFit: "cover" }}
      />
    </Box>
  );
}
