import { Center, Stack, Title, Text } from "@mantine/core";
import type React from "react";
import FeaturedCarousel from "./FeaturedCarousel";
import ProductsGrid from "./ProductsGrid";

const HomePage = ({products}) => {
  return (
    <>
    <FeaturedCarousel />

    <Stack align="center" justify="center">
        <Title>Products</Title>
        <Text>Discover our handpicked selection of top-rated items for you</Text>
      </Stack>

      <ProductsGrid products={products} nb={4} />
    </>
  );
};

export default HomePage;
