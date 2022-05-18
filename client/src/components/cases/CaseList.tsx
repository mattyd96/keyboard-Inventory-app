import { Fragment, useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Accordion, Group, Loader, Text, Button, useMantineTheme, TextInput } from "@mantine/core";

import { AuthContext } from "../../context/auth";
import { FETCH_CASES_QUERY, DELETE_CASE_MUTATION } from "../../util/graphql";
import CaseItem from "./CaseItem";
import CaseLabel from "./CaseLabel";

type Case = {
  _id: string;
  name: string;
  creator: string;
  color: string;
  layout: string;
  caseMaterial: string;
  weightMaterial: string;
  weight: string;
  weightUnits: string;
  built: boolean;
}

type Data = {
  getInventory: {
    cases: Case[]
  }
}

function CaseList() {
  const { user } = useContext(AuthContext);
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