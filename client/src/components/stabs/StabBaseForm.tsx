import { Dispatch, SetStateAction } from 'react';
import { Box, TextInput, Button, Group, NumberInput } from '@mantine/core';

type Props = {
  setFormVisible: Dispatch<SetStateAction<boolean>>;
  handleSubmit: Function
  form: any // TODO create a type for the form object
}

function StabBaseForm( { setFormVisible, handleSubmit, form }: Props) {

  return (
    <Box
      component="form"
      onSubmit={form.onSubmit(handleSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
    >
      <TextInput
        required
        label="Name"
        placeholder="Durock V2"
        {...form.getInputProps("name")}
      />
      <NumberInput
        required
        label="2u Wire amount"
        {...form.getInputProps("twoU")}
      />
      <NumberInput
        required
        label="6u Wire amount"
        {...form.getInputProps("sixU")}
      />
      <NumberInput
        required
        label="6.25u Wire amount"
        {...form.getInputProps("six25U")}
      />
      <NumberInput
        required
        label="7u Wire amount"
        {...form.getInputProps("sevenU")}
      />
      <NumberInput
        required
        label="Number of Housings"
        {...form.getInputProps("housings")}
      />
      <NumberInput
        required
        label="Number of Stems"
        {...form.getInputProps("stems")}
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

export default StabBaseForm;