import { Fragment } from 'react';
import { UnstyledButton, Group, Avatar, Text, Box, useMantineTheme } from '@mantine/core';
import { ChevronRight } from 'tabler-icons-react';

interface Props {
  icon: string;
  username: string;
  email: string;
  opened: Boolean;
}

function UserButton({ icon, username, email, opened }: Props) {
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
      {opened && 
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
            <Fragment>
              <Box sx={{ flex: 1 }}>
                <Text size="sm" weight={500}>
                  { username }
                </Text>
                <Text color="dimmed" size="xs">
                  { email }
                </Text>
              </Box>
              <ChevronRight size={18} />
            </Fragment> 
          </Group>
        </UnstyledButton>
      }
    </Box>
  );

}

export default UserButton;