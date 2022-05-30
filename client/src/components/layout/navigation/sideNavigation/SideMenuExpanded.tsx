import { Title, Group, createStyles, Stack } from "@mantine/core";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Checklist } from "tabler-icons-react";

const LINKS = ['Builds', 'Cases', 'Keycaps', 'Switches', 'Stabs', 'Springs', 'Artisans'];

const useStyles = createStyles((theme) => ({

  link: {
    textDecoration: 'none',
    color: 'inherit',
    width: '100%',
    borderRadius: theme.radius.sm,
    padding: `${theme.spacing.xs}px`,
    fontWeight: 600,
    '&:hover': {
      backgroundColor: theme.colors.gray[9],
    },
  },
  active: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
  },
  button: {
    color: theme.white,
    backgroundColor: theme.colors.blue[6],
    border: 0,
    borderRadius: theme.radius.md,
    padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,
    cursor: 'pointer',
    margin: theme.spacing.md,

    // Use pseudo-classes just like you would in Sass
    '&:hover': {
      backgroundColor: theme.colors.blue[9],
    },

    '&:not(:first-of-type)': {
      backgroundColor: theme.colors.violet[6],

      // pseudo-classes can be nested
      '&:hover': {
        backgroundColor: theme.colors.violet[9],
      },
    },
  },
}));

function SideMenuExpanded() {
  const { classes } = useStyles();
  return (
    <Fragment>
      <Stack align={'stretch'} spacing="xs">
        <Group>
          <Checklist />
          <Title order={4}>Inventory</Title>
        </Group>
        {LINKS.map((link, index) => 
          <NavLink to={`/inventory/${link.toLowerCase()}`} key={index} 
            className={({ isActive }) => isActive ? `${classes.active} ${classes.link}` : `${classes.link}` }
          >
            {link}
          </NavLink>
        )}
      </Stack>
    </Fragment>
  );
}

export default SideMenuExpanded;