import { Fragment } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Accordion, Loader, Group } from "@mantine/core";

import { Data } from "../../util/springTypes";
import { FETCH_SPRINGS_QUERY, DELETE_SPRING_MUTATION } from "../../util/springGraphql";
import SpringItem from "./SpringItem";

interface Props {
  badgeColor: string
}

function SpringList({ badgeColor }: Props) {
  const { loading, data } = useQuery<Data>(FETCH_SPRINGS_QUERY);

  const [deleteSpringMutation] = useMutation(DELETE_SPRING_MUTATION, {
    update(proxy, { data: { deleteSpring }}) {
      proxy.writeQuery({ query: FETCH_SPRINGS_QUERY, data : {
        getInventory: {id: deleteSpring.id, springs: [...deleteSpring.springs]}
      }});
    },
  });

  const deleteSpring = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.value;
    deleteSpringMutation({variables: {id}});
  }

  return (
    <Fragment>
      {loading && 
        <Group position='center' mt='2rem'>
          <Loader/>
        </Group>
      }
      <Accordion multiple mt={'2rem'}>
        {data?.getInventory.springs.map((item, index) => (
          <Accordion.Item label={item.name} key={item.id}>
            <SpringItem {...item} delete={deleteSpring} badgeColor={badgeColor}/>
          </Accordion.Item>
        ))}
      </Accordion>
    </Fragment>
  );
}

export default SpringList;