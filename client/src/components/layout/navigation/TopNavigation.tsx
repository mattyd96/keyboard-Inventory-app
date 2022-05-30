import { useContext } from "react";
import { Burger, Button, Group, Header, MediaQuery, Title } from "@mantine/core";
import ThemeToggle from "../../theme/ThemeToggle";
import { Link } from "react-router-dom";

import { AuthContext } from '../../../context/auth';

type Props = {
  opened: boolean;
  setOpened: Function;
};

function TopNavigation({ opened, setOpened }: Props) {
  const { user, logout } = useContext(AuthContext);


  return (
    <Header height={60} p="sm" sx={{borderBottom: 'none'}}>
      <div style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'space-between'}}>
        <Group>
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
        </Group>
        <Group>
          {!user && <Button size="xs" variant="default"  component={Link} to="/login">Sign In</Button>}
          {user && <Button size="xs" color="red" variant="outline" onClick={() =>{logout()}}>Sign Out</Button>}
          <ThemeToggle />
        </Group>
      </div>
    </Header>
  );
}

export default TopNavigation;