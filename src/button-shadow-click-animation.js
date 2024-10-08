import React from 'react';
import { ChakraProvider, extendTheme, Box } from '@chakra-ui/react';
import CopyReferralButton from './CopyReferralButton';
import '@fontsource-variable/karla/wght.css';

const theme = extendTheme({
  fonts: {
    body: '"Karla Variable", sans-serif',
  },
  components: {
    CopyReferralButton: {
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
        transition: '0.3s',
        height: '48px',
        fontSize: '16px',
        paddingInlineStart: '24px',
        paddingInlineEnd: '24px',
        backgroundColor: '#abf701',
        color: 'rgb(0, 0, 0)',
        width: 'auto',
        borderRadius: 'full',
        textTransform: 'uppercase',
        fontWeight: 700,
        fontFamily: '"Karla Variable", sans-serif',
        fontStyle: 'normal',
        boxShadow: '0 4px 0 0 black',
        _hover: {
          transform: 'translateY(2px)',
          boxShadow: '0 2px 0 0 black',
        },
        _active: {
          transform: 'translateY(4px)',
          boxShadow: 'none',
        },
      },
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box bg="white" minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
        <CopyReferralButton>COPY REFERRAL LINK</CopyReferralButton>
      </Box>
    </ChakraProvider>
  );
}

export default App;