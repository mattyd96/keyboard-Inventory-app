import { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { Loader, Text, Group, Title, Button } from "@mantine/core";

import Layout from "../../components/layout/Layout";
import { AuthContext } from "../../context/auth";
import { FETCH_CASES } from "../../util/graphql";
import InventoryCaseForm from "../../components/forms/InventoryCaseForm";

type Data = {
  getCases: {
    id: string;
    name: string;
    creator: string;
  }[]
}

function Cases() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery<Data>(FETCH_CASES,
    {variables : {username: user?.username}}
  );
  const [formOpen, setFormOpen] = useState<boolean>(false);

  if(!loading) {
    console.log(data);
  }

  return (
    <Layout>
      <Group position="apart">
        <Title order={2}>Cases</Title>
        <Button>Add Case</Button>
      </Group>
      <InventoryCaseForm />
      {loading && <Loader />}
      {data && data.getCases.map(cas => (<Text key={cas.id}>{cas.creator}</Text>) )}
      <Text>Cases Page</Text>
    </Layout>
  );
}

export default Cases;