import { Dispatch, SetStateAction } from 'react';
import { useForm, formList } from '@mantine/form';
import { useMutation } from '@apollo/client';

import { FETCH_KEYCAPS_QUERY, ADD_KEYCAP_MUTATION } from "../../util/keycapGraphql";
import KeycapBaseForm from './KeycapBaseForm';
import { randomId } from '@mantine/hooks';

type Props = {
  closeForm: Dispatch<SetStateAction<boolean>>;
}

function KeycapAddForm( { closeForm }: Props) {

  const form = useForm({
    initialValues: {
      name: '',
      manufacturer: '',
      material: '',
      kits: formList([{ name: '', amount: null, key: randomId() }]),
    }
  });

  const [addKeycap] = useMutation(ADD_KEYCAP_MUTATION, {
    update(proxy, { data: { addKeycap }}) {
      proxy.writeQuery({ query: FETCH_KEYCAPS_QUERY, data : {
        getInventory: {id: addKeycap.id, keycaps: [...addKeycap.keycaps]}
      }});
    },
    onError(err) {
      console.log(err);
    },
    variables: form.values,
  });

  const submitKeycap = () => {
    console.log(form.values);
    addKeycap();
    form.reset();
    closeForm(false);
  }

  return (
    <KeycapBaseForm
      form={form}
      setFormVisible={closeForm}
      handleSubmit={submitKeycap}
    />
  );
}

export default KeycapAddForm;