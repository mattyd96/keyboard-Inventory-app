import { Dispatch, SetStateAction } from "react";
import { useForm } from "@mantine/form";
import { useMutation } from "@apollo/client";

import { FETCH_ARTISANS_QUERY, UPDATE_ARTISAN_MUTATION } from "../../util/artisanGraphql";
import ArtisanBaseForm from "./ArtisanBaseForm";

type ArtisanProp = {
  id: string
  name: string
  maker: string
  sculpt: string
  colorway: string
  totalMade: number
  owned: number
  delete: React.MouseEventHandler;
  setFormVisibility: Dispatch<SetStateAction<boolean>>
}

function ArtisanEditForm(item: ArtisanProp) {

  const form = useForm({
    initialValues: {
      name: item.name,
      maker: item.maker,
      sculpt: item.sculpt,
      colorway: item.colorway,
      totalMade: item.totalMade,
      owned: item.owned
    }
  });

  const [updateArtisanMutation] = useMutation(UPDATE_ARTISAN_MUTATION, {
    update(proxy, { data: { updateArtisan }}) {
      proxy.writeQuery({ query: FETCH_ARTISANS_QUERY, data : {
        getInventory: {id: updateArtisan.id, artisans: [...updateArtisan.artisans]}
      }});
    },
  });

  const updateArtisan = () => {
    updateArtisanMutation({variables: {id: item.id, ...form.values}});
    form.reset();
    item.setFormVisibility(false);
  }

  return (
    <ArtisanBaseForm
      form={form}
      setFormVisible={item.setFormVisibility}
      handleSubmit={updateArtisan}
    />
  );
}

export default ArtisanEditForm;