import { useState } from "react";
import { Group, Title, Button, Modal } from "@mantine/core";

import Layout from "../../components/layout/Layout";
import CaseAddForm from "../../components/cases/CaseAddForm";
import CaseList from "../../components/cases/CaseList";


function Cases() {
  const [formOpen, setFormOpen] = useState<boolean>(false);

  return (
    <Layout>
      <Group position="apart">
        <Title order={2}>Cases</Title>
        {!formOpen && <Button color='violet' onClick={() => {setFormOpen(true)}}>Add Case</Button>}
      </Group>
      <Modal opened={formOpen} onClose={() => setFormOpen(false)} title="Add a Case">
        <CaseAddForm closeForm={setFormOpen} />
      </Modal>
      <CaseList badgeColor='violet' />
    </Layout>
  );
}

export default Cases;