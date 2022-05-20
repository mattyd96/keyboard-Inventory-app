import { useState } from "react";
import { Text, Button, Group, TextInput } from "@mantine/core";

import CaseEditForm from "./CaseEditForm";

type Plate = {
  type: string;
  used: boolean;
}

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
}

function CaseItem(item: CaseProp) {
  const [edit, setEdit] = useState(false);

  const showEdit = () => {
    setEdit(true);
  };

  const hideEdit = () => {
    setEdit(false);
  };

  const display = (
    <Group>
      <Text>{item.color}</Text>
      <Button onClick={showEdit}>Edit</Button>
      <Button onClick={item.delete} value={item._id}>Delete</Button>
    </Group>
  );

  const editForm = (
    <form>
      <TextInput label="hi"/>
      <Button onClick={hideEdit}>Cancel</Button>
      <Button>Submit</Button>
    </form>
  );

  return edit ? <CaseEditForm {...item} setFormVisibility={setEdit} /> : display;
}

export default CaseItem;