import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import './App.css';
import { AuthProvider } from './context/auth';
import { MenuProvider } from './context/menu';

import Pages from './pages/Pages';

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));


  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withCSSVariables withGlobalStyles withNormalizeCSS>
        <AuthProvider>
          <MenuProvider>
            <Pages />
          </MenuProvider>
        </AuthProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
