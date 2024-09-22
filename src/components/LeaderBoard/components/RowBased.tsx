import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import Player from "../../../interfaces/Player";

const RowBased = ({ leaderboard }: { leaderboard: Player[] }) => {
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
          {leaderboard.map((entry, i: number) => (
            <Tr key={i}>
              <Td>{entry.username}</Td>
              <Td>{entry.score}</Td>
              <Td>{entry.time}</Td>
              <Td>{entry.created_at?.toLocaleString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default RowBased;
