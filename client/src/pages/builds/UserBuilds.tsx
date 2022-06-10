import { useState } from "react";
import { Group, Title, Button, Modal } from "@mantine/core";

import Layout from "../../components/layout/Layout";
import BuildAddForm from "../../components/builds/BuildAddForm";
import BuildList from "../../components/builds/BuildList";


function UserBuilds() {
  const [formOpen, setFormOpen] = useState<boolean>(false);

  return (
    <Layout>
      <Group mb={'2rem'} position="apart">
        <Title order={2}>Builds</Title>
        {!formOpen && <Button onClick={() => {setFormOpen(true)}}>Add Build</Button>}
      </Group>
      <Modal opened={formOpen} onClose={() => setFormOpen(false)} title="Add a Build">
        <BuildAddForm closeForm={setFormOpen} />
      </Modal>
      <BuildList />
    </Layout>
  );
}

export default UserBuilds;