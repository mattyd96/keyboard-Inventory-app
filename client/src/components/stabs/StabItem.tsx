import { useState } from "react";
import { Text, Button, Group, Modal, Badge, Stack } from "@mantine/core";

import StabEditForm from "./StabEditForm";
import { Wire } from "../../util/stabTypes";

type StabProp = {
  id: string
  name: string
  wires: Wire
  housings: number
  stems: number
  delete: React.MouseEventHandler;
}

function CaseItem(item: StabProp) {
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
        <Badge>2U</Badge>
        <Text>{item.wires.twoU}</Text>
      </Group>
      <Group position="apart">
        <Badge>6U</Badge>
        <Text>{item.wires.sixU}</Text>
      </Group>
      <Group position="apart">
        <Badge>6.25U</Badge>
        <Text>{item.wires.six25U}</Text>
      </Group>
      <Group position="apart">
        <Badge>7U</Badge>
        <Text>{item.wires.sevenU}</Text>
      </Group>
      <Group position="apart">
        <Badge>Housings</Badge>
        <Text>{item.housings}</Text>
      </Group>
      <Group position="apart">
        <Badge>Stems</Badge>
        <Text>{item.stems}</Text>
      </Group>
      <Group position="right">
        <Button size="xs" color="gray" onClick={showEdit}>Edit</Button>
        <Button size="xs" color="red" onClick={item.delete} value={item.id}>Delete</Button>
      </Group>
    </Stack>
  );

  const editDisplay = (
    <Modal opened={edit} onClose={() => setEdit(false)} title="Add a Case">
      <StabEditForm {...item} setFormVisibility={setEdit} />
    </Modal>
  );

  return edit ? editDisplay : display;
}

export default CaseItem;