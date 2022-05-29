import { Fragment, useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Accordion, Loader, Group, Text } from "@mantine/core";

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
        getUserBuilds: data ? data.getUserBuilds.filter(item => item.id != deleteBuild) : []
      }});
    },
  });

  if(data) {
    console.log(data);
  }

  const deleteBuild = (event: React.MouseEvent<HTMLButtonElement>) => {
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
        <Group align={"stretch"}>
          {data && data?.getUserBuilds.map((item, index) =>
            <BuildItem {...item} delete={deleteBuild} key={item.id}/>
          )}
        </Group>
      }
    </Fragment>
  );
}

export default BuildList;