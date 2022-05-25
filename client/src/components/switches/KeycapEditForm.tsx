import { Dispatch, SetStateAction } from "react";
import { useForm, formList } from "@mantine/form";
import { useMutation } from "@apollo/client";

import { FETCH_KEYCAPS_QUERY, UPDATE_KEYCAP_MUTATION } from "../../util/keycapGraphql";
import { Kit } from "../../util/keycapTypes";
import KeycapBaseForm from "./KeycapBaseForm";

type KeycapProp = {
  id: string
  name: string
  manufacturer: string
  material: string
  kits: Kit[]
  delete: React.MouseEventHandler;
  setFormVisibility: Dispatch<SetStateAction<boolean>>
}

function CaseEditForm(item: KeycapProp) {

  // strip __typename from kits so it does not cause errors => can apollo fix this please
  const kits = item.kits.map(kit => {
    return {id: kit.id, name: kit.name, amount: kit.amount}
  });

  const form = useForm({
    initialValues: {
      name: item.name,
      manufacturer: item.manufacturer,
      material: item.material,
      kits: formList([...kits]),
    }
  });

  const [updateKeycapMutation] = useMutation(UPDATE_KEYCAP_MUTATION, {
    update(proxy, { data: { updateKeycap }}) {
      proxy.writeQuery({ query: FETCH_KEYCAPS_QUERY, data : {
        getInventory: {id: updateKeycap.id, keycaps: [...updateKeycap.keycaps]}
      }});
    },
  });

  const updateKeycap = () => {
    updateKeycapMutation({variables: {id: item.id, ...form.values}});
    form.reset();
    item.setFormVisibility(false);
  }

  return (
    <KeycapBaseForm
      form={form}
      setFormVisible={item.setFormVisibility}
      handleSubmit={updateKeycap}
    />
  );
}

export default CaseEditForm;