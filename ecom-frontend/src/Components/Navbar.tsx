import { Button, Group, Anchor, Text, Burger, Drawer, Stack, Avatar, Menu } from "@mantine/core";
import { FaShop } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { useDisclosure } from '@mantine/hooks';
import { useAuth } from "./AuthContext";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isAdmin }: { isAdmin: () => boolean }) => {
  const navigate = useNavigate();
  const [opened, { toggle, close }] = useDisclosure(false);
  const { isAuth, setIsAuth } = useAuth();
  const decoded = isAuth? jwtDecode(document.cookie) : { authorities: [] };

  return (
    <Group h='70px' px={{ base: '20px', sm: '30px', md: '50px' }} bg='#141b29' justify="space-between">

      <Group visibleFrom="xs">
      <FaShop size={40} color="white" />
      <Text c="white"> E-Shop </Text>
      </Group>

      <Group visibleFrom="xs" justify="space-between">
        <Anchor href="/" underline="never"> Home </Anchor>
        <Anchor underline="never" href="/products"> Products </Anchor>
        {isAuth && !isAdmin() && <Anchor href="/orders" underline="never"> Orders </Anchor>}
        {!isAdmin() && <FaShoppingCart onClick={()=>{navigate('/cart')}} color="white" size={25} />}
        
        {isAuth? 

        <Menu withOverlay={true} radius={10} shadow="md" width={180} 
        transitionProps={{ transition: 'scale', duration: 300 }}
        styles={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(1px)'}}}>

          <Menu.Target> 
              <Avatar />
          </Menu.Target>

          <Menu.Dropdown p={10}>

          <Menu.Item> 
            {decoded.sub} 
          </Menu.Item>

          {isAdmin() && <Menu.Item onClick={()=>navigate('/add-product')}> Add Product </Menu.Item>} 

          <Menu.Item onClick={ () => {document.cookie='jwt=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
             setIsAuth(false)}}> Logout </Menu.Item>

          </Menu.Dropdown>
        </Menu> 
        : <Button radius='md' component="a" href="/auth" leftSection={<FiLogIn size={20} />}> Login </Button> }
        
      </Group>


    <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" color="white" size="md" hiddenFrom="xs" /> 

    <Drawer size='xs' opened={opened} onClose={close} overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}>
      <Stack justify="space-between">
        <Anchor href="/" underline="never"> Home </Anchor>
        <Anchor underline="never" href="/products"> Products </Anchor>
        {isAuth && <Anchor underline="never" href="/orders"> Orders </Anchor>}
        <Button component="a" href="/auth" leftSection={<FiLogIn size={20} />}> Login </Button>
      </Stack>
    </Drawer>

    </Group>
  )
}

export default Navbar