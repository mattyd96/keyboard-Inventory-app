import { Dispatch, SetStateAction, useContext } from "react";
import { useForm, formList } from "@mantine/form";
import { useMutation } from "@apollo/client";

import { FETCH_USER_BUILDS_QUERY, UPDATE_BUILD_MUTATION } from "../../util/buildGraphql";
import { UserBuildData } from "../../util/buildTypes";
import { Case } from "../../util/caseTypes";
import { Switch } from "../../util/switchTypes";
import { Stab } from "../../util/stabTypes";
import { Keycap } from "../../util/keycapTypes";
import KeycapBaseForm from "./BuildBaseForm";
import { randomId } from "@mantine/hooks";
import { AuthContext } from "../../context/auth";

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
  setFormVisibility: Dispatch<SetStateAction<boolean>>
}

function BuildEditForm(item: BuildProp) {
  const { user } = useContext(AuthContext);

  console.log(item);

  const switches = item.switches.map(swit => {
    return {name: swit.name, amount: 0, id: swit.id};
  });
  console.log(switches);

  const keycaps = item.keycaps.map(keycap => {
    return {set: keycap.name, id: keycap.id};
  });

  const stabs = item.stabs.map(stab => {
    return {name: stab.name, twoU: 0, sixU: 0, six25U: 0, sevenU: 0, id: stab.id}
  });

  const images = item.images.map(image => {
    return {link: image, id: randomId()};
  });

  const form = useForm({
    initialValues: {
      name: item.name,
      description: item.description,
      case: item.case.id,
      switches: formList([...switches]),
      keycaps: formList([...keycaps]),
      stabs: formList([...stabs]),
      images: formList([...images])
    }
  });

  const [updateBuildMutation] = useMutation(UPDATE_BUILD_MUTATION, {
    update(proxy, { data: { updateBuild }}) {
      const data : UserBuildData = proxy.readQuery({query: FETCH_USER_BUILDS_QUERY, variables: {username: user!.username}})!;
      proxy.writeQuery({ query: FETCH_USER_BUILDS_QUERY, data : {
        getUserBuilds: [...data.getUserBuilds.filter(item => item.id != updateBuild.id), updateBuild ]
      }});
    },
  });

  const updateBuild = () => {
    updateBuildMutation({variables: {id: item.id, ...form.values}});
    form.reset();
    item.setFormVisibility(false);
  }

  return (
    <KeycapBaseForm
      form={form}
      setFormVisible={item.setFormVisibility}
      handleSubmit={updateBuild}
    />
  );
}

export default BuildEditForm;