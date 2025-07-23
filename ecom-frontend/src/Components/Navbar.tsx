import { Button, Group, Anchor, Text } from "@mantine/core";
import { FaShop } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";


const Navbar = () => {
  return (
    <Group h='70px' px='50px' bg='#141b29' justify="space-between">

      <Group>
      <FaShop size={40} color="white" />
      <Text  c="white">E-Shop</Text>
      </Group>

      <Group justify="space-between">
        <Anchor href="/" underline="never"> Home </Anchor>
        <Anchor underline="never" href="/products" >Products</Anchor>
        <Anchor underline="never" >About</Anchor>
        <Anchor underline="never" >Contact</Anchor>
        <FaShoppingCart color="white" size={25} />
        <Button component="a" href="/auth" leftSection={<FiLogIn size={20} />}> Login </Button>
      </Group>

    </Group>
  )
}

export default Navbar