import { useState } from 'react';
import { AppShell, useMantineTheme } from '@mantine/core';

import TopNavigation from './navigation/TopNavigation';
import SideNavigation from './navigation/sideNavigation/SideNavigation';

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
      navbar={<SideNavigation opened={opened}/>}
      header={<TopNavigation opened={opened} setOpened={setOpened} />}
    >
      {children}
    </AppShell>
  );
}

export default Layout;