import { createContext, useState } from 'react';

type Menu = {
  open: boolean
  toggleMenu: Function
}

const MenuContext = createContext<Menu>({
  open: true,
  toggleMenu: () => {}
});

function MenuProvider(props : any) {
  const [open, setOpen] = useState(true);

  const openMenu = () => {
    setOpen(true);
  }

  const closeMenu = () => {
    setOpen(false);
  }

  const toggleMenu = (state: boolean) => {
    setOpen(state);
  }

  return (
    <MenuContext.Provider 
      value={{ open, toggleMenu }}
      {...props}
    />
  );
}

export { MenuContext, MenuProvider }