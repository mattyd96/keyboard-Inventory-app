import { useState } from "react";
import { Text, Button, Group, Modal, Badge, Stack } from "@mantine/core";

import SwitchEditForm from "./SwitchEditForm";
import { Spring } from "../../util/springTypes";

type SwitchProp = {
  id: string
  name: string
  stock: string
  films: string
  lube: string
  springs: Spring
  top: string
  bottom: string
  totalAmount: number
  availableAmount: number
  delete: React.MouseEventHandler;
  badgeColor: string
}

function SwitchItem(item: SwitchProp) {
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
      {item.films &&
        <Group position="apart">
          <Badge color={item.badgeColor} variant='filled'>Films</Badge>
          <Text>{item.films}</Text>
        </Group>
      }
      {item.lube &&
        <Group position="apart">
          <Badge color={item.badgeColor} variant='filled'>Switch Lube</Badge>
          <Text>{item.lube}</Text>
        </Group>
      }
      {item.top &&
        <Group position="apart">
          <Badge color={item.badgeColor} variant='filled'>Switch Top</Badge>
          <Text>{item.top}</Text>
        </Group>
      }
      {item.bottom && 
        <Group position="apart">
          <Badge color={item.badgeColor} variant='filled'>Switch Bottom</Badge>
          <Text>{item.bottom}</Text>
        </Group>
      }
      {item.springs.name &&
        <Group position="apart">
          <Badge color={item.badgeColor} variant='filled'>Spring Name</Badge>
          <Text>{item.springs.name}</Text>
        </Group>
      }
      {item.springs.weight &&
        <Group position="apart">
          <Badge color={item.badgeColor} variant='filled'>Spring Weight</Badge>
          <Text>{item.springs.weight}</Text>
        </Group>
      }
      {item.springs.lube &&
        <Group position="apart">
          <Badge color={item.badgeColor} variant='filled'>Spring Lube</Badge>
          <Text>{item.springs.lube}</Text>
        </Group>
      }
      <Group position="apart">
        <Badge color={item.badgeColor} variant='filled'>Total Amount</Badge>
        <Text>{item.totalAmount}</Text>
      </Group>
      <Group position="apart">
        <Badge color={item.badgeColor} variant='filled'>Available Amount</Badge>
        <Text>{item.availableAmount}</Text>
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