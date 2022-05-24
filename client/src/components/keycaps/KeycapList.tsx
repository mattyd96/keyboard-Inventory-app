import { Fragment } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Accordion, Loader } from "@mantine/core";

import { FETCH_KEYCAPS_QUERY, DELETE_KEYCAP_MUTATION } from "../../util/keycapGraphql";
import { Data } from "../../util/keycapTypes";
import KeycapItem from "./KeycapItem";
import KeycapLabel from "./KeycapLabel";


function KeycapList() {
  const { loading, data } = useQuery<Data>(FETCH_KEYCAPS_QUERY);
  const [deleteKeycapMutation] = useMutation(DELETE_KEYCAP_MUTATION, {
    update(proxy, { data: { deleteKeycap }}) {
      proxy.writeQuery({ query: FETCH_KEYCAPS_QUERY, data : {
        getInventory: {id: deleteKeycap.id, keycaps: [...deleteKeycap.keycaps]}
      }});
    },
  });

  if(data) {
    console.log(data);
  }

  const deleteKeycap = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.value;
    deleteKeycapMutation({variables: {id}});
  }

  return (
    <Fragment>
      {loading && <Loader />}
      <Accordion multiple mt={'2rem'}>
        {data?.getInventory.keycaps.map((item) => (
          <Accordion.Item label={<KeycapLabel {...item} />} key={item.id}>
            <KeycapItem {...item} delete={deleteKeycap}/>
          </Accordion.Item>
        ))}
      </Accordion>
    </Fragment>
  );
}

export default KeycapList;