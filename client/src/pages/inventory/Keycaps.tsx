import { useState } from "react";
import { Group, Title, Button, Modal } from "@mantine/core";

import Layout from "../../components/layout/Layout";
import KeycapAddForm from "../../components/keycaps/KeycapAddForm";
import KeycapList from "../../components/keycaps/KeycapList";


function Keycaps() {
  const [formOpen, setFormOpen] = useState<boolean>(false);

  return (
    <Layout>
      <Group position="apart">
        <Title order={2}>Keycaps</Title>
        {!formOpen && <Button onClick={() => {setFormOpen(true)}}>Add Keycaps</Button>}
      </Group>
      <Modal opened={formOpen} onClose={() => setFormOpen(false)} title="Add Keycaps">
        <KeycapAddForm closeForm={setFormOpen} />
      </Modal>
      <KeycapList />
    </Layout>
  );
}

export default Keycaps;