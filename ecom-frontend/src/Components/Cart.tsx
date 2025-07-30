import { useEffect, useState } from "react";
import { getCart } from "../api/ProductsService";
import { Button, Center, Container, Group, Image, Stack, Text, Title } from "@mantine/core";
import { FaDollarSign, FaShoppingCart } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

const Cart = () => 
    {
  const [cart, setCart] = useState(null);

  const fetchCart= async () => {
    try {
      const response = await getCart();
      setCart(response.data);
    } 
    catch (err) {console.log(err)}
  };
  useEffect(() => {fetchCart()}, []);

  return (
    <>
    <Group justify="center" gap={15}>
      <FaShoppingCart size={30} />
      <Title>Your Cart</Title>
    </Group>

    <Group justify="space-between" w={700}>
      <Text>Product</Text>
      <Text>Quantity</Text>
      <Text>Total</Text>
      <Text>Action</Text>
    </Group>

    {cart? (
        cart.items.map(item => 
        (
            <Group justify="space-between" w={700} h={200} key={item.id}>

              <Stack gap={0}>
              <Image w={100} h={100} fit="cover" src={item.product.imageUrl} />
              <Text>{item.product.name}</Text>
              </Stack>

              <Text>{item.quantity}</Text>
              <Text>${item.product.price}</Text>
              <FaTrashCan size={17} />
            </Group>
        )
        )
    )

     : <div>Loading...</div>}
    </>
  );
};

export default Cart;
