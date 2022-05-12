import { useState } from "react";
import { Burger, Button, Group, Header, MediaQuery, Text, useMantineTheme } from "@mantine/core";
import ThemeToggle from "../../theme/ThemeToggle";
import SignupLoginModal from "../../modals/SignupLoginModal";

type Props = {
  opened: boolean;
  setOpened: Function;
};

function TopNavigation({ opened, setOpened }: Props) {
  const theme = useMantineTheme();
  const [modalOpened, setModalOpened] = useState(false);
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
          <Button onClick={() => {setModalOpened(true)}}>Sign In</Button>
          <ThemeToggle />
        </Group>
      </div>

      <SignupLoginModal opened={modalOpened} setOpened={setModalOpened} />
    </Header>
  );
}

export default TopNavigation;