import { Group, Text, useMantineTheme } from "@mantine/core";

type LabelProps = {
  creator: string;
  name: string;
  built: boolean;
}

function CaseLabel({ creator, name, built }: LabelProps) {
  const { colors } = useMantineTheme();
  return (
    <Group position="apart">
      <Group>
        <Text>{creator}</Text>
        <Text>{name}</Text>
      </Group>
      {built && <Text color={colors.green[3]}>Built</Text>}
    </Group>
  );
}

export default CaseLabel;