import { Dispatch, Fragment, SetStateAction } from 'react';
import { Box, TextInput, Button, Group, Select, NumberInput, ActionIcon, Text, Textarea, Stack, Indicator, Image } from '@mantine/core';
import { Trash } from 'tabler-icons-react';
import { randomId } from '@mantine/hooks';
import { useQuery } from '@apollo/client';
import { FileWithPath } from 'file-selector';
import { X } from 'tabler-icons-react';

import { FETCH_INVENTORY_FOR_BUILDS_QUERY } from "../../util/inventoryGraphql";
import { Case } from "../../util/caseTypes";
import { Switch as SwitchType } from "../../util/switchTypes";
import { Keycap } from "../../util/keycapTypes";
import { Stab } from "../../util/stabTypes";
import ImageDrop from './ImageDrop';


type SwitchFieldType = {
  name: string
  amount: number
  id: string
}

type KeycapFieldType = {
  set: string
  id: string
}

type StabFieldType = {
  name: string
  twoU: number
  sixU: number
  six25U: number
  sevenU: number
  id: string
}

// type ImageFieldType = {
//   id: string
//   link: string
// }

type SwitchData = {
  label: string
  value: string
  amount: number
}

type KeycapData = {
  label: string
  value: string
}

type StabData = {
  label: string
  value: string
}

interface CustomFile extends FileWithPath {
  preview : string
}

type Props = {
  setFormVisible: Dispatch<SetStateAction<boolean>>;
  handleSubmit: Function
  form: any // TODO create a type for the form object
  fileList: any[]
  setFileList: Dispatch<SetStateAction<CustomFile[]>>
}



function CaseBaseForm( { setFormVisible, handleSubmit, form, fileList, setFileList }: Props) {
  const { data } = useQuery(FETCH_INVENTORY_FOR_BUILDS_QUERY);

  let CASE_DATA: Case[] = [];
  let SWITCH_DATA: SwitchData[] = [];
  let KEYCAP_DATA: KeycapData[] = [];
  let STAB_DATA: StabData[] = [];
  let switchFields = [];
  let keycapFields = [];
  let stabFields = [];

  if(data) {
    CASE_DATA = data.getInventory.cases.map((item: Case) => {return {label: item.name, value: item.id}});
    SWITCH_DATA = data.getInventory.switches.map((item: SwitchType) => {return {label: item.name, value: item.id, amount: item.availableAmount}});
    KEYCAP_DATA = data.getInventory.keycaps.map((item: Keycap) => {return {label: item.name, value: item.id}});
    STAB_DATA = data.getInventory.stabs.map((item: Stab) => {return {label: item.name, value: item.id}});

    switchFields = form.values.switches.map((item : SwitchFieldType, index: number) => (
      <Group key={item.id} mt="xs">
        <Select
          data={SWITCH_DATA}
          maxDropdownHeight={125}
          placeholder="Select Switch"
          searchable
          required
          sx={{ flex: 2 }}
          {...form.getListInputProps('switches', index, 'name')}
          
        />
        <NumberInput
          placeholder="Number Held"
          sx={{ flex: 1 }}
          {...form.getListInputProps('switches', index, 'amount')}
        />
        <ActionIcon
          color="red"
          variant="hover"
          onClick={() => form.removeListItem('switches', index)}
        >
          <Trash size={16} />
        </ActionIcon>
      </Group>
    ));

    keycapFields = form.values.keycaps.map((item: KeycapFieldType, index: number) => (
      <Group key={item.id} mt="xs">
        <Select
          sx={{ flex: 1 }}
          data={KEYCAP_DATA}
          maxDropdownHeight={125}
          placeholder="Select Switch"
          searchable
          required
          {...form.getListInputProps('keycaps', index, 'set')}
        />
        <ActionIcon
          color="red"
          variant="hover"
          onClick={() => form.removeListItem('keycaps', index)}
        >
          <Trash size={16} />
        </ActionIcon>
      </Group>
    ));

    stabFields = form.values.stabs.map((item: StabFieldType, index: number) => (
      <Stack key={item.id} mt="xs">
        <Group>
          <Select
            sx={{ flex: 1 }}
            data={STAB_DATA}
            maxDropdownHeight={125}
            placeholder="Select Stab"
            searchable
            required
            {...form.getListInputProps('stabs', index, 'name')}
          />
          <ActionIcon
            color="red"
            variant="hover"
            onClick={() => form.removeListItem('stabs', index)}
          >
            <Trash size={16} />
          </ActionIcon>
        </Group>
        <Group grow>
          <NumberInput
            label="2U"
            placeholder="0"
            sx={{ flex: 1 }}
            {...form.getListInputProps('stabs', index, 'twoU')}
          />
          <NumberInput
            label="6U"
            placeholder="0"
            sx={{ flex: 1 }}
            {...form.getListInputProps('stabs', index, 'sixU')}
          />
        </Group>
        <Group grow>
          <NumberInput
            label="6.25U"
            placeholder="0"
            sx={{ flex: 1 }}
            {...form.getListInputProps('stabs', index, 'six25U')}
          />
          <NumberInput
            label="7U"
            placeholder="0"
            sx={{ flex: 1 }}
            {...form.getListInputProps('stabs', index, 'sevenU')}
          />
        </Group>
      </Stack>
    ));
  }

  // const imageFields = form.values.images.map((item : ImageFieldType, index: number) => (
  //   <Group key={item.id} mt="xs">
  //     <TextInput
  //       placeholder="Image Link"
  //       sx={{ flex: 1 }}
  //       {...form.getListInputProps('images', index, 'link')}
  //     />
  //     <ActionIcon
  //       color="red"
  //       variant="hover"
  //       onClick={() => form.removeListItem('images', index)}
  //     >
  //       <Trash size={16} />
  //     </ActionIcon>
  //   </Group>
  // ));

  const removeUploadedImage = (file: string) => {
    const index = form.values.images.findIndex((img: string) => img === file);
    form.removeListItem('images', index);
    form.addListItem('removeImages', file);
  };

  if(form.values.removeImages) {console.log('removeImages', form.values.removeImages);}
  console.log('images', form.values.images);

  return (
    <Box
      component="form"
      onSubmit={form.onSubmit(handleSubmit)}
      //onSubmit={(event : any) => {event.preventDefault(); console.log(form.values)}}
      sx={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
    >
      <TextInput
        required
        label="Name"
        placeholder="My First Board"
        {...form.getInputProps("name")}
      />
      <Textarea
        label="Description"
        placeholder="GMK"
        {...form.getInputProps("description")}
      />
      <Select
        label="Case"
        data={CASE_DATA}
        maxDropdownHeight={125}
        placeholder="Select Case"
        searchable
        required
        {...form.getInputProps("case")}
      />

      <Box mx="auto">
        {switchFields.length > 0 ? (
          <Fragment>
            <Text size="sm">Switches</Text>
            <Text size="xs">Add Switches and the amount you used</Text>
          </Fragment>
        ) : (
          <Text color="dimmed" align="center">
            No Switches added yet
          </Text>
        )}

        {switchFields}

        <Group position="center" mt="md">
          <Button
            onClick={() =>
              form.addListItem('switches', { name: '', amount: 0, id: randomId() })
            }
          >
            Add Switch
          </Button>
        </Group>
      </Box>
      <Box>
        {keycapFields.length > 0 ? (
          <Fragment>
            <Text size="sm">Keycaps</Text>
            <Text size="xs">Add Keycaps you used</Text>
          </Fragment>
        ) : (
          <Text color="dimmed" align="center">
            No Keycaps added yet
          </Text>
        )}

        {keycapFields}

        <Group position="center" mt="md">
          <Button
            onClick={() =>
              form.addListItem('keycaps', { set: '', kit: '', id: randomId() })
            }
          >
            Add Keycaps
          </Button>
        </Group>
      </Box>
      <Box>
        {stabFields.length > 0 ? (
          <Fragment>
            <Text size="sm">Stabs</Text>
            <Text size="xs">Add Stabs you used</Text>
          </Fragment>
        ) : (
          <Text color="dimmed" align="center">
            No Stabs added yet
          </Text>
        )}

        {stabFields}

        <Group position="center" mt="md">
          <Button
            onClick={() =>
              form.addListItem('stabs', {name: '', twoU: 0, sixU: 0, six25U: 0, sevenU: 0, id: randomId()})
            }
          >
            Add Stabs
          </Button>
        </Group>
      </Box>
      {/* <Box>
        {imageFields.length > 0 ? (
          <Fragment>
            <Text size="sm">Images</Text>
            <Text size="xs">Link your images here, make sure they are hosted online (imgur etc.)</Text>
          </Fragment>
        ) : (
          <Text color="dimmed" align="center">
            No images added yet
          </Text>
        )}

        {imageFields}

        <Group position="center" mt="md">
          <Button
            onClick={() =>
              form.addListItem('images', { link: '', id: randomId() })
            }
          >
            Add Image
          </Button>
        </Group>
      </Box> */}
      <Text size="sm">Images</Text>
      {form.values.removeImages && 
        <Fragment>
          <Text size="sm">Uploaded Images</Text>
          <Group>
            {form.values.images && form.values.images.map((file: string) => 
              <Indicator
                inline
                label={<X size={10}/>}
                size={16}
                zIndex={100}
                onClick={(e) => {
                  e.stopPropagation();
                  removeUploadedImage(file);
                }}
                key={file}
              >
                <Image src={file} alt={file} sx={{maxWidth: '6rem'}} />
              </Indicator>
            )}
          </Group>
        </Fragment>
      }
      <ImageDrop form={form} fileList={fileList} setFileList={setFileList} />

      <Group position="right" mt="md">
        <Button
          type="button"
          onClick={() => {
            setFormVisible(false);
          }}
        >
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </Group>
    </Box>
  );
}

export default CaseBaseForm;