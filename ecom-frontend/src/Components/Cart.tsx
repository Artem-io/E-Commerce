import { useEffect, useState } from "react";
import { deleteFromCart, getCart } from "../api/ProductsService";
import { ActionIcon, Button, Center, Container, Divider, Flex, Group, Image, Loader, Stack, Text, Title } from "@mantine/core";
import { FaDollarSign, FaShoppingCart } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { TiPlus, TiMinus } from "react-icons/ti";
import { useCounter } from '@mantine/hooks';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [value, { increment, decrement }] = useCounter(10, { min: 0 });

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getCart();
      setCart(response.data);
    } 
    catch (err) {
      setError("Failed to load cart. Please try again.");
      console.error(err);
    } 
    finally {setLoading(false)}
  };

  useEffect(() => {fetchCart()}, []);

  const handleItemDelete = async (id: number) => {
    try {
      await deleteFromCart(id);
      fetchCart();
    } 
    catch (err) {
      setError("Failed to remove item. Please try again.");
      console.error(err);
    }
  };

  return (
    <>
    <Group justify="center" mt="md">
        <FaShoppingCart size={30} />
        <Title order={1}>Your Cart</Title>
      </Group>

    <div className="p-10">

      {loading && (
        <Center>
          <Loader size="lg" color="blue" />
        </Center>
      )}

      {!loading && error && (
        <Center>
          <Text c="red">{error}</Text>
        </Center>
      )}

      {!loading && !error && cart === null && (
        <Center>
          <Text>Unable to load cart</Text>
        </Center>
      )}

      {!loading && !error && cart !== null && !cart.items?.length && (
        <Center>
          <Text>Your cart is empty</Text>
        </Center>
      )}

      {!loading && !error && cart !== null && cart.items?.length > 0 && (
        <Stack p={15} bdrs={20} bd="2px solid #e0e0e0" maw={600}>
          {cart.items.map((item) => (
            <div key={item.id}>
              <Divider size="sm" />

              <Group justify="space-between" py="sm">

                <Flex gap="xs" w={220} align="center">
                  <Image src={item.product.imageUrl} alt={item.product.name}
                    w={100} h={100} radius="lg" fit="contain" bd="2px solid #e0e0e0" />
                  <Text fw={500}>{item.product.name}</Text>
                </Flex>

                <Button.Group>
              <Button variant="default" radius="md" onClick={decrement} size="xs" p={7}>
                <TiMinus />
              </Button>

              <Button.GroupSection variant="default" w={30} h={30}>
                {value}
              </Button.GroupSection>

              <Button variant="default" radius="md" onClick={increment} size="xs" p={7}>
                <TiPlus />
              </Button>
            </Button.Group>

                <Text fw={500}>${item.product.price}</Text>

                <ActionIcon
                  variant="transparent"
                  c="red"
                  onClick={() => handleItemDelete(item.id)}
                  aria-label={`Remove ${item.product.name} from cart`}>
                  <FaTrashCan size={17} />
                </ActionIcon>
              </Group>
            </div>
          ))}
          <Divider size="sm" />
        </Stack>
      )}
    </div>
    </>
  );
};

export default Cart;