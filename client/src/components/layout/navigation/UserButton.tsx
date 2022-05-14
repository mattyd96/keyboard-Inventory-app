import { ReactNode } from 'react';
import { UnstyledButton, Group, Avatar, Text, Box, useMantineTheme } from '@mantine/core';
import { ChevronRight, ChevronLeft } from 'tabler-icons-react';

interface Props {
  icon: string;
  username: string;
  email: string;
}

function UserButton({ icon, username, email }: Props) {
  const theme = useMantineTheme();

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `1px solid ${
          theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
      }}
    >
      <UnstyledButton
        sx={{
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          },
        }}
      >
        <Group>
          <Avatar
            src={icon ? icon : ''}
            radius="xl"
          />
          <Box sx={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              { username }
            </Text>
            <Text color="dimmed" size="xs">
              { email }
            </Text>
          </Box>

          {theme.dir === 'ltr' ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Group>
      </UnstyledButton>
    </Box>
  );

}

export default UserButton;