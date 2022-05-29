import { Fragment } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Accordion, Loader, Group } from "@mantine/core";

import { FETCH_STABS_QUERY, DELETE_STAB_MUTATION } from "../../util/stabGraphql";
import { Data } from "../../util/stabTypes";
import StabItem from "./StabItem";
//import StabLabel from "./StabLabel";


function StabList() {
  const { loading, data } = useQuery<Data>(FETCH_STABS_QUERY);
  const [deleteStabMutation] = useMutation(DELETE_STAB_MUTATION, {
    update(proxy, { data: { deleteStab }}) {
      proxy.writeQuery({ query: FETCH_STABS_QUERY, data : {
        getInventory: {id: deleteStab.id, stabs: [...deleteStab.stabs]}
      }});
    },
  });

  if(data) {
    console.log(data);
  }

  const deleteStab = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.value;
    deleteStabMutation({variables: {id}});
  }

  return (
    <Fragment>
      {loading && 
        <Group position='center' mt='2rem'>
          <Loader/>
        </Group>
      }
      <Accordion multiple mt={'2rem'}>
        {data?.getInventory.stabs.map((item) => (
          <Accordion.Item label={item.name} key={item.id}>
            <StabItem {...item} delete={deleteStab}/>
          </Accordion.Item>
        ))}
      </Accordion>
    </Fragment>
  );
}

export default StabList;