import { Group, Text, useMantineTheme } from "@mantine/core";

type LabelProps = {
  name: string;
}

function SwitchLabel({ name }: LabelProps) {
  const { colors } = useMantineTheme();
  return (
    <Group position="apart">
      <Group>
        <Text>{name}</Text>
      </Group>
    </Group>
  );
}

export default SwitchLabel;