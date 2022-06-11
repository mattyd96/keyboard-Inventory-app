import { useState } from "react";
import { Text, Button, Group, Modal, Badge, Stack } from "@mantine/core";

import CaseEditForm from "./CaseEditForm";
import { Plate } from "../../util/caseTypes";

type CaseProp = {
  id: string;
  name: string;
  creator: string;
  color: string;
  layout: string;
  caseMaterial: string;
  hasWeight: boolean;
  weightMaterial: string;
  plates: Plate[];
  weight: string;
  weightUnits: string;
  built: boolean;
  delete: React.MouseEventHandler;
  badgeColor: string
}

function CaseItem(item: CaseProp) {
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
        <Badge color={item.badgeColor} variant='filled'>Creator</Badge>
        <Text>{item.creator}</Text>
      </Group>
      <Group position="apart">
        <Badge color={item.badgeColor} variant='filled'>Color</Badge>
        <Text>{item.color}</Text>
      </Group>
      <Group position="apart">
        <Badge color={item.badgeColor} variant='filled'>Layout</Badge>
        <Text>{item.layout}</Text>
      </Group>
      <Group position="apart">
        <Badge color={item.badgeColor} variant='filled'>Case Material</Badge>
        <Text>{item.caseMaterial}</Text>
      </Group>
      {item.hasWeight &&
        <Group position="apart">
          <Badge color={item.badgeColor} variant='filled'>Weight Material</Badge>
          <Text>{item.weightMaterial}</Text>
        </Group>
      }
      <Group position="apart">
        <Badge color={item.badgeColor} variant='filled'>Plates</Badge>
        <Text>{item.plates.map(plate => `${plate.type} `)}</Text>
      </Group>
      <Group position="apart">
        <Badge color={item.badgeColor} variant='filled'>Weight</Badge>
        <Text>{`${item.weight} ${item.weightUnits}`}</Text>
      </Group>
      <Group position="right">
        <Button size="xs" color="gray" onClick={showEdit}>Edit</Button>
        <Button size="xs" color="red" onClick={item.delete} value={item.id}>Delete</Button>
      </Group>
    </Stack>
  );

  const editDisplay = (
    <Modal opened={edit} onClose={() => setEdit(false)} title="Add a Case">
      <CaseEditForm {...item} setFormVisibility={setEdit} />
    </Modal>
  );

  return edit ? editDisplay : display;
}

export default CaseItem;