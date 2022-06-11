import { Fragment } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Accordion, Loader, Group } from "@mantine/core";

import { FETCH_CASES_QUERY, DELETE_CASE_MUTATION } from "../../util/caseGraphql";
import { Data } from "../../util/caseTypes";
import CaseItem from "./CaseItem";
import CaseLabel from "./CaseLabel";

interface Props {
  badgeColor: string
}

function CaseList({ badgeColor }: Props) {
  const { loading, data } = useQuery<Data>(FETCH_CASES_QUERY);
  const [deleteCaseMutation] = useMutation(DELETE_CASE_MUTATION, {
    update(proxy, { data: { deleteCase }}) {
      proxy.writeQuery({ query: FETCH_CASES_QUERY, data : {
        getInventory: {id: deleteCase.id, cases: [...deleteCase.cases]}
      }});
    },
  });

  const deleteCase = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.value;
    deleteCaseMutation({variables: {id}});
  }

  return (
    <Fragment>
      {loading && 
        <Group position='center' mt='2rem'>
          <Loader/>
        </Group>
      }
      <Accordion multiple mt={'2rem'}>
        {data?.getInventory.cases.map((item) => (
          <Accordion.Item label={<CaseLabel {...item} />} key={item.id}>
            <CaseItem {...item} delete={deleteCase} badgeColor={badgeColor}/>
          </Accordion.Item>
        ))}
      </Accordion>
    </Fragment>
  );
}

export default CaseList;