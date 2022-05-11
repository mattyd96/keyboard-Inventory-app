import { Navbar, Text } from "@mantine/core";
import { useState } from "react";

type Props = {
  opened: Boolean;
};

function SideNavigation({ opened }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
      <Text>Ok Navbar here</Text>
    </Navbar>
  );
}

export default SideNavigation;