import { useState } from "react";
import { Text, Button, Group, Modal, Badge, Stack } from "@mantine/core";

import SwitchEditForm from "./SwitchEditForm";
import { Spring } from "../../util/springTypes";

type SwitchProp = {
  id: string
  name: string
  stock: boolean
  films: string
  lube: string
  springs: Spring
  top: string
  bottom: string
  totalAmount: number
  availableAmount: number
  delete: React.MouseEventHandler;
}

function SwitchItem(item: SwitchProp) {
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
      <Group position="right">
        <Button size="xs" color="gray" onClick={showEdit}>Edit</Button>
        <Button size="xs" color="red" onClick={item.delete} value={item.id}>Delete</Button>
      </Group>
    </Stack>
  );

  const editDisplay = (
    <Modal opened={edit} onClose={() => setEdit(false)} title="Add a Case">
      <SwitchEditForm {...item} setFormVisibility={setEdit} />
    </Modal>
  );

  return edit ? editDisplay : display;
}

export default SwitchItem;