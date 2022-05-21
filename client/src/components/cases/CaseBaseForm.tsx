import { Dispatch, SetStateAction, useState } from 'react';
import { Box, TextInput, Button, Group, Checkbox, Select, MultiSelect } from '@mantine/core';

const PLATE_DATA = [
  "Alu Full",
  "Alu Half",
  "Brass Full",
  "Brass Half",
  "SS Full",
  "SS Half",
  "CF Full",
  "CF Half",
  "FR4 Full",
  "FR4 Half",
  "PC Full",
  "PC Half",
  "PP Full",
  "PP Half",
  "POM Full",
  "POM Half",
];

const LAYOUT_DATA = [
  "TKL",
  "TKL WKL",
  "60",
  "60 WKL",
  "60 HHKB",
  "65",
  "65 WKL",
  "65 HHKB",
  "75",
  "75 WKL",
  "Fullsize"
];

const CASE_MATERIAL_DATA = [
  "Aluminium",
  "Brass",
  "Polycarbonate",
  "Acrylic"
]; 

const WEIGHT_MATERIAL_DATA = [
  "Aluminium",
  "Brass",
  "Stainless Steel",
  "Polycarbonate",
  "Acrylic"
]; 

const WEIGHT_UNITS = [
  "kg",
  "grams",
  "lbs",
  "ounces"
];

type Props = {
  setFormVisible: Dispatch<SetStateAction<boolean>>;
  handleSubmit: Function
  form: any // TODO create a type for the form object
}

function CaseBaseForm( { setFormVisible, handleSubmit, form }: Props) {
  const [plateData, setPlateData] = useState(PLATE_DATA);
  const [layoutData, setLayoutData] = useState(LAYOUT_DATA);
  const [caseData, setCaseData] = useState(CASE_MATERIAL_DATA);
  const [weightData, setWeightData] = useState(WEIGHT_MATERIAL_DATA);

  return (
    <Box
      component="form"
      onSubmit={form.onSubmit(handleSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
    >
      <TextInput
        required
        label="Name"
        placeholder="Jane CE V2"
        {...form.getInputProps("name")}
      />
      <TextInput
        required
        label="Creator"
        placeholder="TGR"
        {...form.getInputProps("creator")}
      />
      <TextInput
        required
        label="Color"
        placeholder="Silver"
        {...form.getInputProps("color")}
      />
      <Select
        required
        label="Layout"
        data={layoutData}
        maxDropdownHeight={165}
        placeholder="Select Layout"
        nothingFound="Nothing found"
        searchable
        creatable
        getCreateLabel={(query) => `+ Create ${query}`}
        onCreate={(query) => setLayoutData((current) => [...current, query])}
        {...form.getInputProps("layout")}
      />
      <Select
        label="Case Material"
        placeholder="Select or enter your Case Material"
        data={caseData}
        maxDropdownHeight={165}
        searchable
        clearable
        creatable
        getCreateLabel={(query) => `+ Create ${query}`}
        onCreate={(query) => setCaseData((current) => [...current, query])}
        {...form.getInputProps("caseMaterial")}
      />
      <Checkbox
        mt="md"
        mb="sm"
        label="Has a weight?"
        {...form.getInputProps("hasWeight", { type: "checkbox" })}
      />
      {form.values.hasWeight && (
        <Select
          label="Weight Material"
          placeholder="Select or enter your Weight Material"
          data={weightData}
          maxDropdownHeight={165}
          searchable
          clearable
          creatable
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => setWeightData((current) => [...current, query])}
          {...form.getInputProps("weightMaterial")}
        />
      )}
      <MultiSelect
        label="Plates"
        placeholder="Pick your Plates"
        data={plateData}
        maxDropdownHeight={165}
        searchable
        clearable
        creatable
        getCreateLabel={(query) => `+ Create ${query}`}
        onCreate={(query) => setPlateData((current) => [...current, query])}
        {...form.getInputProps("plates")}
      />

      <Group noWrap>
        <TextInput label="Weight" {...form.getInputProps("weight")} />
        <Select
          label="Unit"
          placeholder="Select a weight unit"
          data={WEIGHT_UNITS}
          maxDropdownHeight={165}
          searchable
          clearable
          nothingFound="Nothing found"
          {...form.getInputProps("weightUnits")}
        />
      </Group>

      <Checkbox
        mt="md"
        label="Has this case been built?"
        {...form.getInputProps("built", { type: "checkbox" })}
      />

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