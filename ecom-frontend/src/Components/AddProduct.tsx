import { Button, Center, Checkbox, FileInput, Group, NumberInput, Paper, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../api/ProductsService";

const AddProduct = () => {
  const navigate = useNavigate();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      description: "",
      price: 0,
      isAvailable: false,
      file: null,
    },

    // validate: {
    //   password: (val) => (val.length <= 1 ? "Password should include at least 6 characters" : null),
    // },
  });

  const handleAddProduct = async () => {
    try {
      await addProduct(form.values);
      
      // console.log(form.values);
    } 
    catch (err) {console.log(err)}
  };

  return (
    <Center h={600}>
      <Paper w={400} radius="md" p="lg" withBorder shadow="sm">
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
              required
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
              {...form.getInputProps("price")}
            />

            <Checkbox radius="sm" label="Available" {...form.getInputProps("isAvailable")} />

            <FileInput
              accept="image/png,image/jpeg,image/webp"
              radius="md"
              clearable
              label="Product image"
              placeholder="Upload files"
              {...form.getInputProps("file")}
            />
          </Stack>

          <Group justify="space-evenly" mt="xl">
            <Button onClick={() => navigate("/")} radius="md" variant="default">
              Cancel
            </Button>
            <Button type="submit" radius="md">
              Add
            </Button>
          </Group>
        </form>
      </Paper>
    </Center>
  );
};

export default AddProduct;
