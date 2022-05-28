import { Group, Text, useMantineTheme } from "@mantine/core";

type LabelProps = {
  name: string;
  stock: string;
}

function SwitchLabel({ name, stock }: LabelProps) {
  const { colors } = useMantineTheme();
  return (
    <Group position="apart">
      <Group>
        <Text>{name}</Text>
        {stock === 'false' && <Text color="green">Modded</Text>}
      </Group>
    </Group>
  );
}

export default SwitchLabel;