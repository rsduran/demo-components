import React from 'react';
import { ChakraProvider, extendTheme, Box, Badge } from '@chakra-ui/react';
import '@fontsource-variable/karla/wght.css';

const theme = extendTheme({
  fonts: {
    body: '"Karla Variable", sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        position: 'relative',
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
        outline: 'transparent solid 2px',
        outlineOffset: '2px',
        lineHeight: '19px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'black',
        height: '48px',
        fontSize: '16px',
        paddingInlineStart: '24px',
        paddingInlineEnd: '24px',
        backgroundColor: '#00b4ff',
        color: 'rgb(0, 0, 0)',
        width: 'auto',
        borderRadius: 'full',
        textTransform: 'uppercase',
        fontWeight: 700,
        fontFamily: '"Karla Variable", sans-serif',
        fontStyle: 'normal',
        boxShadow: '0 4px 0 0 black',
      },
    },
  },
});

const CopyReferralButton = ({ children, ...props }) => (
  <Box
    as="button"
    {...theme.components.Button.baseStyle}
    {...props}
  >
    <Badge
      bg="#eefed5"
      color="rgb(0, 0, 0)"
      fontSize="24px"
      fontWeight={700}
      px="1"
      py="0"
      borderRadius="md"
      lineHeight="29px"
      fontFamily='"Karla Variable", sans-serif'
      fontStyle="normal"
      textTransform="none"
      display="inline-block"
    >
      Referral Program
    </Badge>
  </Box>
);

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box bg="white" minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
        <CopyReferralButton />
      </Box>
    </ChakraProvider>
  );
}

export default App;