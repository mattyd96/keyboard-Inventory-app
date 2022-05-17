import { Fragment, useContext } from "react";
import { useQuery } from "@apollo/client";
import { Accordion, Group, Loader, Text, useMantineTheme } from "@mantine/core";

import { AuthContext } from "../../context/auth";
import { FETCH_CASES } from "../../util/graphql";
import { Check, X } from "tabler-icons-react";

type Data = {
  getCases: {
    _id: string;
    name: string;
    creator: string;
    color: string;
    layout: string;
    caseMaterial: string;
    weightMaterial: string;
    weight: string;
    weightUnits: string;
    built: boolean;
  }[]
}

type LabelProps = {
  creator: string;
  name: string;
  built: boolean;
}

function CaseLabel({ creator, name, built }: LabelProps) {
  const { colors } = useMantineTheme();
  return (
    <Group position="apart">
      <Group>
        <Text>{creator}</Text>
        <Text>{name}</Text>
      </Group>
      {built && <Text color={colors.green[3]}>Built</Text>}
    </Group>
  );
}

function CaseList() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery<Data>(FETCH_CASES,
    {variables : {username: user?.username}}
  );

  if(data) {
    console.log(data);
  }

  return (
    <Fragment>
      {loading && <Loader />}
      <Accordion>
        {data?.getCases.map((item, index) => (
          <Accordion.Item label={<CaseLabel {...item} />} key={index}>
            <Text>{item.layout}</Text>
          </Accordion.Item>
        ))}
      </Accordion>

    </Fragment>
  );
}

export default CaseList;