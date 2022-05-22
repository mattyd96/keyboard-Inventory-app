import { useState } from "react";
import { Text, Button, Group, Modal, Badge, Stack } from "@mantine/core";

import SpringEditForm from "./SpringEditForm";

type SpringProp = {
  _id: string;
  name: string;
  type: string
  weight: string
  length: string
  lube: string
  amount: Number
  delete: React.MouseEventHandler;
}

function SpringItem(item: SpringProp) {
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
        <Badge>Weight</Badge>
        <Text>{item.weight}</Text>
      </Group>
      <Group position="right">
        <Button size="xs" color="gray" onClick={showEdit}>Edit</Button>
        <Button size="xs" color="red" onClick={item.delete} value={item._id}>Delete</Button>
      </Group>
    </Stack>
  );

  const editDisplay = (
    <Modal opened={edit} onClose={() => setEdit(false)} title="Add a Case">
      <SpringEditForm {...item} setFormVisibility={setEdit} />
    </Modal>
  );

  return edit ? editDisplay : display;
}

export default SpringItem;