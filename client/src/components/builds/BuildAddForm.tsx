import { Dispatch, SetStateAction, useContext } from 'react';
import { useForm, formList } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { useMutation } from '@apollo/client';

import { FETCH_USER_BUILDS_QUERY, ADD_BUILD_MUTATION } from "../../util/buildGraphql";
import { Build, UserBuildData } from "../../util/buildTypes";
import BuildBaseForm from './BuildBaseForm';
import { AuthContext } from '../../context/auth';

type Props = {
  closeForm: Dispatch<SetStateAction<boolean>>;
}

function KeycapAddForm( { closeForm }: Props) {
  const { user } = useContext(AuthContext);

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      case: '',
      switches: formList([{name: '', amount: 0, id: randomId()}]),
      keycaps: formList([{set: '', id: randomId()}]),
      stabs: formList([{name: '', twoU: 0, sixU: 0, six25U: 0, sevenU: 0, id: randomId()}]),
      images: formList([{ link: '', id: randomId() }]),
    }
  });

  const [addBuild] = useMutation(ADD_BUILD_MUTATION, {
    update(proxy, { data: { addBuild }}) {
      const data : UserBuildData = proxy.readQuery({query: FETCH_USER_BUILDS_QUERY, variables: {username: user!.username}})!;
      proxy.writeQuery({ query: FETCH_USER_BUILDS_QUERY, data : {
        getUserBuilds: [...data.getUserBuilds, addBuild]
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