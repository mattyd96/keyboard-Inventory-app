import { useState } from "react";
import { Group, Title, Button, Modal } from "@mantine/core";

import Layout from "../../components/layout/Layout";
import ArtisanAddForm from "../../components/artisans/ArtisanAddForm";
import ArtisanList from "../../components/artisans/ArtisanList";


function Artisans() {
  const [formOpen, setFormOpen] = useState<boolean>(false);

  return (
    <Layout>
      <Group position="apart">
        <Title order={2}>Artisans</Title>
        {!formOpen && <Button color='pink' onClick={() => {setFormOpen(true)}}>Add Artisan</Button>}
      </Group>
      <Modal opened={formOpen} onClose={() => setFormOpen(false)} title="Add an Artisan">
        <ArtisanAddForm closeForm={setFormOpen} />
      </Modal>
      <ArtisanList badgeColor='pink'/>
    </Layout>
  );
}

export default Artisans;