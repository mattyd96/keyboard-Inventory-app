import { Button, Stack, Title } from "@mantine/core";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { AuthContext } from "../context/auth";

function Home() {
  const { user } = useContext(AuthContext);
  return (
    <Layout>
      <Stack align={'center'}>
        <Title order={2}>
          Welcome {user ? user.username: ''}
        </Title>
        {user ? 
          <Button component={Link} to="/inventory/builds">Go to Builds</Button> :
          <Button component={Link} to="/signup">Get Started</Button>
        }
      </Stack>
    </Layout>
  );
}

export default Home;