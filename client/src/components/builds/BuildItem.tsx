import { useState, Fragment } from "react";
import { Text, Button, Group, Modal, Badge, Stack } from "@mantine/core";

import BuildEditForm from "./BuildEditForm";
import { Case } from "../../util/caseTypes";
import { Switch } from "../../util/switchTypes";
import { Stab } from "../../util/stabTypes";
import { Keycap } from "../../util/keycapTypes";
import BuildCard from "./BuildCard";

type BuildProp = {
  id: string
  name: string
  description: string
  case: Case
  switches: Switch[]
  stabs: Stab[]
  keycaps: Keycap[]
  images: string[]
  delete: React.MouseEventHandler;
}

function BuildItem(item: BuildProp) {
  const [edit, setEdit] = useState(false);

  const display = (
    <BuildCard { ...item } setFormVisibility={setEdit}/>
  );

  const editDisplay = (
    <Modal opened={edit} onClose={() => setEdit(false)} title="Add a Case">
      <BuildEditForm {...item} setFormVisibility={setEdit} />
    </Modal>
  );

  return (
    <Fragment>
      {edit && editDisplay}
      {display}
    </Fragment>
  );
}

export default BuildItem;