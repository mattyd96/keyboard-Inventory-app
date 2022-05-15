import { Button, Text } from '@mantine/core';
import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../../../context/auth';
import MenuAccordion from './MenuAccordion';
import SideMenuExpanded from './SideMenuExpanded';

type Props = {
  opened: Boolean;
}

function SideMenu({ opened }: Props) {
  const { user } = useContext(AuthContext);

  return (
    <Fragment>
      {!user && <Button component={Link} to='/login'>Sign In</Button>}
      {user && opened &&
        <SideMenuExpanded />
      }
    </Fragment>
  );


}

export default SideMenu;