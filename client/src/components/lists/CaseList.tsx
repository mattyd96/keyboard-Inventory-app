import { Fragment, useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Accordion, Group, Loader, Text, Button, useMantineTheme } from "@mantine/core";

import { AuthContext } from "../../context/auth";
import { FETCH_CASES_QUERY, DELETE_CASE_MUTATION } from "../../util/graphql";

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

type LabelProps = {
  creator: string;
  name: string;
  built: boolean;
}

function CaseLabel({ creator, name, built }: LabelProps) {
  const { colors } = useMantineTheme();
  return (
    <Group position="apart">
      <Group>
        <Text>{creator}</Text>
        <Text>{name}</Text>
      </Group>
      {built && <Text color={colors.green[3]}>Built</Text>}
    </Group>
  );
}

function CaseList() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery<Data>(FETCH_CASES_QUERY);
  const [deleteCaseMutation] = useMutation(DELETE_CASE_MUTATION, {
    update(proxy, { data: { deleteCase }}) {

      proxy.writeQuery({ query: FETCH_CASES_QUERY, data : {
        getInventory: { cases: [...deleteCase.cases]}
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
      <Accordion>
            {data?.getInventory.cases.map((item, index) => (
              <Accordion.Item label={<CaseLabel {...item} />} key={index}>
                <Text>{item.layout}</Text>
                <Button onClick={deleteCase} value={item._id}>Delete</Button>
              </Accordion.Item>
            ))}
      </Accordion>

    </Fragment>
  );
}

export default CaseList;