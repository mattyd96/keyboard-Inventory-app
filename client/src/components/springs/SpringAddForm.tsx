import { Dispatch, SetStateAction } from 'react';
import { useForm } from '@mantine/form';
import { useMutation } from '@apollo/client';

import { FETCH_SPRINGS_QUERY, ADD_SPRING_MUTATION } from "../../util/springGraphql";
import SpringBaseForm from './SpringBaseForm';

type Props = {
  closeForm: Dispatch<SetStateAction<boolean>>;
}

function SpringAddForm( { closeForm }: Props) {

  const form = useForm({
    initialValues: {
      name: '',
      weight: '',
      length: '',
      lube: '',
      amount: 0
    }
  });

  const [addSpring] = useMutation(ADD_SPRING_MUTATION, {
    update(proxy, { data: { addSpring }}) {
      proxy.writeQuery({ query: FETCH_SPRINGS_QUERY, data : {
        getInventory: {id: addSpring.id, springs: [...addSpring.springs]}
      }});
    },
    onError(err) {
      console.log(err);
    },
    variables: form.values,
  });

  const submitSpring = () => {
    console.log(form.values);
    addSpring();
    form.reset();
    closeForm(false);
  }

  return (
    <SpringBaseForm
      form={form}
      setFormVisible={closeForm}
      handleSubmit={submitSpring}
    />
  );
}

export default SpringAddForm;