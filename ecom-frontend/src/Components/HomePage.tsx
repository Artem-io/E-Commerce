import { Center, Stack, Title, Text } from "@mantine/core";
import type React from "react";
import FeaturedCarousel from "./FeaturedCarousel";
import ProductsGrid from "./ProductsGrid";

const HomePage = ({products}) => {
  return (
    <Stack pb={40}>
    <FeaturedCarousel />

    <Stack mb={30} align="center" justify="center">
        <Title size={40}>Featured Products</Title>
        <Text size='lg'>Discover our handpicked selection of top-rated items for you</Text>
    </Stack>

      <ProductsGrid products={products} nb={4} />
    </Stack>
  );
};

export default HomePage;
