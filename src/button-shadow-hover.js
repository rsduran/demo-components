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
        referralStatic: {
          height: '48px',
          fontSize: '16px',
          px: '24px',
          bg: '#abf701',
          color: 'black',
          borderRadius: 'full',
          border: '1px solid black',
          fontWeight: 700,
          textTransform: 'uppercase',
          boxShadow: '0 4px 0 0 black',
        },
      },
    },
  },
});

const CopyReferralButton = (props) => (
  <Button variant="referralStatic" {...props} />
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