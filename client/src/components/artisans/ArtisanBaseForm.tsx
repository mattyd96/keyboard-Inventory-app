import { Dispatch, SetStateAction, useState } from 'react';
import { Box, TextInput, Button, Group, NumberInput } from '@mantine/core';

type Props = {
  setFormVisible: Dispatch<SetStateAction<boolean>>;
  handleSubmit: Function
  form: any // TODO create a type for the form object
}

function ArtisanBaseForm( { setFormVisible, handleSubmit, form }: Props) {

  return (
    <Box
      component="form"
      onSubmit={form.onSubmit(handleSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
    >
      <TextInput
        required
        label="Name"
        {...form.getInputProps("name")}
      />
      <TextInput
        label="Maker"
        {...form.getInputProps("maker")}
      />
      <TextInput
        label="Sculpt"
        {...form.getInputProps("sculpt")}
      />
      <TextInput
        label="Colorway"
        {...form.getInputProps("colorway")}
      />
      <NumberInput
        label="Number Owned"
        {...form.getInputProps("owned")}
      />
      <NumberInput
        label="Total Made"
        {...form.getInputProps("totalMade")}
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

export default ArtisanBaseForm;