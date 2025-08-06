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
import { useState } from "react";

type ProductsGridProps = {
  products: Product[] | null;
  productsNb?: number;
  onProductDeleted?: () => void;
};

const ProductsGrid = ({ products, productsNb = products?.length, onProductDeleted = () => {} }: ProductsGridProps) => {
  const { isAuth } = useAuth();
  const decoded = isAuth ? jwtDecode(document.cookie) : { authorities: [] };
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      notifications.show({
        color: "#28a745",
        title: "Success",
        message: "Product has been deleted",
        radius: 12,
        w: 350,
        withBorder: true,
        icon: <FaCheck />,
        position: "bottom-center",
      });
      onProductDeleted();
      close();
    } 
    catch (err) {
      console.error("Error deleting product:", err);
      notifications.show({
        color: "#fa5252",
        title: "Error",
        message: err.response?.data?.error || "Failed to delete product",
        radius: 12,
        w: 350,
        withBorder: true,
        icon: <IoAlertCircle />,
        position: "bottom-center",
      });
    }
  };

  const handleAddToCart = async (id: number) => {
    try {
      await addToCart(id);
      notifications.show({
        color: "#28a745",
        title: "Success",
        message: "Product has been added to cart",
        radius: 12,
        w: 350,
        withBorder: true,
        icon: <FaCheck />,
        position: "bottom-center",
      });
    } 
    catch (err) {
      console.error("Error adding to cart:", err);
      notifications.show({
        color: "#fa5252",
        title: "Error",
        message: err.response?.data?.error || "Failed to add product to cart",
        radius: 12,
        w: 350,
        withBorder: true,
        icon: <IoAlertCircle />,
        position: "bottom-center",
      });
    }
  };

  const openDeleteModal = (id: number) => {
    setSelectedProductId(id);
    open();
  };

  return (
    <Center>
      {products ? (
        <SimpleGrid spacing={{ base: 20, md: 40, lg: 50 }} cols={{ base: 1, xs: 2, sm: 3, md: 4, lg: 5 }}>
          {products.slice(-productsNb).map(product => (

            <Card p="xs" w={260} h={350} shadow="sm" radius="lg" withBorder key={product.id}>
              <Card.Section>
                <Image src={product.imageUrl} fit="contain" mb={5} h="150px" radius="md"
                  fallbackSrc="https://trukszyn.pl/wp-content/uploads/woocommerce-placeholder-348x348.png" />
              </Card.Section>

              <Stack h="100%" justify="space-between" gap={8}>
                <Title fw={600} order={5}> {product.name} </Title>
                <Text size="sm" c="dimmed"> {product.description} </Text>

                <Group justify="space-around">
                  <Text fw="bold">${product.price}</Text>

                  {decoded.authorities.find((role: string) => role === "ROLE_ADMIN") ? (
                    <Group>
                      <Button onClick={() => navigate(`/products/${product.id}`)} leftSection={<MdEdit size={17} />}
                       radius="md"> Edit </Button>
                      <Button color="red" leftSection={<FaTrashCan size={15} />} radius="md"
                        onClick={() => openDeleteModal(product.id)}> Delete </Button>
                    </Group>) 
                    : 
                  (isAuth && (
                      <Button onClick={() => handleAddToCart(product.id)} leftSection={<FaShoppingCart size={17} />} 
                      radius="md" disabled={!product.isAvailable}> Add to Cart </Button>))}
                </Group>

              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      ) : (
        <Loader size="lg" color="blue" />
      )}

      <Modal radius="lg" centered overlayProps={{ backgroundOpacity: 0.55, blur: 1 }}
        opened={opened}
        onClose={() => {
          close();
          setSelectedProductId(null);
        }}>
        <Stack ta="center" align="center" justify="space-between" h={300}>
          <IoAlertCircle color="#fa5252" size={50} />
          <Title size={30}> Delete this Product? </Title>
          <Text> This product will be permanently deleted and cannot be recovered </Text>
          <Group justify="space-evenly">
            <Button radius="md" variant="default"
              onClick={() => {
                close();
                setSelectedProductId(null);
              }}>
              Cancel </Button>
            <Button radius="md" color="red"
              onClick={() => { if (selectedProductId !== null) handleDelete(selectedProductId); }}>
              Delete </Button>
          </Group>
        </Stack>
      </Modal>
    </Center>
  );
};

export default ProductsGrid;
