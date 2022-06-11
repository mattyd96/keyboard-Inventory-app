import { Fragment } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Accordion, Loader } from "@mantine/core";

import { FETCH_ARTISANS_QUERY, DELETE_ARTISAN_MUTATION } from "../../util/artisanGraphql";
import { Data } from "../../util/artisanTypes";
import ArtisanItem from "./ArtisanItem";
//import StabLabel from "./StabLabel";

interface Props {
  badgeColor: string
}

function ArtisanList({ badgeColor }: Props) {
  const { loading, data } = useQuery<Data>(FETCH_ARTISANS_QUERY);
  const [deleteArtisanMutation] = useMutation(DELETE_ARTISAN_MUTATION, {
    update(proxy, { data: { deleteArtisan }}) {
      proxy.writeQuery({ query: FETCH_ARTISANS_QUERY, data : {
        getInventory: {id: deleteArtisan.id, artisans: [...deleteArtisan.artisans]}
      }});
    },
  });

  if(data) {
    console.log(data);
  }

  const deleteArtisan = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.value;
    deleteArtisanMutation({variables: {id}});
  }

  return (
    <Fragment>
      {loading && <Loader />}
      <Accordion multiple mt={'2rem'}>
        {data?.getInventory.artisans.map((item) => (
          <Accordion.Item label={item.name} key={item.id}>
            <ArtisanItem {...item} delete={deleteArtisan} badgeColor={badgeColor}/>
          </Accordion.Item>
        ))}
      </Accordion>
    </Fragment>
  );
}

export default ArtisanList;