import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { Sun, Moon } from '@icon-park/react';

function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <ActionIcon
      variant="outline"
      color={dark ? 'yellow' : 'blue'}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </ActionIcon>
  );
}

export default ThemeToggle;