import { Container, Title, Group, List } from "@mantine/core";
import { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { Checklist } from "tabler-icons-react";

const LINKS = ['Cases', 'Keycaps', 'Switches', 'Stabs', 'Springs', 'Artisans'];

function SideMenuExpanded() {
  return (
    <Fragment>
      <Container>
        <Group>
          <Checklist />
          <Title order={4}>Inventory</Title>
        </Group>
        <List listStyleType={'none'}>
          {LINKS.map(link => 
            <List.Item>
              <NavLink to={`/inventory/${link.toLowerCase()}`}>{link}</NavLink>
            </List.Item>
          )}
        </List>
      </Container>
    </Fragment>
  );
}

export default SideMenuExpanded;