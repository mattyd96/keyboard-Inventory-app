import { Dispatch, SetStateAction, useState } from 'react';
import { Box, TextInput, Button, Group, Select, MultiSelect, NumberInput, Switch, ActionIcon, Text } from '@mantine/core';
import { Trash } from 'tabler-icons-react';
import { randomId } from '@mantine/hooks';

const KIT_DATA = [
  'Base',
  'Spacebars',
  '40s',
  'JIS',
  'Hangul Alphas',
  'Hiragana Alphas'
];

const MATERIAL_DATA = [
  "ABS",
  "PBT"
]

type Kit = {
  name: string;
  amount: number;
  key: string;
}

type Props = {
  setFormVisible: Dispatch<SetStateAction<boolean>>;
  handleSubmit: Function
  form: any // TODO create a type for the form object
}

function CaseBaseForm( { setFormVisible, handleSubmit, form }: Props) {
  const [materialData, setMaterialData] = useState(MATERIAL_DATA);

  const fields = form.values.kits.map((item : Kit, index: number) => (
    <Group key={item.key} mt="xs">
      <TextInput
        placeholder="Kit name"
        required
        sx={{ flex: 2 }}
        {...form.getListInputProps('kits', index, 'name')}
      />
      <NumberInput
        placeholder="Number Held"
        sx={{ flex: 1 }}
        {...form.getListInputProps('kits', index, 'amount')}
      />
      <ActionIcon
        color="red"
        variant="hover"
        onClick={() => form.removeListItem('kits', index)}
      >
        <Trash size={16} />
      </ActionIcon>
    </Group>
  ));

  return (
    <Box
      component="form"
      onSubmit={form.onSubmit(handleSubmit)}
      //onSubmit={(event : any) => {event.preventDefault(); console.log(form.values)}}
      sx={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
    >
      <TextInput
        required
        label="Name"
        placeholder="GMK Handarbeige"
        {...form.getInputProps("name")}
      />
      <TextInput
        label="Manufacturer"
        placeholder="GMK"
        {...form.getInputProps("manufacturer")}
      />
      <Select
        label="Material"
        data={materialData}
        maxDropdownHeight={125}
        placeholder="Select Material"
        searchable
        creatable
        getCreateLabel={(query) => `+ Create ${query}`}
        onCreate={(query) => setMaterialData((current) => [...current, query])}
        {...form.getInputProps("material")}
      />

      <Box mx="auto">
        {fields.length > 0 ? (
          <Text size="sm">Kits</Text>
        ) : (
          <Text color="dimmed" align="center">
            No kits added yet
          </Text>
        )}

        {fields}

        <Group position="center" mt="md">
          <Button
            onClick={() =>
              form.addListItem('kits', { name: '', amount: null, key: randomId() })
            }
          >
            Add Kit
          </Button>
        </Group>
      </Box>

      <Group position="right" mt="md">
        <Button
          type="button"
          onClick={() => {
            setFormVisible(false);
          }}
        >
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </Group>
    </Box>
  );
}

export default CaseBaseForm;