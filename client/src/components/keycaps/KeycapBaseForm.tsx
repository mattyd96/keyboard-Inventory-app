import { Dispatch, SetStateAction, useState } from 'react';
import { Box, TextInput, Button, Group, Select, NumberInput, ActionIcon, Text } from '@mantine/core';
import { Trash } from 'tabler-icons-react';
import { randomId } from '@mantine/hooks';
import AddButton from '../buttons/AddButton';

const MATERIAL_DATA = [
  "ABS",
  "PBT"
]

type Kit = {
  name: string;
  amount: number;
  id: string;
}

type Props = {
  setFormVisible: Dispatch<SetStateAction<boolean>>;
  handleSubmit: Function
  form: any // TODO create a type for the form object
}

function CaseBaseForm( { setFormVisible, handleSubmit, form }: Props) {
  const [materialData, setMaterialData] = useState(MATERIAL_DATA);

  const fields = form.values.kits.map((item : Kit, index: number) => (
    <Group key={item.id} mt="xs">
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
          <AddButton
            onClick={() =>
              form.addListItem('kits', { name: '', amount: null, id: randomId() })
            }
          >
            Add Another Kit
          </AddButton>
        </Group>
      </Box>

      <Group position="right" mt="md">
        <Button
          type="button"
          color="red"
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