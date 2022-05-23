import { Dispatch, SetStateAction } from 'react';
import { useForm } from '@mantine/form';
import { useMutation } from '@apollo/client';

import { FETCH_ARTISANS_QUERY, ADD_ARTISAN_MUTATION } from "../../util/artisanGraphql";
import ArtisanBaseForm from './ArtisanBaseForm';

type Props = {
  closeForm: Dispatch<SetStateAction<boolean>>;
}

function ArtisanAddForm( { closeForm }: Props) {

  const form = useForm({
    initialValues: {
      name: '',
      maker: '',
      sculpt: '',
      colorway: '',
      owned: '',
      totalMade: ''
    }
  });

  const [addArtisan] = useMutation(ADD_ARTISAN_MUTATION, {
    update(proxy, { data: { addArtisan }}) {
      proxy.writeQuery({ query: FETCH_ARTISANS_QUERY, data : {
        getInventory: {id: addArtisan.id, artisans: [...addArtisan.artisans]}
      }});
    },
    onError(err) {
      console.log(err);
    },
    variables: form.values,
  });

  const submitArtisan = () => {
    console.log(form.values);
    addArtisan();
    form.reset();
    closeForm(false);
  }

  return (
    <ArtisanBaseForm
      form={form}
      setFormVisible={closeForm}
      handleSubmit={submitArtisan}
    />
  );
}

export default ArtisanAddForm;