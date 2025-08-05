import { useEffect, useState } from "react";
import { getOrders } from "../Api/ProductsService";
import { 
  Card, 
  Group, 
  Stack, 
  Text, 
  Title, 
  Loader, 
  Divider, 
  Badge, 
  Paper,
  ScrollArea
} from "@mantine/core";
import { FaShoppingCart } from "react-icons/fa";

const Orders = () => {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getOrders();
      setOrders(response.data);
    } 
    catch (err) {console.error("Error fetching orders:", err)} 
    finally {setLoading(false)}
  }
  useEffect(() => {fetchOrders()}, []);

  // Helper function to format date
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper function to format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <Stack align="center" p="xl" className="min-h-screen bg-gray-50">
      <Title order={2} className="text-3xl font-bold text-gray-800 mb-8">
        <FaShoppingCart className="inline-block mr-2" size={32} />
        Your Order History
      </Title>

      {loading ? <Loader size="lg" />
           : orders && orders.length > 0 ? (orders.map(order => (

            <Card mb="sm" key={order.id} shadow="sm" padding="lg" radius={20} withBorder>

              <Group justify="space-between" mb="md">
                <Text fw={500} size="lg"> Order #{order.id} </Text>
                <Badge variant="light"> {formatDate(order.orderDate)} </Badge>
              </Group>


              <Group justify="space-between" align="center">
                  <Text size="md" fw={600}  flex={1}> Product </Text>
                  <Text size="md" fw={600}  c="dimmed" ta="center" w={100}> Amount </Text>
                  <Text size="md" fw={600} ta="right" w={100}> Price </Text>
                </Group>

                <Divider mb="md" />

              {order.items.map(item => (
                <Group key={item.id} justify="space-between" py={10} align="center">
                  <Text size="sm" flex={1}> {item.name} </Text>
                  <Text size="sm" c="dimmed" ta="center" w={100}> {item.quantity} </Text>
                  <Text size="sm" fw={500} ta="right" w={100}> {formatCurrency(item.price)} </Text>
                </Group>
              ))}
              <Divider my="md" />

              <Group justify="flex-end">
                <Text fw={700}> Total: {formatCurrency(order.totalPrice)} </Text>
              </Group>
            </Card>
          ))
      ) 
      : 
          <Text c="dimmed" size="lg">
            No orders found
          </Text>
      }
    </Stack>
  );
};

export default Orders;