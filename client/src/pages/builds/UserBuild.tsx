import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Loader } from "@mantine/core";

import Layout from "../../components/layout/Layout";
import SingleBuild from "../../components/singleBuild/SingleBuild";
import { FETCH_BUILD_QUERY } from "../../util/buildGraphql";


function UserBuild() {
  const { id } = useParams();
  const { loading, data } = useQuery(FETCH_BUILD_QUERY,{ variables: { id } });

  return (
    <Layout>
      {loading && <Loader sx={{margin: 'auto'}}/>}
      {!loading && <SingleBuild {...data.getBuild} />}
    </Layout>
  );
}

export default UserBuild;