import { useContext } from "react";
import { Burger, Button, Group, Header, MediaQuery, Text, useMantineTheme } from "@mantine/core";
import ThemeToggle from "../../theme/ThemeToggle";
import SignupLoginModal from "../../modals/SignupLoginModal";
import { Link } from "react-router-dom";

import { AuthContext } from '../../../context/auth';

type Props = {
  opened: boolean;
  setOpened: Function;
};

function TopNavigation({ opened, setOpened }: Props) {
  const theme = useMantineTheme();
  const { user } = useContext(AuthContext);
  let form: "login" | "signup" = "login";


  return (
    <Header height={60} p="sm" sx={{borderBottom: 'none'}}>
      <div style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'space-between'}}>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o : boolean) => !o)}
            size="sm"
            mr="xl"
          />
        </MediaQuery>
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={false}
            onClick={() => setOpened((o : boolean) => !o)}
            size="sm"
            mr="xl"
          />
        </MediaQuery>

        <Text>Application header</Text>
        <Group>
          {!user && <Button component={Link} to="/login">Sign In</Button>}
          <ThemeToggle />
        </Group>
      </div>
    </Header>
  );
}

export default TopNavigation;