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
      <Carousel wrapAround>
        {item.images.map((image, index) => <img src={image} width='100%' key={index} alt='' />)}
      </Carousel>
      <Group position="apart" align={'center'} mt={'1rem'}>
        <Title order={2}>{item.name}</Title>
        <Button component={Link} to="/inventory/builds">Back to Builds</Button>
      </Group>
      <Text my={'1rem'}>{item.description}</Text>
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
      <Stack mt={'1rem'}>
        <Title order={4}>Switches</Title>
        {item.switches && item.switches.map((swit, index) => 
            <Group position="apart">
              <Group>
                <Badge>Switch</Badge>
                <Text>{swit.name}</Text>
              </Group>
              <Group>
                <Badge>{swit.stock ? 'Modded' : 'Stock'}</Badge>
              </Group>
            </Group>
        )}
      </Stack>
    </Box>
  );
}

export default SingleBuild;