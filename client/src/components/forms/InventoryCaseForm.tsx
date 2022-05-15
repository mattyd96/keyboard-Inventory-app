import { Box, TextInput, Button, Group, Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';
import { gql, useMutation } from '@apollo/client';

const ADD_CASE = gql`
  mutation addCase(
    $creator: String
    $color: String
    $layout: String
    $caseMaterial: String
    $weightMaterial: String
    $weight: String
    $weightUnits: String
    $built: Boolean
  ) {
    addCase(
      creator: $creator
      color: $color
      layout: $layout
      caseMaterial: $caseMaterial
      weightMaterial: $weightMaterial
      weight: $weight
      weightUnits: $weightUnits
      built: $built:
    ) {
      creator 
      color 
      layout 
      caseMaterial 
      weightMaterial 
      weight 
      weightUnits 
      built
    }
  }
`

function InventoryCaseForm() {
  const form = useForm({
    initialValues: {
      creator: '',
      color: '',
      layout: '',
      caseMaterial: '',
      weightMaterial: '',
      weight: '',
      weightUnits: '',
      built: false
    }
  });

  const [addCase] = useMutation(ADD_CASE, {
    update(_, { data: { addCase: cases }}) {
      //get data and add to page
      console.log(cases);
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.errors);
    },
    variables: form.values,
  });

  return (
    <Box>
      <form onSubmit={form.onSubmit(() => addCase())}>
        <TextInput
          required
          label="Creator"
          placeholder="TGR"
          {...form.getInputProps('creator')}
        />
        <TextInput
          required
          label="Color"
          placeholder="Silver"
          {...form.getInputProps('color')}
        />
        <TextInput
          required
          label="Layout"
          placeholder="TKL"
          {...form.getInputProps('layout')}
        />
        <TextInput
          required
          label="Case Material"
          placeholder="Aluminium"
          {...form.getInputProps('caseMaterial')}
        />
        <TextInput
          required
          label="Weight Material"
          placeholder="Brass"
          {...form.getInputProps('weightMaterial')}
        />
        <Group>
          <TextInput
            required
            label="Weight"
            {...form.getInputProps('weight')}
          />
          <TextInput
            required
            label="Units"
            {...form.getInputProps('weightUnits')}
          />
        </Group>

        <Checkbox
          mt="md"
          label="Has this case been built?"
          {...form.getInputProps('built', { type: 'checkbox' })}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default InventoryCaseForm;