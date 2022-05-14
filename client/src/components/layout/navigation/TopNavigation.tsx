import { useState } from "react";
import { Burger, Button, Group, Header, MediaQuery, Text, useMantineTheme } from "@mantine/core";
import ThemeToggle from "../../theme/ThemeToggle";
import SignupLoginModal from "../../modals/SignupLoginModal";
import { Link } from "react-router-dom";

type Props = {
  opened: boolean;
  setOpened: Function;
};

function TopNavigation({ opened, setOpened }: Props) {
  const theme = useMantineTheme();
  let form: "login" | "signup" = "login";


  return (
    <Header height={70} p="md">
      <div style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'space-between' }}>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o : boolean) => !o)}
            size="sm"
            //color={theme.colors.gray[6]}
            mr="xl"
          />
        </MediaQuery>

        <Text>Application header</Text>
        <Group>
          <Button component={Link} to="/login">Sign In</Button>
          <ThemeToggle />
        </Group>
      </div>
    </Header>
  );
}

export default TopNavigation;