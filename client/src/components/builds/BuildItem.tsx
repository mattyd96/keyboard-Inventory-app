import { useState, Fragment } from "react";
import { Modal } from "@mantine/core";

import BuildEditForm from "./BuildEditForm";
import { Build } from "../../util/buildTypes";
import BuildCard from "./BuildCard";

interface BuildProp extends Build {
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