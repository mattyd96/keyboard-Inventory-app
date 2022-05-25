import { Dispatch, SetStateAction } from 'react';
import { useForm } from '@mantine/form';
import { useMutation } from '@apollo/client';

import { FETCH_SWITCHES_QUERY, ADD_SWITCH_MUTATION } from "../../util/switchGraphql";
import SwitchBaseForm from './SwitchBaseForm';

type Props = {
  closeForm: Dispatch<SetStateAction<boolean>>;
}

function SwitchAddForm( { closeForm }: Props) {

  const form = useForm({
    initialValues: {
      name: '',
      stock: true,
    }
  });

  const [addSwitch] = useMutation(ADD_SWITCH_MUTATION, {
    update(proxy, { data: { addSwitch }}) {
      proxy.writeQuery({ query: FETCH_SWITCHES_QUERY, data : {
        getInventory: {id: addSwitch.id, switches: [...addSwitch.switches]}
      }});
    },
    onError(err) {
      console.log(err);
    },
    variables: form.values,
  });

  const submitSwitch = () => {
    console.log(form.values);
    addSwitch();
    form.reset();
    closeForm(false);
  }

  return (
    <SwitchBaseForm
      form={form}
      setFormVisible={closeForm}
      handleSubmit={submitSwitch}
    />
  );
}

export default SwitchAddForm;