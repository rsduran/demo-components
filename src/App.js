import React from 'react';
import { Box, VStack, HStack, Text, Button, Flex } from '@chakra-ui/react';

const ConnectWalletComponent = () => {
  return (
    <Box borderWidth={1} borderRadius="xl" p={6} bg="white" boxShadow="lg" maxW="800px">
      <Flex justifyContent="space-between" alignItems="flex-start">
        <VStack align="stretch" spacing={4} flex={1}>
          <Box bg="#f3ffd1" px={3} py={1} borderRadius="full" alignSelf="flex-start">
            <Text fontWeight="bold">Connect Wallet for Grass</Text>
          </Box>
          <Text>Select the wallet that will be attached to Grass for your rewards.</Text>
          <Button
            bg="#abf701"
            color="black"
            fontWeight="bold"
            borderRadius="full"
            px={6}
            alignSelf="flex-start"
          >
            CONNECT WALLET
          </Button>
        </VStack>
        <VStack align="stretch" spacing={2}>
          <Text fontWeight="bold">Deadline for Stage 1 Rewards:*</Text>
          <HStack spacing={2}>
            {['Days', 'Hrs', 'Mins', 'Secs'].map((unit) => (
              <VStack key={unit} bg="#f3ffd1" p={2} borderRadius="md">
                <Text fontSize="2xl" fontWeight="bold">00</Text>
                <Text fontSize="sm">{unit}</Text>
              </VStack>
            ))}
          </HStack>
          <Text fontSize="xs" fontStyle="italic">
            *Exceptions apply for users facing difficulties until October 4th at 11:59pm UTC
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
};

export default ConnectWalletComponent;