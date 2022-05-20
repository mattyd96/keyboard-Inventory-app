import { Fragment } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Accordion, Loader } from "@mantine/core";

import { FETCH_CASES_QUERY, DELETE_CASE_MUTATION } from "../../util/caseGraphql";
import { Data } from "../../util/caseTypes";
import CaseItem from "./CaseItem";
import CaseLabel from "./CaseLabel";


function CaseList() {
  const { loading, data } = useQuery<Data>(FETCH_CASES_QUERY);
  const [deleteCaseMutation] = useMutation(DELETE_CASE_MUTATION, {
    update(proxy, { data: { deleteCase }}) {
      proxy.writeQuery({ query: FETCH_CASES_QUERY, data : {
        getInventory: {id: deleteCase.id, cases: [...deleteCase.cases]}
      }});
    },
  });

  if(data) {
    console.log(data);
  }

  const deleteCase = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.value;
    deleteCaseMutation({variables: {id}});
  }

  return (
    <Fragment>
      {loading && <Loader />}
      <Accordion multiple>
            {data?.getInventory.cases.map((item, index) => (
              <Accordion.Item label={<CaseLabel {...item} />} key={index}>
                <CaseItem {...item} delete={deleteCase}/>
              </Accordion.Item>
            ))}
      </Accordion>

    </Fragment>
  );
}

export default CaseList;