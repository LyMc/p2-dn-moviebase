import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
};

const components = {
  Container: {
    baseStyle: {
      maxW: 'container.xl',
    },
  },
};

const theme = extendTheme({ config, components });

export default theme;
