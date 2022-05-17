import { Dispatch, SetStateAction } from 'react';
import { Box, TextInput, Button, Group, Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';
import { gql, useMutation } from '@apollo/client';

import { FETCH_CASES } from "../../util/graphql";
import { useContext } from 'react';
import { AuthContext } from '../../context/auth';

const ADD_CASE = gql`
  mutation addCase(
    $name: String
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
      caseinput: {
        name: $name
        creator: $creator
        color: $color
        layout: $layout
        caseMaterial: $caseMaterial
        weightMaterial: $weightMaterial
        weight: $weight
        weightUnits: $weightUnits
        built: $built
      }
    ) {
      cases {
        _id
        name
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
  }
`

type Props = {
  closeForm: Dispatch<SetStateAction<boolean>>;
}

type Case = {
  name: string;
  creator: string;
}

type CaseData = {
  getCases: Case[];
}

function InventoryCaseForm( { closeForm }: Props) {
  const { user } = useContext(AuthContext);

  const form = useForm({
    initialValues: {
      name: '',
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
    update(proxy, { data: { addCase }}) {
        proxy.writeQuery({ query: FETCH_CASES, data : {
          getCases: [...addCase.cases]
        }, variables: {username: user?.username} });
    },
    onError(err) {
      console.log(err);
    },
    variables: form.values,
  });

  return (
    <Box>
      <form onSubmit={form.onSubmit((values) => {console.log(values); addCase();})}>
        <TextInput
          required
          label="Name"
          placeholder="Jane CE V2"
          {...form.getInputProps('name')}
        />
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
          <Button type="button" onClick={() => {closeForm(false)}}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default InventoryCaseForm;