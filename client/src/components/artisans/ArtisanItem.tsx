import { useState } from "react";
import { Text, Button, Group, Modal, Badge, Stack } from "@mantine/core";

import ArtisanEditForm from "./ArtisanEditForm";

type ArtisanProp = {
  id: string
  name: string
  maker: string
  sculpt: string
  colorway: string
  totalMade: number
  owned: number
  delete: React.MouseEventHandler;
}

function ArtisanItem(item: ArtisanProp) {
  const [edit, setEdit] = useState(false);

  const showEdit = () => {
    setEdit(true);
  };

  const display = (
    <Stack>
      <Group position="apart">
        <Badge>Name</Badge>
        <Text>{item.name}</Text>
      </Group>
      <Group position="apart">
        <Badge>Maker</Badge>
        <Text>{item.maker}</Text>
      </Group>
      <Group position="apart">
        <Badge>sculpt</Badge>
        <Text>{item.sculpt}</Text>
      </Group>
      <Group position="apart">
        <Badge>Colorway</Badge>
        <Text>{item.colorway}</Text>
      </Group>
      <Group position="apart">
        <Badge>Owned</Badge>
        <Text>{`${item.owned} / ${item.totalMade}`}</Text>
      </Group>
      <Group position="right">
        <Button size="xs" color="gray" onClick={showEdit}>Edit</Button>
        <Button size="xs" color="red" onClick={item.delete} value={item.id}>Delete</Button>
      </Group>
    </Stack>
  );

  const editDisplay = (
    <Modal opened={edit} onClose={() => setEdit(false)} title="Add a Case">
      <ArtisanEditForm {...item} setFormVisibility={setEdit} />
    </Modal>
  );

  return edit ? editDisplay : display;
}

export default ArtisanItem;