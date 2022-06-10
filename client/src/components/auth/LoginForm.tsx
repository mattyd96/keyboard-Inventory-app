import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { TextInput, PasswordInput, Text, Button, Box, Group, Loader } from '@mantine/core';
import { EyeCheck, EyeOff } from 'tabler-icons-react';
import { useMutation, gql } from '@apollo/client';

import { AuthContext } from '../../context/auth';

const schema = z.object({
  username: z.string(),
  password: z.string() //TODO need to use a regex
});

function LoginForm() {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState<any>({}); // TODO create a type for this later
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
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData }}) {
      context.login(userData);
      navigate('/inventory/home');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: form.values,
  });

  return (
    <Box sx={{ maxWidth: 340, position: 'relative' }} mx="auto" p='1rem'>
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
        {errors &&
          <Text mt='.5rem' color={'red'}>{errors.general}</Text> 
        }

        <Group position="apart" mt="xl">
          <Link to={'/signup'}>
            <Text>Don't have account yet?</Text>
          </Link>
          <Button type="submit" sx={{width: '5rem'}}>
            {loading ? <Loader size='xs' /> : 'Login'}
          </Button>
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