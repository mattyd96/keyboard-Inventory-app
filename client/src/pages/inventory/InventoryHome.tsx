import { Button, Stack, Title, Grid } from "@mantine/core";
import { useContext } from "react";
import { Link } from "react-router-dom";
import BuildList from "../../components/builds/BuildList";
import Layout from "../../components/layout/Layout";
import { AuthContext } from "../../context/auth";

function InventoryHome() {
  const { user } = useContext(AuthContext);
  return (
    <Layout>
      <Title order={2} mb='1rem'>Builds</Title>
      <BuildList />
      <Title order={2} my='1rem'>Parts</Title>
      <Grid>
        <Grid.Col xs={6} md={4} lg={3} xl={2}>
          <Button component={Link} to="/inventory/cases" fullWidth color="violet" sx={{height: '5rem'}} size='xl'>Cases</Button>
        </Grid.Col>
        <Grid.Col xs={6} md={4} lg={3} xl={2}>
          <Button component={Link} to="/inventory/keycaps" fullWidth color="yellow" sx={{height: '5rem'}} size='xl'>Keycaps</Button>
        </Grid.Col>
        <Grid.Col xs={6} md={4} lg={3} xl={2}>
          <Button component={Link} to="/inventory/switches" fullWidth color="indigo" sx={{height: '5rem'}} size='xl'>Switches</Button>
        </Grid.Col>
        <Grid.Col xs={6} md={4} lg={3} xl={2}>
          <Button component={Link} to="/inventory/stabs" fullWidth color="cyan" sx={{height: '5rem'}} size='xl'>Stabs</Button>
        </Grid.Col>
        <Grid.Col xs={6} md={4} lg={3} xl={2}>
          <Button component={Link} to="/inventory/springs" fullWidth color="orange" sx={{height: '5rem'}} size='xl'>Springs</Button>
        </Grid.Col>
        <Grid.Col xs={6} md={4} lg={3} xl={2}>
          <Button component={Link} to="/inventory/artisans" fullWidth color="pink" sx={{height: '5rem'}} size='xl'>Artisans</Button>
        </Grid.Col>
      </Grid>
    </Layout>
  );
}

export default InventoryHome;