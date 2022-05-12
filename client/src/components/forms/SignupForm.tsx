import { Dispatch, SetStateAction } from "react";
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { TextInput, Text, Button, Box, Group, UnstyledButton } from '@mantine/core';

import { PasswordStrength } from './inputs/PasswordStrength';

const schema = z.object({
  username: z.string().min(2, { message: 'username should have at least 2 letters' }),
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(8, { message: 'Password should at least be 8 characters' }) //TODO need to use a regex
});

type Props = {
  changeForm: Dispatch<SetStateAction<string>>
}

function SignupForm({ changeForm }: Props) {
  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          required
          label="Name"
          placeholder="John Doe"
          mt="sm"
          {...form.getInputProps('username')}
        />
        <TextInput
          required
          label="Email"
          placeholder="example@mail.com"
          {...form.getInputProps('email')}
        />
        <PasswordStrength inputs={form.getInputProps('password')} />

        <Group position="apart" mt="xl">
          <UnstyledButton onClick={()=>{changeForm('login')}}>
            <Text>Already have account?</Text>
          </UnstyledButton>
          <Button type="submit">Sign Up</Button>
        </Group>
      </form>
    </Box>
  );
}

export default SignupForm;