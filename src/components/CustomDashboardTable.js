import React, { useState, useMemo } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  VStack,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { PiSortAscending, PiSortDescending } from "react-icons/pi";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import Pagination from "./Pagination";

const mockData = [
  {
    id: 1,
    provider: "AWS",
    exam: "Cloud Practitioner",
    examType: "Actual",
    attempts: 2,
    averageScore: 78.5,
    progress: 75,
    latestGrade: { score: 85, total: 100 },
    status: "Passed",
    updated: "just now",
  },
  {
    id: 2,
    provider: "AWS",
    exam: "Solutions Architect",
    examType: "Custom",
    attempts: 1,
    averageScore: 65.0,
    progress: 50,
    latestGrade: { score: 65, total: 100 },
    status: "Failed",
    updated: "2 hours ago",
  },
  {
    id: 3,
    provider: "Google",
    exam: "Associate Cloud Engineer",
    examType: "Actual",
    attempts: 3,
    averageScore: 88.33,
    progress: 90,
    latestGrade: { score: 92, total: 100 },
    status: "Passed",
    updated: "1 day ago",
  },
  {
    id: 4,
    provider: "Microsoft",
    exam: "Azure Fundamentals",
    examType: "Custom",
    attempts: 0,
    averageScore: 0,
    progress: 30,
    latestGrade: { score: 0, total: 100 },
    status: "Not Attempted",
    updated: "1 week ago",
  },
  {
    id: 5,
    provider: "Cisco",
    exam: "CCNA",
    examType: "Actual",
    attempts: 2,
    averageScore: 77.5,
    progress: 80,
    latestGrade: { score: 80, total: 100 },
    status: "Passed",
    updated: "2 weeks ago",
  },
  // Add more data as needed
];

const CustomCheckbox = ({ isChecked, onChange }) => (
  <Box
    as="button"
    width="20px"
    height="20px"
    borderRadius="4px"
    border="2px solid black"
    backgroundColor={isChecked ? "#00bfff" : "white"}
    display="flex"
    alignItems="center"
    justifyContent="center"
    onClick={onChange}
    _hover={{ backgroundColor: isChecked ? "#00a6d6" : "#e6f7f9" }}
    transition="all 0.2s"
  >
    {isChecked && (
      <Box
        width="10px"
        height="10px"
        borderRadius="2px"
        backgroundColor="white"
      />
    )}
  </Box>
);

const CustomButton = ({
  children,
  onClick,
  backgroundColor,
  hoverBackgroundColor,
  isDisabled,
  borderColor,
  ...props
}) => (
  <Button
    onClick={onClick}
    height="40px"
    paddingLeft="16px"
    paddingRight="16px"
    backgroundColor={backgroundColor}
    color="black"
    fontWeight={700}
    fontSize="14px"
    borderRadius="full"
    border="1px solid"
    borderColor={borderColor || "black"}
    boxShadow={isDisabled ? "none" : "0 4px 0 0 black"}
    _hover={{
      backgroundColor: isDisabled ? backgroundColor : hoverBackgroundColor,
      transform: isDisabled ? "none" : "translateY(2px)",
      boxShadow: isDisabled ? "none" : "0 2px 0 0 black",
    }}
    _active={{
      transform: isDisabled ? "none" : "translateY(4px)",
      boxShadow: "none",
    }}
    transition="all 0.2s"
    opacity={isDisabled ? 0.5 : 1}
    cursor={isDisabled ? "not-allowed" : "pointer"}
    isDisabled={isDisabled}
    {...props}
  >
    {children}
  </Button>
);

const TableHeader = ({ children, onClick, isSortable, sortDirection }) => (
  <Flex
    alignItems="center"
    justifyContent="center"
    cursor={isSortable ? "pointer" : "default"}
    onClick={onClick}
  >
    <Text
      fontFamily="Karla Variable"
      fontWeight={700}
      fontSize="12px"
      lineHeight="16px"
      color="black"
      textTransform="uppercase"
      textAlign="center"
    >
      {children}
    </Text>
    {isSortable && (
      <Box marginLeft={1}>
        {sortDirection === "asc" ? (
          <PiSortAscending size={16} />
        ) : (
          <PiSortDescending size={16} />
        )}
      </Box>
    )}
  </Flex>
);

const TableCell = ({ children, ...props }) => (
  <Text
    fontFamily="Karla Variable"
    fontWeight={700}
    fontSize="12px"
    lineHeight="16px"
    color="black"
    textAlign="center"
    {...props}
  >
    {children}
  </Text>
);

const StatusBadge = ({ status }) => {
  let bgGradient;
  let textColor = "black";

  switch (status) {
    case "Passed":
      bgGradient = "linear(to-r, #4CAF50, #8BC34A)";
      break;
    case "Failed":
      bgGradient = "linear(to-r, #FF5252, #FF8A80)";
      break;
    case "Not Attempted":
      bgGradient = "linear(to-r, #9E9E9E, #BDBDBD)";
      break;
    default:
      bgGradient = "linear(to-r, #FFD54F, #FFF176)";
  }

  return (
    <Box
      paddingLeft={2}
      paddingRight={2}
      paddingTop={0}
      paddingBottom={0}
      borderRadius="full"
      display="inline-block"
      alignSelf="center"
      border="1px solid black"
      bgGradient={bgGradient}
    >
      <Text fontSize="14px" fontWeight="500" color={textColor}>
        {status}
      </Text>
    </Box>
  );
};

const CustomProgressIndicator = ({ value }) => {
  const angle = (value / 100) * 360;
  const gradientColor =
    value < 50 ? "#ff4d4d" : value < 75 ? "#ffa700" : "#abf701";

  return (
    <Box position="relative" width="50px" height="50px">
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        borderRadius="50%"
        border="4px solid"
        borderColor="#E0E0E0"
      />
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        borderRadius="50%"
        border="4px solid"
        borderColor={gradientColor}
        clipPath={`polygon(50% 50%, 50% 0%, ${
          angle <= 180
            ? `${50 + 50 * Math.tan((angle * Math.PI) / 360)}% 0`
            : "100% 0"
        }, ${
          angle <= 90
            ? "50% 50%"
            : angle <= 180
            ? "100% 50%"
            : angle <= 270
            ? `100% ${
                50 + 50 * Math.tan(((angle - 180) * Math.PI) / 360)
              }%`
            : "50% 100%, 0 100%, 0 0, 50% 0"
        })`}
      />
      <Flex
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize="12px" fontWeight="bold">
          {value}%
        </Text>
      </Flex>
    </Box>
  );
};

const ProviderGroup = ({
  provider,
  exams,
  selectedRows,
  handleSelectRow,
  handleDeleteRow,
  handleSort,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  const toggleGroup = () => {
    setIsOpen(!isOpen);
    setHasInteracted(true);
  };

  return (
    <Box
      width="100%"
      backgroundColor="#f2f2f3"
      borderRadius="10px"
      border="1px solid black"
      position="relative"
      overflow="hidden"
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        padding={4}
        onClick={toggleGroup}
        cursor="pointer"
        backgroundColor="#e6f7f9"
        _hover={{ backgroundColor: "#d1f1f5" }}
      >
        <Text fontSize="18px" fontWeight="700" color="black">
          {provider}
        </Text>
        {isOpen ? (
          <IoChevronUp size={20} />
        ) : (
          <IoChevronDown size={20} />
        )}
      </Flex>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={hasInteracted ? { height: 0 } : false}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <VStack spacing={0} align="stretch">
              {exams.map((item, index) => (
                <Flex
                  key={item.id}
                  borderTop={index === 0 ? "1px solid #E2E8F0" : "none"}
                  borderBottom="1px solid #E2E8F0"
                  padding={4}
                  backgroundColor="white"
                  _hover={{ backgroundColor: "#f8f8f8" }}
                  transition="background-color 0.2s"
                  alignItems="center"
                >
                  <Box width="40px" textAlign="center">
                    <CustomCheckbox
                      isChecked={selectedRows.includes(item.id)}
                      onChange={() => handleSelectRow(item.id)}
                    />
                  </Box>
                  <Box flex={1}>
                    <TableCell>{item.exam}</TableCell>
                  </Box>
                  <Box flex={1}>
                    <TableCell>{item.examType}</TableCell>
                  </Box>
                  <Box flex={1}>
                    <TableCell>{item.attempts}</TableCell>
                  </Box>
                  <Box flex={1}>
                    <TableCell>{item.averageScore.toFixed(2)}%</TableCell>
                  </Box>
                  <Box flex={1} display="flex" justifyContent="center">
                    <CustomProgressIndicator value={item.progress} />
                  </Box>
                  <Box flex={1}>
                    <Flex direction="column" alignItems="center">
                      <TableCell>{`${item.latestGrade.score}/${item.latestGrade.total}`}</TableCell>
                      <Box marginTop={1}>
                        <StatusBadge status={item.status} />
                      </Box>
                    </Flex>
                  </Box>
                  <Box flex={1}>
                    <TableCell>{item.updated}</TableCell>
                  </Box>
                  <Box width="60px" textAlign="center">
                    <Popover placement="bottom-end">
                      <PopoverTrigger>
                        <Button variant="ghost" size="sm" padding={0}>
                          <BsThreeDotsVertical />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        width="auto"
                        border="1px solid black"
                        borderRadius="8px"
                        boxShadow="0 4px 0 0 black"
                      >
                        <PopoverBody padding={0}>
                          <Button
                            onClick={() => handleDeleteRow(item.id)}
                            width="100%"
                            justifyContent="flex-start"
                            fontWeight={700}
                            fontSize="14px"
                            color="black"
                            backgroundColor="white"
                            _hover={{ backgroundColor: "#f8f8f8" }}
                            borderRadius="8px"
                            padding={3}
                          >
                            Delete Row
                          </Button>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Box>
                </Flex>
              ))}
            </VStack>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

const CustomDashboardTableComponent = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "updated",
    direction: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Adjust as needed

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(mockData.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleDeleteSelected = () => {
    console.log("Delete selected rows:", selectedRows);
    // Implement delete logic here
  };

  const handleDeleteAll = () => {
    console.log("Delete all rows");
    // Implement delete all logic here
  };

  const handleDeleteRow = (id) => {
    console.log("Delete row:", id);
    // Implement delete row logic here
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    let sortableItems = [...mockData];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [sortConfig]);

  const groupedData = useMemo(() => {
    return sortedData.reduce((acc, item) => {
      if (!acc[item.provider]) {
        acc[item.provider] = [];
      }
      acc[item.provider].push(item);
      return acc;
    }, {});
  }, [sortedData]);

  const providerList = Object.keys(groupedData);
  const totalPages = Math.ceil(providerList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProviderList = providerList.slice(startIndex, endIndex);

  return (
    <Box
      borderRadius="12px"
      border="1px solid black"
      padding={6}
      overflowY="scroll"
      maxHeight="600px" // Adjust as needed
    >
      <Flex justifyContent="space-between" alignItems="center" marginBottom={4}>
        <Text
          fontFamily="Karla Variable"
          fontWeight={700}
          fontSize="16px"
          lineHeight="24px"
          color="black"
        >
          Your Exam Progress
        </Text>
        <Flex>
          <CustomButton
            onClick={handleDeleteSelected}
            backgroundColor="transparent"
            hoverBackgroundColor="#FFE5E5"
            borderColor="#FF3333"
            marginRight={4}
            isDisabled={selectedRows.length === 0}
          >
            Delete Selected
          </CustomButton>
          <CustomButton
            onClick={handleDeleteAll}
            backgroundColor="#FF3333"
            hoverBackgroundColor="#FF0000"
          >
            Delete All
          </CustomButton>
        </Flex>
      </Flex>
      <Box
        borderRadius="12px"
        border="1px solid black"
        boxShadow="0 4px 0 0 black"
        overflow="hidden"
      >
        <Box overflowX="auto">
          <Box minWidth="1200px">
            {/* Table Header */}
            <Flex
              backgroundColor="#f2f2f3"
              borderBottom="1px solid black"
              padding={4}
              alignItems="center"
            >
              <Box width="40px" textAlign="center">
                <CustomCheckbox
                  isChecked={selectAll}
                  onChange={handleSelectAll}
                />
              </Box>
              <Box flex={1}>
                <TableHeader>Exam</TableHeader>
              </Box>
              <Box flex={1}>
                <TableHeader>Type</TableHeader>
              </Box>
              <Box flex={1}>
                <TableHeader>Attempts</TableHeader>
              </Box>
              <Box flex={1}>
                <TableHeader>Avg. Score</TableHeader>
              </Box>
              <Box flex={1}>
                <TableHeader>Progress</TableHeader>
              </Box>
              <Box flex={1}>
                <TableHeader>Latest Grade</TableHeader>
              </Box>
              <Box flex={1}>
                <TableHeader
                  isSortable
                  onClick={() => handleSort("updated")}
                  sortDirection={
                    sortConfig.key === "updated"
                      ? sortConfig.direction
                      : undefined
                  }
                >
                  Updated
                </TableHeader>
              </Box>
              <Box width="60px">
                <TableHeader>Actions</TableHeader>
              </Box>
            </Flex>
            {/* Table Body */}
            {paginatedProviderList.map((provider) => (
              <ProviderGroup
                key={provider}
                provider={provider}
                exams={groupedData[provider]}
                selectedRows={selectedRows}
                handleSelectRow={handleSelectRow}
                handleDeleteRow={handleDeleteRow}
                handleSort={handleSort}
              />
            ))}
          </Box>
        </Box>
      </Box>
      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </Box>
  );
};

const CustomDashboardTable = React.memo(CustomDashboardTableComponent);
export { CustomDashboardTable as default };
