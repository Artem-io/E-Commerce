import { SimpleGrid, Text, Center, Button, Card, Group, Image, Title, Stack } from "@mantine/core";
import { FaShoppingCart } from "react-icons/fa";

const ProductsGrid = ({ products, nb }) => {
  return (
    <>
      <Center>
        <SimpleGrid spacing={{base: 20, md: 40, lg: 50}} cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
          {products ? (
            products.slice(-nb).map((product) => (
              <Card w='320px' h='400px' shadow="sm" radius="lg" withBorder key={product.id}>

                <Card.Section>
                  <Image mb={15} h='178px' src={product.imageUrl} fallbackSrc="https://trukszyn.pl/wp-content/uploads/woocommerce-placeholder-348x348.png" />
                </Card.Section>

                <Stack h='100%' justify="space-between" gap={8}>

                <Title fw={600} order={5}>{product.name}</Title>
                <Text size="sm" c='dimmed'>{product.description}</Text>
                
                <Group justify="space-around">
                  <Text fw='bold'>${product.price}</Text>
                  <Button leftSection={<FaShoppingCart size={17} />} radius='md' 
                  disabled={!product.isAvailable}> Add to Cart </Button>
                </Group>

                </Stack>
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
