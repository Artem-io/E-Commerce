import { Stack, Title, Text } from "@mantine/core";
import FeaturedCarousel from "./FeaturedCarousel";
import ProductsGrid from "./ProductsGrid";
import type { Product } from "../Types/Product";

type HomePageProps = {
  products: Product[] | null,
  onProductDeleted: () => void
}

const HomePage = ({products, onProductDeleted}: HomePageProps) => {
  return (
    <Stack pb={40}>
    <FeaturedCarousel />

    <Stack mb={30} align="center" justify="center">
        <Title size={40}>Featured Products</Title>
        <Text size='lg'>Discover our handpicked selection of top-rated items for you</Text>
    </Stack>

      <ProductsGrid products={products} productsNb={5} onProductDeleted={onProductDeleted} />
    </Stack>
  );
};

export default HomePage;
