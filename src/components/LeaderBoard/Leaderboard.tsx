import {
  Button,
  Switch,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Spacer,
  IconButton,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { userStore } from "../../store/userStore";
import { useState } from "react";
import { StatChart } from "./components/StatChart";
import { RepeatIcon } from "@chakra-ui/icons";
import GlobalLeaderboard from "./components/GlobalLeaderboard";

const Leaderboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [statsMode, setStatsMode] = useState(false);
  const { resetLeaderboard, leaderboard } = userStore();

  const RowBased = () => {
    return (
      <TableContainer>
        <Table variant="striped" colorScheme="orange">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Highest Level</Th>
              <Th>Time Taken</Th>
              <Th>Date Acheived</Th>
            </Tr>
          </Thead>
          <Tbody>
            {leaderboard.map((entry, i) => (
              <Tr key={i}>
                <Td>{entry.username}</Td>
                <Td>{entry.score}</Td>
                <Td>{entry.time}</Td>
                <Td>{entry.date}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <>
      <Button onClick={onOpen}>Leaderboard</Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent style={{ padding: "10px" }}>
          <ModalHeader>Leaderboard</ModalHeader>
          <Tabs variant="soft-rounded" colorScheme="green">
            <TabList>
              <Tab>Local Leaderboard</Tab>
              <Tab>Global Leaderboard</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Flex padding={"0 20px"} alignItems={"center"}>
                  View Stats
                  <Switch
                    marginLeft={"5px"}
                    isChecked={statsMode}
                    onChange={() => setStatsMode((prev) => !prev)}
                  />
                  <Spacer />
                  <Button
                    colorScheme="red"
                    aria-label="wipe leaderboard"
                    onClick={() => resetLeaderboard()}
                    rightIcon={<RepeatIcon />}
                  >
                    Clear Data
                  </Button>
                </Flex>
                <ModalCloseButton />
                <ModalBody maxHeight={"80vh"} overflow={"scroll"}>
                  {statsMode ? <StatChart /> : <RowBased />}
                </ModalBody>
              </TabPanel>
              <TabPanel>
                <GlobalLeaderboard />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalContent>
      </Modal>
    </>
  );
};
export { Leaderboard };
