import React from 'react';
import { ChakraProvider, extendTheme, Box, Button } from '@chakra-ui/react';
import '@fontsource-variable/karla/wght.css';

const theme = extendTheme({
  fonts: {
    body: '"Karla Variable", sans-serif',
  },
  components: {
    Button: {
      variants: {
        referral: {
          height: '48px',
          fontSize: '16px',
          px: '24px',
          bg: '#abf701',
          color: 'black',
          borderRadius: 'full',
          border: '1px solid black',
          fontWeight: 700,
          textTransform: 'uppercase',
          transition: '0.3s',
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
  },
});

const CopyReferralButton = (props) => (
  <Button variant="referral" {...props} />
);

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