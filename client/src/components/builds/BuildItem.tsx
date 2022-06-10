import { useState, Fragment } from "react";
import { Modal } from "@mantine/core";

import BuildEditForm from "./BuildEditForm";
import { Case } from "../../util/caseTypes";
import { Switch } from "../../util/switchTypes";
import { Stab } from "../../util/stabTypes";
import { Keycap } from "../../util/keycapTypes";
import { StabAmount, SwitchAmount } from "../../util/buildTypes";
import BuildCard from "./BuildCard";

type BuildProp = {
  id: string
  name: string
  description: string
  case: Case
  switches: Switch[]
  switchAmount: SwitchAmount[]
  stabs: Stab[]
  stabAmount: StabAmount[]
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
    <Modal opened={edit} onClose={() => setEdit(false)} title="Edit Build">
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