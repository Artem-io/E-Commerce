import { Button, Center, Checkbox, FileInput, Group, NumberInput, Paper, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../api/ProductsService";
import { notifications } from '@mantine/notifications';
import { FaCheck, FaDollarSign } from "react-icons/fa";

const AddProduct = () => {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      price: "",
      isAvailable: false,
      file: null,
    },

    validate: {
      name: (val) => (val === "" ? "Please enter the name" : null),
      description: (val) => (val === "" ? "Please enter the description" : null),
      price: (val) => (val === "" ? "Please enter the price" : null),
      file: (val) => (val === null ? "Please upload product image" : null)
    },
  });

  const handleAddProduct = async () => {
    try {
      await addProduct(form.values);
      notifications.show({
            color: '#28a745',
            title: 'Success',
            message: 'Product has been added',
            radius: 12,
            w: 350,
            withBorder: true,
            icon: <FaCheck />
          })
          form.reset();
      console.log(form.values);
    } 
    catch (err) {console.log(err)}
  };

  return (
    <Center h={600}>
      <Paper w={400} radius="lg" p="lg" withBorder shadow="sm">
        <Text size="lg" fw={500}>
          Add new Product
        </Text>

        <form
          onSubmit={form.onSubmit(() => {
            handleAddProduct();
          })}
        >
          <Stack>
            <TextInput label="Product Name" placeholder="iPhone 15 Pro" radius="md" {...form.getInputProps("name")} />

            <TextInput
              
              label="Description"
              placeholder="Your description"
              {...form.getInputProps("description")}
              radius="md"
            />

            <NumberInput
            
              radius="md"
              min={0}
              clampBehavior="strict"
              label="Price"
              placeholder="Enter the price"
              rightSection={<FaDollarSign />}
              rightSectionPointerEvents="none" hideControls 
              {...form.getInputProps("price")}
            />

            <FileInput
              
              accept="image/png,image/jpeg,image/webp"
              radius="md"
              clearable
              label="Product image"
              placeholder="Upload files"
              {...form.getInputProps("file")}
            />

            <Checkbox label="Available" {...form.getInputProps("isAvailable")} />

          </Stack>

          <Group justify="space-evenly" mt="xl">
            <Button onClick={() => navigate("/")} radius="md" variant="default"> Cancel </Button>
            <Button type="submit" radius="md"> Add </Button>
          </Group>
        </form>
      </Paper>
    </Center>
  );
};

export default AddProduct;
