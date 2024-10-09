import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import MainPage from './MainPage';

const App = () => {
  return (
    <ChakraProvider>
      <MainPage />
    </ChakraProvider>
  );
};

export default App;