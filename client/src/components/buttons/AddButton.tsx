import { Button } from '@mantine/core';
import { Plus } from 'tabler-icons-react';

interface Props {
  onClick: React.MouseEventHandler
  children?: React.ReactNode;
}

function AddButton({ onClick, children }: Props) {
  return (
    <Button
      variant='subtle'
      leftIcon={<Plus size={14} />}
      color="gray"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default AddButton;