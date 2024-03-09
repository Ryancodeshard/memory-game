import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { userStore } from "../../../../store/userStore";
import { useEffect, useState } from "react";
import { Select } from "@chakra-ui/react";

const StatChart = () => {
  const { leaderboard } = userStore();
  const uniqueNames = Array.from(
    new Set(leaderboard.map((item) => item.username))
  );
  const [username, setName] = useState("");
  const [data, setData] = useState<{}[]>([]);
  useEffect(() => {
    const filteredData = leaderboard
      .filter((item) => item.username === username)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    setData(filteredData);
  }, [username]);

  return (
    <>
      {leaderboard.length === 0 ? (
        <div className="game-text">No data to show</div>
      ) : (
        <>
          <Select
            width={"350px"}
            value={username}
            placeholder="Name to filter"
            onChange={(e) => {
              setName(e.target.value);
            }}
          >
            {uniqueNames.map((username, i) => (
              <option style={{ width: "100px" }} key={i} value={username}>
                {username}
              </option>
            ))}
          </Select>
          <LineChart
            style={{ width: "100%", height: "100%" }}
            width={350}
            height={600}
            data={data}
          >
            <Line type="monotone" dataKey="score" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis dataKey="score" />
          </LineChart>
        </>
      )}
    </>
  );
};

export { StatChart };
