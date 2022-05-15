import { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { Loader, Text, Group, Title, Button } from "@mantine/core";
import { useForm } from "@mantine/form";

import Layout from "../../components/layout/Layout";
import { AuthContext } from "../../context/auth";
import { FETCH_CASES } from "../../util/graphql";
import InventoryCaseForm from "../../components/forms/InventoryCaseForm";


function Cases() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_CASES,
    {variables : {username: user?.username}}
  );
  const [formOpen, setFormOpen] = useState<boolean>(false);

  return (
    <Layout>
      <Group position="apart">
        <Title order={2}>Cases</Title>
        <Button>Add Case</Button>
      </Group>
      <InventoryCaseForm />
      {loading && <Loader />}
      {data && <Text>Ok {data.cases}</Text>}
      <Text>Cases Page</Text>
    </Layout>
  );
}

export default Cases;