import React from 'react';
import { ChakraProvider, extendTheme, Box, Text, Flex } from '@chakra-ui/react';
import { MdDesktopMac } from 'react-icons/md';
import '@fontsource-variable/karla/wght.css';

const theme = extendTheme({
  fonts: {
    body: '"Karla Variable", sans-serif',
  },
});

const NewTaskComponent = () => {
  return (
    <ChakraProvider theme={theme}>
      <Flex justifyContent="center" alignItems="center" h="100vh" bg="white">
        <Box
          w="280px"
          h="90px"
          bg="#b3ebf2"
          borderRadius="20px"
          border="1px solid black"
          boxShadow="0 4px 0 0 black"
          position="relative"
          overflow="hidden"
        >
          <Box
            position="absolute"
            top="4px"
            left="16px"
            bg="#00bfff"
            px="3"
            py="1"
            borderRadius="10px"
          >
            <Text fontSize="14px" fontWeight="700" color="black">
              New Task
            </Text>
          </Box>
          <Flex alignItems="center" h="full" px="4" pt="8">
            <MdDesktopMac size="24px" color="black" />
            <Box ml="3">
              <Text fontSize="14px" fontWeight="400" color="black">
                Install Grass
              </Text>
              <Text fontSize="14px" fontWeight="400" color="black" textDecoration="underline">
                Desktop Node
              </Text>
            </Box>
            <Flex
              ml="auto"
              w="20px"
              h="20px"
              borderRadius="full"
              border="1px solid black"
              bg="white"
              justifyContent="center"
              alignItems="center"
            >
              <Box w="14px" h="14px" borderRadius="full" bg="white" />
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default NewTaskComponent;