import { Dispatch, SetStateAction, useContext, useState, MouseEventHandler } from "react";
import { useForm, formList } from "@mantine/form";
import { useMutation } from "@apollo/client";
import { ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';

import { FETCH_USER_BUILDS_QUERY, UPDATE_BUILD_MUTATION } from "../../util/buildGraphql";
import { UserBuildData, Build } from "../../util/buildTypes";
import KeycapBaseForm from "./BuildBaseForm";
import { FileWithPath } from 'file-selector';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../../firebase';

import { AuthContext } from "../../context/auth";

interface CustomFile extends FileWithPath {
  preview : string
}

interface BuildProp extends Build {
  delete: MouseEventHandler;
  setFormVisibility: Dispatch<SetStateAction<boolean>>
}

function BuildEditForm(item: BuildProp) {
  const { user } = useContext(AuthContext);
  const [fileList, setFileList] = useState<CustomFile[]>([]); //file list for holding image Files to upload to firebase
  const [isLoading, setIsLoading] = useState<boolean>(false);
  let links: string[] = []; //array to hold links of uploaded files for db

  const switches = item.switches.map(swit => {
    const amount = item.switchAmount.filter(swit2 => swit2.id === swit.id)[0].amount;
    return {name: swit.id, amount, id: swit.id};
  });

  const keycaps = item.keycaps.map(keycap => {
    return {set: keycap.id, id: keycap.id};
  });

  const stabs = item.stabs.map(stab => {
    const selectedStab = item.stabAmount.filter(stab2 => stab2.stabId === stab.id)[0];
    const { twoU, sixU, six25U, sevenU } = selectedStab;
    return {name: stab.id, twoU, sixU, six25U, sevenU, id: stab.id}
  });

  const form = useForm({
    initialValues: {
      name: item.name,
      description: item.description,
      case: item.case.id,
      switches: formList([...switches]),
      keycaps: formList([...keycaps]),
      stabs: formList([...stabs]),
      images: formList([...item.images]),
      removeImages: formList([])
    }
  });

  const [updateBuildMutation] = useMutation(UPDATE_BUILD_MUTATION, {
    update(proxy, { data: { updateBuild }}) {
      const data : UserBuildData = proxy.readQuery({query: FETCH_USER_BUILDS_QUERY, variables: {username: user!.username}})!;
      proxy.writeQuery({ query: FETCH_USER_BUILDS_QUERY, data : {
        getUserBuilds: [...data.getUserBuilds.filter(item => item.id !== updateBuild.id), updateBuild ]
      }});
    },
  });

  // upload images to firebase and populate links array
  const uploadImages = async () => {
    await Promise.all(
      fileList.map(async img => {
        const imgRef = ref(storage, `images/${user!.username}/${uuidv4()}${img.path}`);
        await uploadBytes(imgRef, img);
        const downloadURL = await getDownloadURL(imgRef);
        links.push(downloadURL); 
      })
    )
    console.log(links);
  };

  const deleteImages = async () => {
    await Promise.all(
      form.values.removeImages.map(async img => {
        const imgRef = ref(storage, img);
        await deleteObject(imgRef);
      })
    )
  };

  const updateBuild = async () => {
    setIsLoading(true);
    await uploadImages(); // upload images if there are more
    await deleteImages(); // remove images marked for deletion by user
    const { removeImages, ...input } = form.values;
    const images = [...form.values.images, ...links];
    updateBuildMutation({variables: {id: item.id, ...input, images}});
    form.reset();
    item.setFormVisibility(false);
  }

  return (
    <KeycapBaseForm
      form={form}
      setFormVisible={item.setFormVisibility}
      handleSubmit={updateBuild}
      fileList={fileList}
      setFileList={setFileList}
      isLoading={isLoading}
    />
  );
}

export default BuildEditForm;