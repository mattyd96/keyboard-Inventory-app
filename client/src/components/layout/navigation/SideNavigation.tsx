import { Navbar, ScrollArea, Text } from "@mantine/core";
import { useContext, useState } from "react";
import UserButton from "./UserButton";

import { AuthContext } from '../../../context/auth';

// Remove for production
const DUMMY_PIC = "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"

type Props = {
  opened: Boolean;
};

function SideNavigation({ opened }: Props) {
  const { user } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        <Text>Ok Navbar here</Text>
      </Navbar.Section>
      <Navbar.Section>
        {user && <UserButton username={user.username} email={user.email} icon={DUMMY_PIC} />}
      </Navbar.Section>
      
    </Navbar>
  );
}

export default SideNavigation;