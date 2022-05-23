import { Dispatch, SetStateAction } from 'react';
import { useForm } from '@mantine/form';
import { useMutation } from '@apollo/client';

import { FETCH_STABS_QUERY, ADD_STAB_MUTATION } from "../../util/stabGraphql";
import StabBaseForm from './StabBaseForm';

type Props = {
  closeForm: Dispatch<SetStateAction<boolean>>;
}

function StabAddForm( { closeForm }: Props) {

  const form = useForm({
    initialValues: {
      name: '',
      twoU: 0,
      sixU: 0,
      six25U:0,
      sevenU:0,
      housings: 0,
      stems: 0,
    }
  });

  const [addStab] = useMutation(ADD_STAB_MUTATION, {
    update(proxy, { data: { addStab }}) {
      proxy.writeQuery({ query: FETCH_STABS_QUERY, data : {
        getInventory: {id: addStab.id, ctabs: [...addStab.stabs]}
      }});
    },
    onError(err) {
      console.log(err);
    },
    variables: form.values,
  });

  const submitCase = () => {
    console.log(form.values);
    addStab();
    form.reset();
    closeForm(false);
  }

  return (
    <StabBaseForm
      form={form}
      setFormVisible={closeForm}
      handleSubmit={submitCase}
    />
  );
}

export default StabAddForm;