import { Burger, Header, MediaQuery, Text, useMantineTheme } from "@mantine/core";

type Props = {
  opened: boolean;
  setOpened: Function;
};

function TopNavigation({ opened, setOpened }: Props) {
  const theme = useMantineTheme();

  return (
    <Header height={70} p="md">
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
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
      </div>
    </Header>
  );
}

export default TopNavigation;