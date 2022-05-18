import { Dispatch, SetStateAction } from "react";
import { TextInput, Button, Group, Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";
import { gql, useMutation } from "@apollo/client";

import { FETCH_CASES_QUERY } from "../../util/graphql";

type CaseProp = {
  _id: string;
  name: string;
  creator: string;
  color: string;
  layout: string;
  caseMaterial: string;
  weightMaterial: string;
  weight: string;
  weightUnits: string;
  built: boolean;
  delete: React.MouseEventHandler;
  setFormVisibility: Dispatch<SetStateAction<boolean>>
}

function CaseEditForm(item: CaseProp) {
  const form = useForm({
    initialValues: {
      name: item.name,
      creator: item.creator,
      color: item.color,
      layout: item.layout,
      caseMaterial: item.caseMaterial,
      weightMaterial: item.weightMaterial,
      weight: item.weight,
      weightUnits: item.weightUnits,
      built: item.built
    }
  });

  const UPDATE_CASE_MUTATION = gql`
    mutation updateCase(
      $id: ID!
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
      updateCase(
        id: $id
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
        id
        cases {
          _id
          name
          creator
          color
          layout
          caseMaterial
          weightMaterial
          weight
          built
        }
      }
    }
  `;

  const [updateCaseMutation] = useMutation(UPDATE_CASE_MUTATION, {
    update(proxy, { data: { updateCase }}) {
      proxy.writeQuery({ query: FETCH_CASES_QUERY, data : {
        getInventory: {id: updateCase.id, cases: [...updateCase.cases]}
      }});
    },
  });

  const hideForm = () => {
    item.setFormVisibility(false);
  }

  const updateCase = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    updateCaseMutation({variables: {id: item._id, ...form.values}})
  }

  return (
    <form>
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
        <Button onClick={hideForm}>Cancel</Button>
        <Button type="submit" onClick={updateCase}>Submit</Button>
      </Group>
    </form>
  );
}

export default CaseEditForm;