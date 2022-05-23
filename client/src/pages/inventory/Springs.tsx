import { useState } from "react";
import { Group, Title, Button, Modal } from "@mantine/core";

import Layout from "../../components/layout/Layout";
import SpringList from "../../components/springs/SpringList";
import SpringAddForm from "../../components/springs/SpringAddForm";


function Springs() {
  const [formOpen, setFormOpen] = useState<boolean>(false);

  return (
    <Layout>
      <Group position="apart">
        <Title order={2}>Springs</Title>
        {!formOpen && <Button onClick={() => {setFormOpen(true)}}>Add Spring</Button>}
      </Group>
      <Modal opened={formOpen} onClose={() => setFormOpen(false)} title="Add a Spring">
        <SpringAddForm closeForm={setFormOpen} />
      </Modal>
      <SpringList />
    </Layout>
  );
}

export default Springs;