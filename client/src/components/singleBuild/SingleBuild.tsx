import Carousel from "nuka-carousel";
import { Badge, Box, Button, Group, Text, Title, Stack } from "@mantine/core";

import { Case } from "../../util/caseTypes";
import { Switch } from "../../util/switchTypes";
import { Stab } from "../../util/stabTypes";
import { Keycap } from "../../util/keycapTypes";
import { Link } from 'react-router-dom';

type BuildProp = {
  id: string
  name: string
  description: string
  case: Case
  switches: Switch[]
  stabs: Stab[]
  keycaps: Keycap[]
  images: string[]
}

function SingleBuild(item: BuildProp) {

  return (
    <Box sx={{maxWidth: '50rem', margin: 'auto'}}>
      <Carousel>
        {item.images.map((image, index) => <img src={image} width='100%' key={index}/>)}
      </Carousel>
      <Group position="apart" align={'center'} mt={'1rem'}>
        <Title order={2}>{item.name}</Title>
        <Button component={Link} to="/inventory/builds">Back to Builds</Button>
      </Group>
      <Stack>
        <Title order={4}>Case</Title>
        <Group position="apart">
          <Group>
            <Badge>Creator</Badge>
            <Text>{item.case.creator}</Text>
          </Group>
          <Group>
            <Badge>Name</Badge>
            <Text>{item.case.name}</Text>
          </Group>
          <Group>
            <Badge>Color</Badge>
            <Text>{item.case.color}</Text>
          </Group>
        </Group>
      </Stack>
    </Box>
  );
}

export default SingleBuild;