import { Dispatch, Fragment, SetStateAction, useState } from 'react';
import { Box, TextInput, Button, Group, Select, MultiSelect, NumberInput, Switch, ActionIcon, Text } from '@mantine/core';
import { Trash } from 'tabler-icons-react';
import { randomId } from '@mantine/hooks';
import { useQuery } from '@apollo/client';

import { FETCH_INVENTORY_FOR_BUILDS_QUERY } from "../../util/inventoryGraphql";
import { Case } from "../../util/caseTypes";
import { Switch as SwitchType } from "../../util/switchTypes";


type SwitchFieldType = {
  label: string
  value: string
  amount: number
}
type Props = {
  setFormVisible: Dispatch<SetStateAction<boolean>>;
  handleSubmit: Function
  form: any // TODO create a type for the form object
}

function CaseBaseForm( { setFormVisible, handleSubmit, form }: Props) {
  const { loading, data } = useQuery(FETCH_INVENTORY_FOR_BUILDS_QUERY);

  const CASE_DATA = data.getInventory.cases.map((item: Case) => {return {label: item.name, value: item.id}});
  const SWITCH_DATA = data.getInventory.switches.map((item: SwitchType) => {return {label: item.name, value: item.id, amount: item.availableAmount}});

  const fields = form.values.images.map((item : string, index: number) => (
    <Group key={item} mt="xs">
      <TextInput
        placeholder="Image Link"
        required
        sx={{ flex: 2 }}
        {...form.getListInputProps('images', index)}
      />
      <ActionIcon
        color="red"
        variant="hover"
        onClick={() => form.removeListItem('images', index)}
      >
        <Trash size={16} />
      </ActionIcon>
    </Group>
  ));

  const switchFields = form.values.switches.map((item : SwitchFieldType, index: number) => (
    <Group key={item.value} mt="xs">
      <Select
        label="Switches"
        data={SWITCH_DATA}
        maxDropdownHeight={125}
        placeholder="Select Switch"
        searchable
        {...form.getListInputProps('switches', index, 'name')}
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
        data={CASE_DATA}
        maxDropdownHeight={125}
        placeholder="Select Material"
        searchable
        {...form.getInputProps("switches")}
      />

      <Box mx="auto">
        {fields.length > 0 ? (
          <Fragment>
            <Text size="sm">Images</Text>
            <Text size="xs">Link your images here, make sure they are hosted online (imgur etc.)</Text>
          </Fragment>
        ) : (
          <Text color="dimmed" align="center">
            No images added yet
          </Text>
        )}

        {fields}

        <Group position="center" mt="md">
          <Button
            onClick={() =>
              form.addListItem('kits', { name: '', amount: null, id: randomId() })
            }
          >
            Add Image
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