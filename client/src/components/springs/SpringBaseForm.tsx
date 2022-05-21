import { Dispatch, SetStateAction } from 'react';
import { Box, TextInput, Button, Group, Checkbox } from '@mantine/core';


type Props = {
  setFormVisible: Dispatch<SetStateAction<boolean>>;
  handleSubmit: Function
  form: any // TODO create a type for the form object
}

function SpringBaseForm( { setFormVisible, handleSubmit, form }: Props) {

  return (
    <Box
      component="form"
      onSubmit={form.onSubmit(handleSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
    >
      <TextInput
        required
        label="Name"
        placeholder="Sprit Slow Extreme"
        {...form.getInputProps("name")}
      />
      <TextInput
        required
        label="Weight"
        placeholder="63.5"
        {...form.getInputProps("weight")}
      />
      <TextInput
        label="Length"
        placeholder="17.5 cm"
        {...form.getInputProps("length")}
      />
      {/* <Checkbox
        mt="md"
        mb="sm"
        label="Have These been lubed?"
        {...form.getInputProps("lubed", { type: "checkbox" })}
      /> */}
      <TextInput
        label="Lube"
        placeholder="If not lubed, leave blank"
        {...form.getInputProps("lube")}
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

export default SpringBaseForm;