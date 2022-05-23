import { Dispatch, SetStateAction } from "react";
import { useForm } from "@mantine/form";
import { useMutation } from "@apollo/client";

import { FETCH_SPRINGS_QUERY, UPDATE_SPRING_MUTATION } from "../../util/springGraphql";
import SpringBaseForm from "./SpringBaseForm";

type SpringProp = {
  id: string;
  name: string;
  weight: string;
  length: string;
  lube: string;
  amount: Number;
  delete: React.MouseEventHandler;
  setFormVisibility: Dispatch<SetStateAction<boolean>>
}

function SpringEditForm(item: SpringProp) {

  const form = useForm({
    initialValues: {
      name: item.name,
      weight: item.weight,
      length: item.length,
      lube: item.lube,
      amount: item.amount
    }
  });

  const [updateSpringMutation] = useMutation(UPDATE_SPRING_MUTATION, {
    update(proxy, { data: { updateSpring }}) {
      proxy.writeQuery({ query: FETCH_SPRINGS_QUERY, data : {
        getInventory: {id: updateSpring.id, springs: [...updateSpring.springs]}
      }});
    },
  });

  const updateSpring = () => {
    updateSpringMutation({variables: {id: item.id, ...form.values}});
    form.reset();
    item.setFormVisibility(false);
  }

  return (
    <SpringBaseForm
      form={form}
      setFormVisible={item.setFormVisibility}
      handleSubmit={updateSpring}
    />
  );
}

export default SpringEditForm;