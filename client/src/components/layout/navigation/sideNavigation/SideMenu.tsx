import { Button, Center } from '@mantine/core';
import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../../../context/auth';
import SideMenuExpanded from './SideMenuExpanded';

type Props = {
  opened: Boolean;
}

function SideMenu({ opened }: Props) {
  const { user } = useContext(AuthContext);

  return (
    <Fragment>
      {!user && 
      <Center>
        <Button fullWidth variant='default' mt={'1rem'} component={Link} to='/login'>Sign in to see inventory</Button>
      </Center>
      }
      {user && opened &&
        <SideMenuExpanded />
      }
    </Fragment>
  );


}

export default SideMenu;