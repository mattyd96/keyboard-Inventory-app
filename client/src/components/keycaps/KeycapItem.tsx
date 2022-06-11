import { useState } from "react";
import { Text, Button, Group, Modal, Badge, Stack } from "@mantine/core";

import KeycapEditForm from "./KeycapEditForm";
import { Kit } from "../../util/keycapTypes";

type KeycapProp = {
  id: string
  name: string
  manufacturer: string
  material: string
  kits: Kit[]
  delete: React.MouseEventHandler;
  badgeColor: string
}

function CaseItem(item: KeycapProp) {
  const [edit, setEdit] = useState(false);

  const showEdit = () => {
    setEdit(true);
  };

  const display = (
    <Stack>
      <Group position="apart">
        <Badge color={item.badgeColor} variant='filled'>Name</Badge>
        <Text>{item.name}</Text>
      </Group>
      <Group position="apart">
        <Badge color={item.badgeColor} variant='filled'>Manufacturer</Badge>
        <Text>{item.manufacturer}</Text>
      </Group>
      <Group position="apart">
        <Badge color={item.badgeColor} variant='filled'>Material</Badge>
        <Text>{item.material}</Text>
      </Group>
      <Group position="apart">
        <Badge color={item.badgeColor} variant='filled'>Kits</Badge>
        <Group>
          {item.kits.map(kit => 
            <Group key={kit.id}>
              <Text>{kit.name}</Text>
              <Badge color={item.badgeColor} variant='filled'>{kit.amount}</Badge>
            </Group>
          )}
        </Group>
      </Group>
      <Group position="right">
        <Button size="xs" color="gray" onClick={showEdit}>Edit</Button>
        <Button size="xs" color="red" onClick={item.delete} value={item.id}>Delete</Button>
      </Group>
    </Stack>
  );

  const editDisplay = (
    <Modal opened={edit} onClose={() => setEdit(false)} title="Add a Case">
      <KeycapEditForm {...item} setFormVisibility={setEdit} />
    </Modal>
  );

  return edit ? editDisplay : display;
}

export default CaseItem;