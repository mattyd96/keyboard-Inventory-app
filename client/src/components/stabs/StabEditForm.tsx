import { Dispatch, SetStateAction } from "react";
import { useForm } from "@mantine/form";
import { useMutation } from "@apollo/client";

import { FETCH_STABS_QUERY, UPDATE_STAB_MUTATION } from "../../util/stabGraphql";
import { Wire } from "../../util/stabTypes";
import StabBaseForm from "./StabBaseForm";

type StabProp = {
  id: string
  name: string
  wires: Wire
  housings: number
  stems: number
  delete: React.MouseEventHandler;
  setFormVisibility: Dispatch<SetStateAction<boolean>>
}

function StabEditForm(item: StabProp) {

  const form = useForm({
    initialValues: {
      name: item.name,
      twoU: item.wires.twoU,
      sixU: item.wires.sixU,
      six25U:item.wires.six25U,
      sevenU:item.wires.sevenU,
      housings: item.housings,
      stems: item.stems,
    }
  });

  const [updateStabMutation] = useMutation(UPDATE_STAB_MUTATION, {
    update(proxy, { data: { updateStab }}) {
      proxy.writeQuery({ query: FETCH_STABS_QUERY, data : {
        getInventory: {id: updateStab.id, stabs: [...updateStab.stabs]}
      }});
    },
  });

  const updateStab = () => {
    updateStabMutation({variables: {id: item.id, ...form.values}});
    form.reset();
    item.setFormVisibility(false);
  }

  return (
    <StabBaseForm
      form={form}
      setFormVisible={item.setFormVisibility}
      handleSubmit={updateStab}
    />
  );
}

export default StabEditForm;