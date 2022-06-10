import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { useForm, formList } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { useMutation } from '@apollo/client';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { FileWithPath } from 'file-selector';

import { FETCH_USER_BUILDS_QUERY, ADD_BUILD_MUTATION } from "../../util/buildGraphql";
import { UserBuildData } from "../../util/buildTypes";
import BuildBaseForm from './BuildBaseForm';
import { AuthContext } from '../../context/auth';
import { storage } from '../../firebase';

interface CustomFile extends FileWithPath {
  preview : string
}

type Props = {
  closeForm: Dispatch<SetStateAction<boolean>>;
}

function KeycapAddForm( { closeForm }: Props) {
  const { user } = useContext(AuthContext); //user info
  const [fileList, setFileList] = useState<CustomFile[]>([]); //file list for holding image Files to upload to firebase
  let links: string[] = []; //array to hold links of uploaded files for db

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      case: '',
      switches: formList([{name: '', amount: 0, id: randomId()}]),
      keycaps: formList([{set: '', id: randomId()}]),
      stabs: formList([{name: '', twoU: 0, sixU: 0, six25U: 0, sevenU: 0, id: randomId()}]),
    }
  });

  // add build information mutation
  const [addBuild] = useMutation(ADD_BUILD_MUTATION, {
    update(proxy, { data: { addBuild }}) {
      const data : UserBuildData = proxy.readQuery({query: FETCH_USER_BUILDS_QUERY, variables: {username: user!.username}})!;
      proxy.writeQuery({ query: FETCH_USER_BUILDS_QUERY, data : {
        getUserBuilds: [...data.getUserBuilds, addBuild]
      }});
    },
    onError(err) {
      console.log(err);
    }
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

  // submit build data to db
  const submitBuild = async () => {
    await uploadImages(); // upload images
    addBuild({ variables: {...form.values, images: links} }); // add build
    form.reset(); // reset form
    closeForm(false); // close the form
  }

  return (
    <BuildBaseForm
      form={form}
      setFormVisible={closeForm}
      handleSubmit={submitBuild}
      fileList={fileList}
      setFileList={setFileList}
    />
  );
}

export default KeycapAddForm;