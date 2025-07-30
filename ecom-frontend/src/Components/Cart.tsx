import { useEffect, useState } from "react";
import { getCart } from "../api/ProductsService";
import { Button, Center, Group, Image, Text, Title } from "@mantine/core";
import { FaShoppingCart } from "react-icons/fa";

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

    {cart? (
        cart.items.map(item => 
        (
            <Group w={1000} h={200} key={item.id}>
              <Image w={300} h={200} fit="cover" src={item.product.imageUrl} />
              <Text>{item.product.name}</Text>
              <Text>{item.product.price}</Text>
              <Text>{item.quantity}</Text>
            </Group>
        )
        )
    )

     : <div>Loading...</div>}
    </>
  );
};

export default Cart;
