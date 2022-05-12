import { Dispatch, SetStateAction } from "react";
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { TextInput, PasswordInput, Text, Button, Box, Group, UnstyledButton } from '@mantine/core';
import { EyeCheck, EyeOff } from 'tabler-icons-react';

import { PasswordStrength } from './inputs/PasswordStrength';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(8, { message: 'Password should at least be 8 characters' }) //TODO need to use a regex
});

type Props = {
  changeForm: Dispatch<SetStateAction<string>>
}

function LoginForm({ changeForm }: Props) {
  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          required
          label="Email"
          placeholder="example@mail.com"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          required
          label="Password"
          placeholder="Password"
          visibilityToggleIcon={({ reveal, size }) =>
            reveal ? <EyeOff size={size} /> : <EyeCheck size={size} />
          }
        />

        <Group position="apart" mt="xl">
          <UnstyledButton onClick={()=>{changeForm('signup')}}>
            <Text>Don't have account yet?</Text>
          </UnstyledButton>
          <Button type="submit">Login</Button>
        </Group>
      </form>
    </Box>
  );
}

export default LoginForm;