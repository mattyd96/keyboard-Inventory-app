import { Group, Text } from "@mantine/core";

type LabelProps = {
  manufacturer: string;
  name: string;
}

function KeycapLabel({ manufacturer, name }: LabelProps) {
  return (
    <Group position="apart">
      <Group>
        <Text>{manufacturer}</Text>
        <Text>{name}</Text>
      </Group>
    </Group>
  );
}

export default KeycapLabel;