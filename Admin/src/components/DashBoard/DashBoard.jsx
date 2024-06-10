import * as React from "react";
import { createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "../Chart/Chart";
import Deposits from "../Deposits/Deposits";
import Orders from "../Orders/Orders";
import StatCards2 from "./RowCard";
import axios from "../../setup/axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/ca/user")
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => {});
  }, []);

  const groupByDate = (data) => {
    return data.reduce((acc, current) => {
      const date = current.createdAt.split("T")[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date]++;
      return acc;
    }, {});
  };

  // Get the grouped data
  const groupedData = groupByDate(users);

  // Convert the result to an array of objects
  const result = Object.keys(groupedData).map((date) => {
    return { time: date, amount: groupedData[date] };
  });

  console.log(result);
  return (
    <React.Fragment>
      {/* <Toolbar /> */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}

          <Grid item xs={12} md={8} lg={9}>
            <StatCards2 data={result} />
          </Grid>

          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <Chart data={result} />
            </Paper>
          </Grid>

          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <Deposits />
            </Paper>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Orders />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
