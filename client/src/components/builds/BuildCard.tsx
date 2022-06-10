import { Dispatch, SetStateAction } from 'react';
import { Card, Image, Text, Button, Group, useMantineTheme } from '@mantine/core';

import { Link } from 'react-router-dom';
import { Build } from "../../util/buildTypes";

interface BuildProp extends Build {
  delete: React.MouseEventHandler;
  setFormVisibility: Dispatch<SetStateAction<boolean>>
}

function BuildCard(item: BuildProp) {
  const theme = useMantineTheme();
  //const secondaryColor = theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  const showEdit = () => {
    item.setFormVisibility(true);
  };

  return (
    <Card shadow="sm" p="lg">
      <Card.Section component={Link} to={`/inventory/builds/${item.id}`}>
        <Image
          src={item.images.length > 0 ? item.images[0] : ''}
          height={160}
          alt="Keyboard Picture"
        />
      </Card.Section>

      <Text weight={600} style={{ marginBottom: 15, marginTop: theme.spacing.sm }}>{item.name}</Text>

      <Group grow >
        <Button size="xs" color="gray" onClick={showEdit}>Edit</Button>
        <Button size="xs" color="red" onClick={item.delete} value={item.id}>Delete</Button>
      </Group>
    </Card>
  );
}


export default BuildCard;