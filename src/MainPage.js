import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const MainPage = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <Flex>
      <Sidebar activeItem={activeItem} onItemClick={handleItemClick} />
      <Box flex={1}>
        <Navbar activeItem={activeItem} />
        <Box p={4}>
          {/* Main content area */}
          <h1>Content for {activeItem}</h1>
        </Box>
      </Box>
    </Flex>
  );
};

export default MainPage;