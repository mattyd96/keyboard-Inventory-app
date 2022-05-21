import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { TextInput, PasswordInput, Text, Button, Box, Group, UnstyledButton } from '@mantine/core';
import { EyeCheck, EyeOff } from 'tabler-icons-react';
import { useMutation, gql } from '@apollo/client';

import { AuthContext } from '../../context/auth';

const schema = z.object({
  username: z.string(),
  password: z.string() //TODO need to use a regex
});

function LoginForm() {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState<any>([]); // TODO create a type for this later
  const navigate = useNavigate();

  // Form hook
  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      username: '',
      password: '',
    },
  });

  // Login Mutation
  const [loginUser] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData }}) {
      console.log(userData);
      context.login(userData);
      navigate('/');
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.errors);
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: form.values,
  });

  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={form.onSubmit(() => loginUser())}>
        <TextInput
          required
          label="Username or Email"
          placeholder="example@mail.com"
          {...form.getInputProps('username')}
        />
        <PasswordInput
          required
          label="Password"
          placeholder="Password"
          visibilityToggleIcon={({ reveal, size }) =>
            reveal ? <EyeOff size={size} /> : <EyeCheck size={size} />
          }
          {...form.getInputProps('password')}
        />

        <Group position="apart" mt="xl">
          <Link to={'/signup'}>
            <Text>Don't have account yet?</Text>
          </Link>
          <Button type="submit">Login</Button>
        </Group>
      </form>
    </Box>
  );
}

const LOGIN_USER = gql`
  mutation login(
    $username: String!
    $password: String!
  ) {
    login(
      username: $username
      password: $password
    ) {
      id email username createdAt token
    }
  }
`

export default LoginForm;