import { SimpleGrid, Text, Center, Button, Card, Group, Image, Title, Stack, Loader } from "@mantine/core";
import { jwtDecode } from "jwt-decode";
import { FaShoppingCart } from "react-icons/fa";
import { useAuth } from "./AuthContext";
import { FaTrashCan } from "react-icons/fa6";
import { addToCart, deleteProduct } from "../api/ProductsService";

const ProductsGrid = ({ products, nb }) => {
  const { isAuth } = useAuth();
  const decoded = isAuth? jwtDecode(document.cookie) : { authorities: [] };

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
    }
    catch(err) {console.log(err)}
  }

  const handleAddToCart = async (id: number) => {
    try {
      await addToCart(id);
    }
    catch(err) {console.log(err)}
  }

  return (
      <Center>
    {products? (<SimpleGrid spacing={{base: 20, md: 40, lg: 50}} cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
            {products.slice(-nb).map((product) => (
              <Card w='320px' h='400px' shadow="sm" radius="lg" withBorder key={product.id}>

                <Card.Section>
                  <Image mb={15} h='178px' src={product.imageUrl} fallbackSrc="https://trukszyn.pl/wp-content/uploads/woocommerce-placeholder-348x348.png" />
                </Card.Section>

                <Stack h='100%' justify="space-between" gap={8}>

                <Title fw={600} order={5}>{product.name}</Title>
                <Text size="sm" c='dimmed'>{product.description}</Text>
                
                <Group justify="space-around">
                  <Text fw='bold'>${product.price}</Text>

                  {decoded.authorities.find((role: string) => role === 'ROLE_ADMIN')? 

                  <Button color="red" leftSection={<FaTrashCan size={17} />} 
                  onClick={()=>{handleDelete(product.id)}} radius='md'> Delete Product </Button>

                 : <Button onClick={() => {handleAddToCart(product.id)}} leftSection={<FaShoppingCart size={17} />} 
                 radius='md' disabled={!product.isAvailable}> Add to Cart </Button>
                }

                </Group>

                </Stack>
              </Card>
            ))}
        </SimpleGrid>) : <Loader size='lg' color="blue" />}
      </Center>
  );
};

export default ProductsGrid;
