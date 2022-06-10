import { Dispatch, SetStateAction } from 'react';
import { Card, Image, Text, Group, useMantineTheme, Menu } from '@mantine/core';

import { Link } from 'react-router-dom';
import { Build } from "../../util/buildTypes";
import { Tool, Trash } from 'tabler-icons-react';

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
    <Card shadow="sm" p="sm">
      <Card.Section component={Link} to={`/inventory/builds/${item.id}`}>
        <Image
          withPlaceholder
          src={item.images.length > 0 ? item.images[0] : ''}
          height={180}
          alt={item.images.length > 0 ? item.images[0] : 'placeholder image'}
        />
      </Card.Section>
      <Group position='apart' align={'center'} mt={theme.spacing.sm}>
        <Text weight={600}>{item.name}</Text>
        <Menu>
          <Menu.Item icon={<Tool size={20}/>} onClick={showEdit}>
            Edit
          </Menu.Item>
          <Menu.Item icon={<Trash size={20}/>} onClick={item.delete} value={item.id}>
            Delete
          </Menu.Item>
        </Menu>
      </Group>
    </Card>
  );
}


export default BuildCard;