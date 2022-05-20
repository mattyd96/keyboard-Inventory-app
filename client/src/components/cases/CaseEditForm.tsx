import { Dispatch, SetStateAction } from "react";
import { useForm } from "@mantine/form";
import { useMutation } from "@apollo/client";

import { FETCH_CASES_QUERY, UPDATE_CASE_MUTATION } from "../../util/caseGraphql";
import { Plate } from "../../util/caseTypes";
import InventoryCaseForm from "../forms/InventoryCaseForm";

type CaseProp = {
  _id: string;
  name: string;
  creator: string;
  color: string;
  layout: string;
  caseMaterial: string;
  hasWeight: boolean;
  weightMaterial: string;
  plates: Plate[];
  weight: string;
  weightUnits: string;
  built: boolean;
  delete: React.MouseEventHandler;
  setFormVisibility: Dispatch<SetStateAction<boolean>>
}

function CaseEditForm(item: CaseProp) {

  const plateValues = item.plates.map(plate => plate.type);

  const form = useForm({
    initialValues: {
      name: item.name,
      creator: item.creator,
      color: item.color,
      layout: item.layout,
      caseMaterial: item.caseMaterial,
      weightMaterial: item.weightMaterial,
      hasWeight: item.hasWeight,
      plates: plateValues,
      weight: item.weight,
      weightUnits: item.weightUnits,
      built: item.built
    }
  });

  const [updateCaseMutation] = useMutation(UPDATE_CASE_MUTATION, {
    update(proxy, { data: { updateCase }}) {
      proxy.writeQuery({ query: FETCH_CASES_QUERY, data : {
        getInventory: {id: updateCase.id, cases: [...updateCase.cases]}
      }});
    },
  });

  const updateCase = () => {
    updateCaseMutation({variables: {id: item._id, ...form.values}});
    form.reset();
    item.setFormVisibility(false);
  }

  return (
    <InventoryCaseForm
      form={form}
      setFormVisible={item.setFormVisibility}
      handleSubmit={updateCase}
    />
  );
}

export default CaseEditForm;