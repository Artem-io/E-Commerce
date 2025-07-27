import {
  Anchor,
  Button,
  Center,
  Checkbox,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst, useToggle } from "@mantine/hooks";
import { login } from "../api/ProductsService";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Authentication = () => {
  const navigate = useNavigate();
  const [type, toggle] = useToggle(["login", "register"]);
  const { setIsAuth } = useAuth();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
      terms: false,
    },

    validate: {
      password: (val) => (val.length <= 1 ? "Password should include at least 6 characters" : null),
    },
  });

  const attemptLogin = async () => {
    try {
      await login(form.values);
      setIsAuth(true);
      navigate("/");
    } 
    catch (err) {console.error("Error during login:", err)}
  };

  return (
    <Center h={600}>
      <Paper w={400} radius="md" p="lg" withBorder shadow="sm">
        <Text size="lg" fw={500}>
          {" "}
          Welcome, {type} with{" "}
        </Text>

        <Group grow mb="md" mt="md">
          <Button leftSection={<FcGoogle size={20} />} variant="default" radius="lg">
            Google
          </Button>
          <Button leftSection={<FaMicrosoft size={20} />} variant="default" radius="lg">
            Microsoft
          </Button>
        </Group>

        <Divider label="Or continue with username" labelPosition="center" my="lg" />

        <form onSubmit = {form.onSubmit(() => {attemptLogin()})}>
          <Stack>
            <TextInput label="Username" placeholder="Your username" {...form.getInputProps("username")} radius="md" />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              {...form.getInputProps("password")}
              error={form.errors.password && "Password should include at least 6 characters"}
              radius="md"
            />

            {type === "register" && (
              <Checkbox
                required
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) => form.setFieldValue("terms", event.currentTarget.checked)}
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
