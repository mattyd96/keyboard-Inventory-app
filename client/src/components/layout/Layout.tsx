import { useState } from 'react';
import { AppShell, useMantineTheme } from '@mantine/core';

type Props = {
  children?: React.ReactNode;
};

function Layout({ children }: Props) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return(
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      fixed
    >
      
    </AppShell>
  );
}

export default Layout;