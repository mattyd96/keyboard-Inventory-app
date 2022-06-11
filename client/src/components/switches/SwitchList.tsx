import { Fragment } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Accordion, Loader, Group } from "@mantine/core";

import { FETCH_SWITCHES_QUERY, DELETE_SWITCH_MUTATION } from "../../util/switchGraphql";
import { Data } from "../../util/switchTypes";
import SwitchItem from "./SwitchItem";
import SwitchLabel from "./SwitchLabel";

interface Props {
  badgeColor: string
}

function SwitchList({ badgeColor }: Props) {
  const { loading, data } = useQuery<Data>(FETCH_SWITCHES_QUERY);
  const [deleteSwitchMutation] = useMutation(DELETE_SWITCH_MUTATION, {
    update(proxy, { data: { deleteSwitch }}) {
      proxy.writeQuery({ query: FETCH_SWITCHES_QUERY, data : {
        getInventory: {id: deleteSwitch.id, switches: [...deleteSwitch.switches]}
      }});
    },
  });

  if(data) {
    console.log(data);
  }

  const deleteSwitch = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.value;
    deleteSwitchMutation({variables: {id}});
  }

  return (
    <Fragment>
      {loading && 
        <Group position='center' mt='2rem'>
          <Loader/>
        </Group>
      }
      <Accordion multiple mt={'2rem'}>
        {data?.getInventory.switches.map((item) => (
          <Accordion.Item label={<SwitchLabel {...item} />} key={item.id}>
            <SwitchItem {...item} delete={deleteSwitch} badgeColor={badgeColor}/>
          </Accordion.Item>
        ))}
      </Accordion>
    </Fragment>
  );
}

export default SwitchList;