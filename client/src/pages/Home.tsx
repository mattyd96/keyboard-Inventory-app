import { Button, Stack, Title } from "@mantine/core";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { AuthContext } from "../context/auth";
import { Navigate } from "react-router-dom"

function Home() {
  const { user } = useContext(AuthContext);
  return (
    <Layout>
      {user ?
        <Navigate replace to="/inventory/home"/>
        :
        <Stack align={'center'}>
          <Title order={2}>
            Welcome
          </Title>
          <Button component={Link} to="/signup">Get Started</Button>
        </Stack>
      }
    </Layout>
  );
}

export default Home;