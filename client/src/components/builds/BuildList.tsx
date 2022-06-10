import { Fragment, useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Loader, Grid, Group } from "@mantine/core";

import { UserBuildData } from "../../util/buildTypes";
import { FETCH_USER_BUILDS_QUERY, DELETE_BUILD_MUTATION } from "../../util/buildGraphql";
import BuildItem from "./BuildItem";
import { AuthContext } from "../../context/auth";


function BuildList() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery<UserBuildData>(FETCH_USER_BUILDS_QUERY, {
    variables: {username: user!.username}
  });

  const [deleteBuildMutation] = useMutation(DELETE_BUILD_MUTATION, {
    update(proxy, { data: { deleteBuild }}) {
      const data : UserBuildData = proxy.readQuery({query: FETCH_USER_BUILDS_QUERY, variables: {username: user!.username}})!;

      proxy.writeQuery({ query: FETCH_USER_BUILDS_QUERY, data : {
        getUserBuilds: data ? data.getUserBuilds.filter(item => item.id !== deleteBuild) : []
      }});
    },
  });

  const deleteBuild = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.value;
    deleteBuildMutation({variables: {id}});
  }

  return (
    <Fragment>
      {loading && 
        <Group position='center' mt='2rem'>
          <Loader/>
        </Group>
      }
      {!loading && data != null &&
        <Grid columns={24}>
          {data && data?.getUserBuilds.map((item ) =>
            <Grid.Col xs={12} md={8} lg={6} xl={4}>
              <BuildItem {...item} delete={deleteBuild} key={item.id}/>
            </Grid.Col>
          )}
        </Grid>
      }
    </Fragment>
  );
}

export default BuildList;