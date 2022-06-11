import { useState } from "react";
import { Group, Title, Button, Modal } from "@mantine/core";

import Layout from "../../components/layout/Layout";
import StabAddForm from "../../components/stabs/StabAddForm";
import StabList from "../../components/stabs/StabList";


function Stabs() {
  const [formOpen, setFormOpen] = useState<boolean>(false);

  return (
    <Layout>
      <Group position="apart">
        <Title order={2}>Stabs</Title>
        {!formOpen && <Button color='cyan' onClick={() => {setFormOpen(true)}}>Add Stab</Button>}
      </Group>
      <Modal opened={formOpen} onClose={() => setFormOpen(false)} title="Add a Stab">
        <StabAddForm closeForm={setFormOpen} />
      </Modal>
      <StabList badgeColor='cyan' />
    </Layout>
  );
}

export default Stabs;