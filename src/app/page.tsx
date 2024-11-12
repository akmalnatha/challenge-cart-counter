import Image from "next/image";
import styles from "./page.module.css";
import Banner from "@/components/banner";
import { Box } from "@mui/material";
import Cart from "@/components/sub-sections/cart";
import Content from "@/components/sections/content";

export default function Home() {
  return (
    <Box component={"main"} width={"100%"}>
      <Content />
    </Box>
  );
}
