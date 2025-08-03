import { useEffect, useState } from "react";
import { addToCart, decrementItemQuantity, deleteFromCart, getCart, placeOrder } from "../Api/ProductsService";
import { ActionIcon, Button, Center, Divider, Flex, Group, Image, Loader, Stack, Text, Title } from "@mantine/core";
import { FaShoppingCart } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { TiPlus, TiMinus } from "react-icons/ti";
import type { Product } from "../Types/Product";

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

interface Cart {
  id: number;
  items: CartItem[];
  totalPrice: number;
}

const Cart = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const handleIncrement = async (productId: number) => {
      try {
        await addToCart(productId);
        fetchCart();
      }
      catch(err) {console.log(err)}
    }

    const handleDecrement = async (itemId: number) => {
      try {
        await decrementItemQuantity(itemId);
        fetchCart();
      }
      catch(err) {console.log(err)}
    }

    const handleCheckout = async (cartId: number) => {
      try {
        await placeOrder(cartId);
        fetchCart();
      }
      catch(err) {console.log(err)}
    }

  return (
    <>
    <Group justify="center" my={30}>
        <FaShoppingCart size={30} />
        <Title order={1}>Your Cart</Title>
      </Group>

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
        <Group align="start" justify="space-around" px={50} pb={70}>
        
        <Stack p={15} bdrs={20} bd="2px solid #e0e0e0" maw={600}>

          {cart.items.map(item => (
            <div key={item.id}>
              <Group justify="space-between" py="sm">

                <Flex gap="xs" w={220} align="center">
                  <Image src={item.product.imageUrl} alt={item.product.name}
                    w={100} h={100} radius="lg" fit="contain" bd="2px solid #e0e0e0" />
                  <Text fw={500}>{item.product.name}</Text>
                </Flex>

                <Button.Group>
              <Button onClick={()=>{handleDecrement(item.id)}}
              disabled={item.quantity === 1} variant="default" radius={12} size="xs" p={7}>
                <TiMinus />
              </Button>

              <Button.GroupSection variant="default" w={30} h={30}>
                {item.quantity}
              </Button.GroupSection>

              <Button variant="default" radius={12} onClick={()=>{handleIncrement(item.product.id)}} size="xs" p={7}>
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
              <Divider size="sm" />
            </div>
          ))}

        </Stack>

        <Stack justify="space-between" mih={300} miw={300} p="lg" bdrs="lg" bd="2px solid #e0e0e0">
        <Text>Order Summary</Text>
        <Divider />
        <Text>Total ${cart?.totalPrice}</Text>
        <Button radius="md" onClick={()=>{handleCheckout(cart?.id)}}> Checkout </Button>
        </Stack>
      
        </Group>
      )}
      
    </>
  );
};

export default Cart;