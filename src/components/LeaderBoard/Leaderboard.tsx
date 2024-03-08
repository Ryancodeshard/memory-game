import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
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
} from "@chakra-ui/react";
import { userStore } from "../../store/userStore";

const Leaderboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { leaderboard } = userStore();
  return (
    <>
      <Button onClick={onOpen}>Leaderboard</Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Leaderboard</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table variant="striped" colorScheme="orange">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Highest Level</Th>
                    <Th>Time Taken</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {leaderboard.map((entry, i) => (
                    <Tr key={i}>
                      <Td>{entry.username}</Td>
                      <Td>{entry.score}</Td>
                      <Td>{entry.time}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export { Leaderboard };
