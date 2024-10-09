import React from 'react';
import { Box, VStack, Text, Flex, chakra } from '@chakra-ui/react';
import { GiDreamCatcher, GiCubeforce, GiSpellBook } from 'react-icons/gi';
import { RxDashboard } from 'react-icons/rx';
import { RiStackLine } from 'react-icons/ri';
import { LuRocket, LuLogOut } from 'react-icons/lu';
import '@fontsource-variable/karla/wght.css';
import '@fontsource/space-grotesk/700.css';

const SidebarItem = chakra(Flex, {
  baseStyle: {
    alignItems: 'center',
    padding: '14px 20px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    borderRadius: '0 20px 20px 0',
    marginRight: '16px',
    position: 'relative',
    marginTop: '3px',
    marginBottom: '3px',
    _hover: {
      bg: 'rgba(255, 255, 255, 0.3)',
    },
  },
});

const SidebarIcon = chakra(Box, {
  baseStyle: {
    fontSize: '24px',
    marginRight: '16px',
    color: 'black',
  },
});

const SidebarText = chakra(Text, {
  baseStyle: {
    fontFamily: '"Karla Variable", sans-serif',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '27px',
    color: 'black',
  },
});

const Sidebar = ({ activeItem, onItemClick }) => {
  const menuItems = ['Dashboard', 'Workloads', 'Task Set', 'Task Details', 'Create Task'];

  return (
    <Box bg="#f2f2f3" width="300px" height="100vh" padding="20px 0" position="relative">
      <Flex alignItems="center" justifyContent="center" marginBottom="60px" marginLeft="-20px">
        <Box display="flex" alignItems="center">
          <GiDreamCatcher size={32} color="black" />
          <Text
            marginLeft="8px"
            fontFamily="'Space Grotesk', sans-serif"
            fontSize="32px"
            fontWeight="bold"
            color="black"
            position="relative"
          >
            hiraya
            <sup style={{ fontSize: '8px', position: 'absolute', top: '15px', right: '-12px' }}>TM</sup>
          </Text>
        </Box>
      </Flex>
      <VStack spacing={2} align="stretch">
        {menuItems.map((item, index) => (
          <SidebarItem
            key={item}
            onClick={() => onItemClick(item)}
            position="relative"
            zIndex={1}
          >
            <Box
              position="absolute"
              top="-3px"
              left={0}
              right={0}
              bottom="-3px"
              bg={activeItem === item ? '#b3ebf2' : 'transparent'}
              borderRadius="0 20px 20px 0"
              borderTop={activeItem === item ? '1px solid black' : 'none'}
              borderRight={activeItem === item ? '1px solid black' : 'none'}
              borderBottom={activeItem === item ? '1px solid black' : 'none'}
              boxShadow={activeItem === item ? '0 4px 0 0 black' : 'none'}
              zIndex={-1}
            />
            <SidebarIcon as={
              index === 0 ? RxDashboard :
              index === 1 ? GiCubeforce :
              index === 2 ? RiStackLine :
              index === 3 ? GiSpellBook :
              LuRocket
            } />
            <SidebarText fontWeight={activeItem === item ? 700 : 500}>{item}</SidebarText>
          </SidebarItem>
        ))}
      </VStack>
      <Flex
        position="absolute"
        bottom="20px"
        left="0"
        right="0"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        _hover={{ color: 'rgb(226, 18, 18)' }}
        role="group"
      >
        <SidebarIcon
          as={LuLogOut}
          color="gray.500"
          _groupHover={{ color: 'rgb(226, 18, 18)' }}
          marginRight="16px"
        />
        <SidebarText
          color="gray.500"
          _groupHover={{ color: 'rgb(226, 18, 18)' }}
        >
          Logout
        </SidebarText>
      </Flex>
    </Box>
  );
};

export default Sidebar;