import { Dispatch, Fragment, SetStateAction, useState } from 'react';
import { Box, TextInput, Button, Group, NumberInput, Switch, SegmentedControl } from '@mantine/core';


type Props = {
  setFormVisible: Dispatch<SetStateAction<boolean>>;
  handleSubmit: Function
  form: any // TODO create a type for the form object
}

function SwitchBaseForm( { setFormVisible, handleSubmit, form }: Props) {

  const [stockValue, setStockValue] = useState(form.values.stock);
  const [isFranken, setIsFranken] = useState(false);
  const [customSpring, setCustomSpring] = useState(false);

  return (
    <Box
      component="form"
      onSubmit={form.onSubmit(handleSubmit)}
      //onSubmit={(event : any) => {event.preventDefault(); console.log(form.values)}}
      sx={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
    >
      <SegmentedControl
        value={stockValue}
        defaultValue={stockValue}
        onChange={(event) => {setStockValue(event); form.setFieldValue('stock', event)}}
        data={[
          { label: 'Stock', value: 'true' },
          { label: 'Modded', value: 'false' },
        ]}
      />

      {stockValue === 'false' &&
        <Fragment>
          <Switch 
            label="Different switch tops and bottoms"
            checked={isFranken} 
            onChange={(event) => setIsFranken(event.currentTarget.checked)} 
          />
          <Switch 
            label="Uses an aftermarket spring"
            checked={customSpring} 
            onChange={(event) => setCustomSpring(event.currentTarget.checked)} 
          />
        </Fragment>
      }

      <TextInput
        required
        label="Name"
        placeholder="Gateron Inks"
        {...form.getInputProps("name")}
      />

      {stockValue === 'false' &&
        <Fragment> 
          <TextInput
            label="Films"
            placeholder="TX films"
            {...form.getInputProps("films")}
          />
          <TextInput
            label="Lube"
            placeholder="205g"
            {...form.getInputProps("lube")}
          />
        </Fragment>
      }

      {stockValue === 'false' && isFranken &&
        <Fragment>
          <TextInput
            label="Switch Top"
            placeholder="cherry blacks"
            {...form.getInputProps("top")}
          />
          <TextInput
            label="Switch Bottom"
            placeholder="Gateron Inks"
            {...form.getInputProps("bottom")}
          />
        </Fragment>
      }
      {stockValue === 'false' && customSpring &&
        <Box sx={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
          <TextInput
            label="Spring Name"
            placeholder="Sprit Slow Curve"
            onChange={(event) => form.values.springs.name = event.currentTarget.value}
          />
          <TextInput
            label="Spring Lube"
            placeholder="3024"
            onChange={(event) => form.values.springs.lube = event.currentTarget.value}
          />
        </Box>
      }
      <TextInput
        label="Spring Weight"
        value={form.values.springs.weight}
        placeholder="63.5"
        onChange={(event) => form.setFieldValue('springs', {...form.values.springs, weight: event.currentTarget.value})}
      />
      <NumberInput
        label="Total held"
        {...form.getInputProps("totalAmount")}
      />
      <NumberInput
        label="Total available to be used"
        {...form.getInputProps("availableAmount")}
      />

      <Group position="right" mt="md">
        <Button
          type="button"
          color="red"
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

export default SwitchBaseForm;