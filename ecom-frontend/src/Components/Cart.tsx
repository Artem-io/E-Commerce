import { useEffect, useState } from "react";
import { deleteFromCart, getCart } from "../api/ProductsService";
import { ActionIcon, Button, Center, Container, Divider, Flex, Group, Image, Loader, Stack, Text, Title } from "@mantine/core";
import { FaDollarSign, FaShoppingCart } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { TiPlus, TiMinus  } from "react-icons/ti";
import { useCounter } from '@mantine/hooks';

const Cart = () => 
{
  const [cart, setCart] = useState(null);
  const [value, { increment, decrement }] = useCounter(10, { min: 0 });

  const fetchCart = async () => {
    try {
      const response = await getCart();
      setCart(response.data);
    } 
    catch (err) {console.log(err)}
  };
  useEffect(() => {fetchCart()}, []);

  const handleItemDelete = async (id: number) => {
    try {
      deleteFromCart(id);
    } 
    catch (err) {console.log(err)}
  }

  return (
    <>
      <Group justify="center" gap={15}>
        <FaShoppingCart size={30} />
        <Title>Your Cart</Title>
      </Group>

      {/* <Group justify="space-between" w={700}>
        <Text>Product</Text>
        <Text>Quantity</Text>
        <Text>Total</Text>
        <Text>Action</Text>
      </Group> */}

      {cart ? (
        <div className="ml-10 border-2 border-solid rounded-2xl w-[700px]">
        {cart.items.map(item => (
          <div key={item.id}>
          <Divider size='sm' w={700} />
          <Group justify="space-between" w={700} h={120}>

            <Flex gap={10} w={220}>
              <img className="w-[100px] h-[100px] object-contain border-2 border-solid rounded-2xl" src={item.product.imageUrl} />
              <Text >{item.product.name}</Text>
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

            <Text>${item.product.price}</Text>

            <ActionIcon variant="transparent" c="red">
              <FaTrashCan
                onClick={() => {
                  handleItemDelete(item.id);
                }}
                size={17}
              />
            </ActionIcon>
          </Group>
          </div>
        ))}
        </div>
      ) : <Loader size='lg' color="blue" />
      }
    </>
  );
};

export default Cart;
