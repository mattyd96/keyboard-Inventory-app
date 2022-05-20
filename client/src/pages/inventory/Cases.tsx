import { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { Loader, Text, Group, Title, Button, Collapse } from "@mantine/core";

import Layout from "../../components/layout/Layout";
import CaseAddForm from "../../components/cases/CaseAddForm";
import CaseList from "../../components/cases/CaseList";

type Data = {
  getCases: {
    id: string;
    name: string;
    creator: string;
  }[]
}

function Cases() {
  const [formOpen, setFormOpen] = useState<boolean>(false);

  return (
    <Layout>
      <Group position="apart">
        <Title order={2}>Cases</Title>
        {!formOpen && <Button onClick={() => {setFormOpen(true)}}>Add Case</Button>}
      </Group>
      <Collapse in={formOpen} transitionDuration={500}>
        <CaseAddForm closeForm={setFormOpen} />
      </Collapse>
      <CaseList />
    </Layout>
  );
}

export default Cases;