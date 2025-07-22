import { Button, Group, Anchor } from "@mantine/core";
import FeaturedCarousel from "./FeaturedCarousel";
import FeaturedProducts from "./FeaturedProducts";

const HomePage = ({products}) => {
  return (
    <>
    <Group h='70px' px='50px' bg='#141b29' justify="space-between">

      

      <Group justify="space-between">
        <Anchor href="" underline="never"> Home </Anchor>
        <Anchor underline="never" >Products</Anchor>
        <Anchor underline="never" >About</Anchor>
        <Anchor underline="never" >Contact</Anchor>
        <Button>Cart Icon</Button>
        <Button>Login</Button>
      </Group>

    </Group>

    <FeaturedCarousel />
    <FeaturedProducts products={products} />
    </>
  );
};

export default HomePage;
