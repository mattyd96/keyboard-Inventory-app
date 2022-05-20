import { Dispatch, SetStateAction } from 'react';
import { useForm } from '@mantine/form';
import { gql, useMutation } from '@apollo/client';

import { FETCH_CASES_QUERY } from "../../util/graphql";
import InventoryCaseForm from '../forms/InventoryCaseForm';

const ADD_CASE = gql`
  mutation addCase(
    $name: String
    $creator: String
    $color: String
    $layout: String
    $caseMaterial: String
    $hasWeight: Boolean
    $weightMaterial: String
    $plates: [String]
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
        hasWeight: $hasWeight
        weightMaterial: $weightMaterial
        plates: $plates
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
        hasWeight 
        weightMaterial
        plates {
          _id
          type
          used
        }
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

type Plate = {
  type: string;
  used: boolean;
}

type Case = {
  _id: string;
  name: string;
  creator: string;
  color: string;
  layout: string;
  caseMaterial: string;
  hasWeight: boolean;
  weightMaterial: string;
  plates: Plate[];
  weight: string;
  weightUnits: string;
  built: boolean;
}

type Data = {
  getInventory: {
    cases: Case[]
  }
}

function CaseAddForm( { closeForm }: Props) {

  const form = useForm({
    initialValues: {
      name: '',
      creator: '',
      color: '',
      layout: '',
      caseMaterial: '',
      hasWeight: false,
      weightMaterial: '',
      plates: [],
      weight: '',
      weightUnits: '',
      built: false
    }
  });

  const [addCase] = useMutation(ADD_CASE, {
    update(proxy, { data: { addCase }}) {
      const newData: Data | null = proxy.readQuery({
        query: FETCH_CASES_QUERY
      });

      proxy.writeQuery({ query: FETCH_CASES_QUERY, data : {
        getInventory: {id: addCase.id, cases: [...addCase.cases]}
      }});
    },
    onError(err) {
      console.log(err);
    },
    variables: form.values,
  });

  const submitCase = () => {
    console.log(form.values);
    addCase();
    form.reset();
    closeForm(false);
  }

  return (
    <InventoryCaseForm
      form={form}
      setFormVisible={closeForm}
      handleSubmit={submitCase}
    />
  );
}

export default CaseAddForm;