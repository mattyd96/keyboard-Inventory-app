import { Dispatch, SetStateAction, useState } from 'react';
import { Box, TextInput, Button, Group, Select, MultiSelect, NumberInput, Switch, ActionIcon, Text, SegmentedControl } from '@mantine/core';
import { Trash } from 'tabler-icons-react';
import { randomId } from '@mantine/hooks';

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

function SwitchBaseForm( { setFormVisible, handleSubmit, form }: Props) {
  const [stockValue, setStockValue] = useState('true');

  return (
    <Box
      component="form"
      onSubmit={form.onSubmit(handleSubmit)}
      //onSubmit={(event : any) => {event.preventDefault(); console.log(form.values)}}
      sx={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
    >
      <SegmentedControl
        value={stockValue}
        onChange={setStockValue}
        data={[
          { label: 'Stock', value: 'true' },
          { label: 'Modded', value: 'false' },
        ]}
      />
      {stockValue === 'true' &&
        <Text>Stock</Text> 
      }
      {stockValue === 'false' &&
        <Text>Modded</Text>
      }
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

export default SwitchBaseForm;