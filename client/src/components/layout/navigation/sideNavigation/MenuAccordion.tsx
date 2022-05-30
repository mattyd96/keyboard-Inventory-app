import { Accordion, Group, Text } from "@mantine/core";
import { Checklist, Home, Plus } from "tabler-icons-react";

function MenuAccordian() {
  return (
    <Accordion initialItem={0} iconPosition="right" disableIconRotation multiple>
      <Accordion.Item
        label={<Group>
          <Home />
          <Text>Home</Text>
        </Group>}
        icon={<Plus size={16}/>}
      >
        Ok so here is some stuff yeah
      </Accordion.Item>
      <Accordion.Item
        label={<Group>
          <Checklist />
          <Text>Inventory</Text>
        </Group>}
        icon={<Plus size={16}/>}
      >
        Ok so here is some stuff yeah
      </Accordion.Item>
    </Accordion>
  );
}

export default MenuAccordian;