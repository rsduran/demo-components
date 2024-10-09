import React, { useState } from 'react';
import { Box, Flex, Text, Avatar } from '@chakra-ui/react';

const Navbar = ({ activeItem }) => {
  const [isLightTheme, setIsLightTheme] = useState(true);

  return (
    <Flex 
      justify="space-between" 
      align="center" 
      p={4} 
      bg="white" 
      borderBottom="1px solid" 
      borderColor="gray.200"
    >
      <Box ml={4}>
        <Text
          fontFamily='"Karla Variable", sans-serif'
          fontWeight={700}
          fontSize="24px"
          lineHeight="29px"
          color="rgb(0, 0, 0)"
        >
          <Box
            as="span"
            bg="#b3ebf2"
            px="1"
            py="0"
            borderRadius="8px"
          >
            {activeItem}
          </Box>
        </Text>
      </Box>
      <Flex align="center" mr={4}>
        <Box
          width="52px"
          height="24px"
          bg="gray.200"
          borderRadius="full"
          display="flex"
          alignItems="center"
          padding="2px"
          cursor="pointer"
          onClick={() => setIsLightTheme(!isLightTheme)}
          mr={4}
          border="1px solid black"
        >
          <Box
            width="16px"
            height="16px"
            bg="#00bfff"
            borderRadius="full"
            transform={isLightTheme ? "translateX(3px)" : "translateX(27px)"}
            transition="transform 0.2s"
            border="1px solid black"  // Added border to the circle
          />
        </Box>
        <Text
          fontFamily='"Karla Variable", sans-serif'
          fontWeight={500}
          fontSize="16px"
          lineHeight="24px"
          color="rgb(26, 32, 44)"
          mr={4}
        >
          {isLightTheme ? "Light theme" : "Dark theme"}
        </Text>
        <Flex align="center">
          <Text
            fontFamily='"Karla Variable", sans-serif'
            fontWeight={700}
            fontSize="20px"
            lineHeight="30px"
            color="rgb(84, 84, 84)"
            mr={1}
          >
            Hello,
          </Text>
          <Text
            fontFamily='"Karla Variable", sans-serif'
            fontWeight={700}
            fontSize="20px"
            lineHeight="30px"
            color="rgb(26, 32, 44)"
            mr={2}
          >
            rsduran!
          </Text>
          <Avatar src="https://bit.ly/dan-abramov" size="md" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;