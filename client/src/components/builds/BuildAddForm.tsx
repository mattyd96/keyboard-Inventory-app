import { Dispatch, SetStateAction } from 'react';
import { useForm, formList } from '@mantine/form';
import { useMutation } from '@apollo/client';

import { FETCH_USER_BUILDS_QUERY, ADD_BUILD_MUTATION } from "../../util/buildGraphql";
import BuildBaseForm from './BuildBaseForm';

type Props = {
  closeForm: Dispatch<SetStateAction<boolean>>;
}

function KeycapAddForm( { closeForm }: Props) {

  const form = useForm({
    initialValues: {
      name: '',
      manufacturer: '',
      material: '',
      kits: '',
    }
  });

  const [addBuild] = useMutation(ADD_BUILD_MUTATION, {
    update(proxy, { data: { addBuild }}) {
      proxy.writeQuery({ query: FETCH_USER_BUILDS_QUERY, data : {
        getUserBuilds: {id: addBuild.id, builds: [...addBuild.builds]}
      }});
    },
    onError(err) {
      console.log(err);
    },
    variables: form.values,
  });

  const submitBuild = () => {
    console.log(form.values);
    addBuild();
    form.reset();
    closeForm(false);
  }

  return (
    <BuildBaseForm
      form={form}
      setFormVisible={closeForm}
      handleSubmit={submitBuild}
    />
  );
}

export default KeycapAddForm;