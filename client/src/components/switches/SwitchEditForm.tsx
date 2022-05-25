import { Dispatch, SetStateAction } from "react";
import { useForm } from "@mantine/form";
import { useMutation } from "@apollo/client";

import { FETCH_SWITCHES_QUERY, UPDATE_SWITCH_MUTATION } from "../../util/switchGraphql";
import { Spring } from "../../util/springTypes";
import SwitchBaseForm from "./SwitchBaseForm";

type SwitchProp = {
  id: string
  name: string
  stock: boolean
  films: string
  lube: string
  springs: Spring
  top: string
  bottom: string
  totalAmount: number
  availableAmount: number
  delete: React.MouseEventHandler;
  setFormVisibility: Dispatch<SetStateAction<boolean>>
}

function SwitchEditForm(item: SwitchProp) {

  const form = useForm({
    initialValues: {
      name: item.name,
    }
  });

  const [updateSwitchMutation] = useMutation(UPDATE_SWITCH_MUTATION, {
    update(proxy, { data: { updateSwitch }}) {
      proxy.writeQuery({ query: FETCH_SWITCHES_QUERY, data : {
        getInventory: {id: updateSwitch.id, switches: [...updateSwitch.switches]}
      }});
    },
  });

  const updateSwitch = () => {
    updateSwitchMutation({variables: {id: item.id, ...form.values}});
    form.reset();
    item.setFormVisibility(false);
  }

  return (
    <SwitchBaseForm
      form={form}
      setFormVisible={item.setFormVisibility}
      handleSubmit={updateSwitch}
    />
  );
}

export default SwitchEditForm;