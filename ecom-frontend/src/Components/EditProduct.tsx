import { Button, Center, Checkbox, FileInput, Group, Image, NumberInput, Paper, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../Api/ProductsService";
import { notifications } from '@mantine/notifications';
import { FaCheck, FaDollarSign } from "react-icons/fa";
import { useEffect, useState } from "react";

const EditProduct = ({ onProductUpdated }: { onProductUpdated: () => void }) => 
  {
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const {id} = useParams();
  
  const form = useForm({
    initialValues: {
      id: 0,
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

    },
  });

  const handleFileChange = (file: File | null) => {
    form.setFieldValue('file', file);
    setPreviewUrl(file? URL.createObjectURL(file) : null);
  };

  const fetchProduct = async () => {
    try {
      const response = await getProductById(id);
      form.setValues(response.data);
      setPreviewUrl(response.data.imageUrl);
    }
    catch(err) {console.log(err)}
    }

  useEffect(() => {fetchProduct()}, []);

  const handleEditProduct = async () => {
    try {
      await updateProduct(form.values);
      notifications.show({
        color: '#28a745',
        title: 'Success',
        message: 'Product has been updated',
        radius: 12,
        w: 350,
        withBorder: true,
        icon: <FaCheck />,
        position: "bottom-center"});
      form.reset();
      onProductUpdated();
      navigate('/');
    }
    catch (err) {console.log(err)};
  };

  return (
    <Center h={600}>
        <Image src={previewUrl} fallbackSrc="https://trukszyn.pl/wp-content/uploads/woocommerce-placeholder-348x348.png"
        w={200} h={200} fit="cover" />

      <Paper w={400} radius="lg" p="lg" withBorder shadow="sm">
        <Text size="lg" fw={500}> Add new Product </Text>

        <form onSubmit={form.onSubmit(() => {handleEditProduct()})}>
          <Stack>
            <TextInput label="Product Name" placeholder="iPhone 15 Pro" radius="md" 
            {...form.getInputProps("name")} />

            <TextInput label="Description" placeholder="Your description" radius="md"
            {...form.getInputProps("description")} />

            <NumberInput radius="md" min={0} clampBehavior="strict"
              label="Price" placeholder="Enter the price"
              leftSection={<FaDollarSign />}  leftSectionWidth={25}
              rightSectionPointerEvents="none"  hideControls
              {...form.getInputProps("price")} />

            <FileInput accept="image/png,image/jpeg,image/webp" radius="md" clearable 
              label="Product image" placeholder="Upload files"
              onChange={handleFileChange} value={form.values.file} error={form.errors.file} />

            <Checkbox label="Available" checked={form.values.isAvailable}
              onChange={(event) => form.setFieldValue('isAvailable', event.currentTarget.checked)} />
          </Stack>

          <Group justify="space-evenly" mt="xl">
            <Button onClick={() => navigate("/")} radius="md" variant="default"> Cancel </Button>
            <Button type="submit" radius="md"> Edit </Button>
          </Group>

        </form>
      </Paper>
    </Center>
  );
};

export default EditProduct;