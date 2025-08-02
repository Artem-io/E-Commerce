import { SimpleGrid, Text, Center, Button, Card, Group, Image, Title, Stack, Loader, Modal } from "@mantine/core";
import { jwtDecode } from "jwt-decode";
import { FaCheck, FaShoppingCart } from "react-icons/fa";
import { useAuth } from "./AuthContext";
import { FaTrashCan } from "react-icons/fa6";
import { addToCart, deleteProduct } from "../Api/ProductsService";
import { notifications } from "@mantine/notifications";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import type { Product } from "../Types/Product";
import { useDisclosure } from "@mantine/hooks";
import { IoAlertCircle } from "react-icons/io5";

type ProductsGridProps = {
  products: Product[],
  productsNb?: number,
  onProductDeleted?: () => void
}

const ProductsGrid = ({ products, productsNb = products.length, onProductDeleted = () => {} }: ProductsGridProps) => 
  {
  const { isAuth } = useAuth();
  const decoded = isAuth? jwtDecode(document.cookie) : { authorities: [] };
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      onProductDeleted();
    }
    catch(err) {console.log(err)}
  }

  const handleAddToCart = async (id: number) => {
    try {
      await addToCart(id);
      notifications.show({
            color: '#28a745',
            title: 'Success',
            message: 'Product has been added to cart',
            radius: 12,
            w: 350,
            withBorder: true,
            icon: <FaCheck />,
            position: "bottom-center",
          })
    }
    catch(err) {console.log(err)}
  }

  return (
      <Center>
    {products? (<SimpleGrid spacing={{base: 20, md: 40, lg: 50}} cols={{ base: 1, xs: 2, sm: 3, md: 4, lg: 5 }}>
            {products.slice(-productsNb).map(product => (
              <Card p="xs" w={260} h={350} shadow="sm" radius="lg" withBorder key={product.id}>

                <Card.Section>
                  <Image fit="contain" mb={5} h='150px' src={product.imageUrl} fallbackSrc="https://trukszyn.pl/wp-content/uploads/woocommerce-placeholder-348x348.png" />
                </Card.Section>

                <Stack h='100%' justify="space-between" gap={8}>
                
                <Title fw={600} order={5}>{product.name}</Title>
                <Text size="sm" c='dimmed'>{product.description}</Text>
                
                <Group justify="space-around">
                  <Text fw='bold'>${product.price}</Text>

                  {decoded.authorities.find((role: string) => role === 'ROLE_ADMIN')? 

                  <Group>
                  <Button onClick={()=>{navigate(`/products/${product.id}`)}} leftSection={<MdEdit size={17} />} 
                  radius='md'> Edit </Button>

                  <Button color="red" leftSection={<FaTrashCan size={15} />} 
                  onClick={open} radius='md'> Delete </Button>
                  </Group>

                 : isAuth && <Button onClick={() => {handleAddToCart(product.id)}} leftSection={<FaShoppingCart size={17} />} 
                 radius='md' disabled={!product.isAvailable}> Add to Cart </Button>
                }

                </Group>
                </Stack>

                <Modal opened={opened} onClose={close} radius="lg" centered
                overlayProps={{
          backgroundOpacity: 0.55,
          blur: 1,
        }}>

                  <Stack ta="center" align="center" justify="space-between" h={300}>
                    <IoAlertCircle color="#fa5252" size={50} />
                    <Title size={30}>Delete this Product?</Title>
                    <Text>This file will be permanently deleted and cannot be recovered.</Text>
                  
                <Group justify="space-evenly">

                <Button radius="md" variant="default" onClick={close}> Cancel </Button>
                <Button onClick={()=>{handleDelete(product.id); close()}} 
                radius="md" color="red"> Delete </Button>

                </Group>
                </Stack>

                </Modal>
              </Card>
            ))}
        </SimpleGrid>) : <Loader size='lg' color="blue" />}

        
      </Center>
  );
};

export default ProductsGrid;
