import {
  Anchor,
  Button,
  Center,
  Checkbox,
  Group,
  Paper,
  PasswordInput,
  Stack, Text, TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst, useToggle } from "@mantine/hooks";
import { login, register } from "../Api/ProductsService";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { notifications } from "@mantine/notifications";
import type { AxiosError } from "axios";
import { ImCross } from "react-icons/im";

const Authentication = () => {
  const navigate = useNavigate();
  const [type, toggle] = useToggle(["login", "register"]);
  const { setIsAuth } = useAuth();
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
      terms: false
    },

    validate: {
      username: (val) => (val === "" ? "Please enter username" : null),
      password: (val) => (val.length < 4 ? "Password should include at least 4 characters" : null),
      terms: (val) => ((type === "register" && !val) ? "Please accept terms and conditions" : null)
    },
  });

  const attemptLogin = async () => {
    try {
      await login(form.values);
      setIsAuth(true);
      navigate("/");
      notifications.show({
        color: "#28a745",
        message: "You've logged in successfully",
        radius: 12,
        withBorder: true,
        icon: <FaCheck />,
        position: "bottom-center"
      });
    } 
    catch (err) {
      notifications.show({
        color: "red",
        title: "An error occurred",
        message: err.response.data.error,
        radius: 12,
        withBorder: true,
        icon: <ImCross />,
        position: "bottom-center",
        autoClose: 4000
      });
      // console.log(err.response.data.error);
    }
  };

  const attemptRegister = async () => {
    try {
      await register(form.values);
      notifications.show({
        color: "#28a745",
        title: "Thank you for registration",
        message: "You can now login to your account",
        radius: 12,
        w: 350,
        withBorder: true,
        icon: <FaCheck />,
      });
      form.reset();
      toggle();
    } 
    catch (err) {
      console.error("Error during registration:", err);
    }
  };

  return (
    <Center h={600}>
      <Paper w={400} radius="lg" p="lg" withBorder shadow="sm">
        <Text ta="center" mb="sm" size="xl" fw={600}>
          {" "}
          Welcome, {type} with username
        </Text>

        <form onSubmit = {form.onSubmit(() => type === 'login'? attemptLogin() : attemptRegister())}>
          <Stack>
            <TextInput label="Username" placeholder="Your username" {...form.getInputProps("username")} radius="md" />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              {...form.getInputProps("password")}
              radius="md"
            />

            {type === "register" && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
              error={form.errors.terms}
              />
            )}
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
              {type === "register" ? "Already have an account? Login" : "Don't have an account? Register"}
            </Anchor>
            <Button onClick={()=>navigate('/')} variant="default" radius="md"> Back </Button>
            <Button type="submit" radius="md"> {upperFirst(type)} </Button>
          </Group>
        </form>
      </Paper>
    </Center>
  );
};

export default Authentication;
