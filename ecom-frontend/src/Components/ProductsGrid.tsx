import { SimpleGrid, Text, Center, Button, Card, Group, Image } from "@mantine/core";

const ProductsGrid = ({ products, nb }) => {
  return (
    <>
      <Center>
        <SimpleGrid spacing={100} cols={{ base: 2, lg: 4 }}>
          {products ? (
            products.slice(-nb).map((product) => (
              <Card h='320px' w='250px' shadow="sm" radius="md" withBorder key={product.id}>

                <Card.Section>
                  <Image h='210px' src={product.imageUrl} fallbackSrc="https://trukszyn.pl/wp-content/uploads/woocommerce-placeholder-348x348.png" />
                </Card.Section>

                <Text>{product.name}</Text>
                <Text>{product.description}</Text>

                <Group justify="space-between">
                  <Text>${product.price}</Text>
                  <Button disabled={!product.isAvailable}>Add to Cart</Button>
                </Group>

              </Card>
            ))
          ) : (
            <Text>Loading...</Text>
          )}
        </SimpleGrid>
      </Center>
    </>
  );
};

export default ProductsGrid;
