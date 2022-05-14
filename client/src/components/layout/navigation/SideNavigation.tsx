import { Navbar, ScrollArea, Text } from "@mantine/core";
import { useState } from "react";

type Props = {
  opened: Boolean;
};

function SideNavigation({ opened }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        <Text>Ok Navbar here</Text>
      </Navbar.Section>
      <Navbar.Section>
        <Text>profile stuff here</Text>
      </Navbar.Section>
      
    </Navbar>
  );
}

export default SideNavigation;