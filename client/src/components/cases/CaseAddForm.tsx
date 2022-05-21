import { Dispatch, SetStateAction } from 'react';
import { useForm } from '@mantine/form';
import { useMutation } from '@apollo/client';

import { FETCH_CASES_QUERY, ADD_CASE_MUTATION } from "../../util/caseGraphql";
import CaseBaseForm from './CaseBaseForm';

type Props = {
  closeForm: Dispatch<SetStateAction<boolean>>;
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

  const [addCase] = useMutation(ADD_CASE_MUTATION, {
    update(proxy, { data: { addCase }}) {
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
    <CaseBaseForm
      form={form}
      setFormVisible={closeForm}
      handleSubmit={submitCase}
    />
  );
}

export default CaseAddForm;