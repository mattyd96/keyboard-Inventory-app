import { useState } from "react";
import { Group, Title, Button, Modal } from "@mantine/core";

import Layout from "../../components/layout/Layout";
import SwitchAddForm from "../../components/switches/SwitchAddForm";
import SwitchList from "../../components/switches/SwitchList";


function Switches() {
  const [formOpen, setFormOpen] = useState<boolean>(false);

  return (
    <Layout>
      <Group position="apart">
        <Title order={2}>Switches</Title>
        {!formOpen && <Button color='indigo' onClick={() => {setFormOpen(true)}}>Add Switches</Button>}
      </Group>
      <Modal opened={formOpen} onClose={() => setFormOpen(false)} title="Add Switches">
        <SwitchAddForm closeForm={setFormOpen} />
      </Modal>
      <SwitchList badgeColor='indigo' />
    </Layout>
  );
}

export default Switches;