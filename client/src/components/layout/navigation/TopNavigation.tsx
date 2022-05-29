import { useContext, MouseEvent, MouseEventHandler } from "react";
import { Burger, Button, Group, Header, MediaQuery, Text, Title, useMantineTheme } from "@mantine/core";
import ThemeToggle from "../../theme/ThemeToggle";
import { Link } from "react-router-dom";

import { AuthContext } from '../../../context/auth';
import { MenuContext } from "../../../context/menu";

type Props = {
  opened: boolean;
  setOpened: Function;
};

function TopNavigation({ opened, setOpened }: Props) {
  const theme = useMantineTheme();
  const { user, logout } = useContext(AuthContext);
  const { toggleMenu, open } = useContext(MenuContext);
  let form: "login" | "signup" = "login";


  return (
    <Header height={60} p="sm" sx={{borderBottom: 'none'}}>
      <div style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'space-between'}}>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            //onClick={() => toggleMenu((o: boolean) => !o)}
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

        <Title order={3}>Key[Board]</Title>
        <Group>
          {!user && <Button component={Link} to="/login">Sign In</Button>}
          {user && <Button onClick={() =>{logout()}}>Sign Out</Button>}
          <ThemeToggle />
        </Group>
      </div>
    </Header>
  );
}

export default TopNavigation;