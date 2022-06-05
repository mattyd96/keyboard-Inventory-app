import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Text, Button, Box, Group, Loader } from '@mantine/core';
import { useMutation, gql } from '@apollo/client';

import { PasswordStrength } from './inputs/PasswordStrength';
import { AuthContext } from '../../context/auth';

const schema = z.object({
  username: z.string().min(2, { message: 'username should have at least 2 letters' }),
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.{6,})/, { message: 'Password not strong enough'}) //TODO need to use a regex
});

function SignupForm() {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState<any>({}); // TODO create a type for this later

  // Form hook
  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  // navigation hook
  const navigate = useNavigate();

  const [addUser, { loading }] = useMutation(SIGNUP_USER, {
    update(_, { data: { signup: userData}}) {
      context.login(userData);
      navigate('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: form.values,
  });

  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={form.onSubmit(() => addUser())}>
        {errors?.username ? 
          <TextInput
            required
            label="Username"
            error={errors.username}
            placeholder="John Doe"
            mt="sm"
            {...form.getInputProps('username')}
          />
          :
          <TextInput
            required
            label="Username"
            placeholder="John Doe"
            mt="sm"
            {...form.getInputProps('username')}
          />
        }
        {errors?.email ?
          <TextInput
            required
            label="Email"
            error={errors.email}
            placeholder="example@mail.com"
            {...form.getInputProps('email')}
          />
          :
          <TextInput
            required
            label="Email"
            placeholder="example@mail.com"
            {...form.getInputProps('email')}
          />
        }
        <PasswordStrength inputs={form.getInputProps('password')} />

        <Group position="apart" mt="xl">
          <Link to={'/login'}>
            <Text>Already have account?</Text>
          </Link>
          <Button type="submit" sx={{width: '6rem'}}>
            {loading ? <Loader size='xs' /> : 'Sign up'}
          </Button>
        </Group>
      </form>
    </Box>
  );
}

const SIGNUP_USER = gql`
  mutation signup(
    $username: String!
    $email: String!
    $password: String!
  ) {
    signup(
      signupinput: {
        username: $username
        email: $email
        password: $password
      }
    ) {
      id email username createdAt token
    }
  }
`

export default SignupForm;