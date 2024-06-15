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
import { PieChart } from "@mui/x-charts/PieChart";
import { pieArcLabelClasses } from "@mui/x-charts/PieChart";

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

  let groupedUsers = users.reduce((acc, user) => {
    if (!acc[user.plan]) {
      acc[user.plan] = 0;
    }
    acc[user.plan]++;
    return acc;
  }, {});

  console.log(groupedUsers);
  // Get the grouped data
  const groupedData = groupByDate(users);

  // Convert the result to an array of objects
  const result = Object.keys(groupedData).map((date) => {
    return { time: date, amount: groupedData[date] };
  });

  let colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // Mảng màu sắc cho các nhóm
  let i = 0;

  let data = Object.keys(groupedUsers).map((plan) => {
    return {
      label: plan,
      value: groupedUsers[plan],
      color: colors[i++ % colors.length], // Chọn màu sắc từ mảng 'colors', nếu hết màu thì quay lại từ đầu
    };
  });

  console.log(data);

  const sizing = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    legend: { hidden: true },
  };
  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  console.log(result);
  return (
    <React.Fragment>
      {/* <Toolbar /> */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={8}>
            <Grid item xs={12} md={8} lg={12}>
              <StatCards2 data={result} />
            </Grid>

            <Grid item xs={12} md={8} lg={12}>
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
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              sx={{
                p: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: 388,
              }}
            >
              Tỷ lệ người dùng theo gói
              <PieChart
                series={[
                  {
                    outerRadius: 100,
                    data,
                    arcLabel: getArcLabel,
                  },
                ]}
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fill: "white",
                    fontSize: 14,
                  },
                }}
                {...sizing}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                {data.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: item.color,
                        marginRight: "10px",
                      }}
                    ></div>
                    <div>
                      {item.label}: {item.value} user
                    </div>
                  </div>
                ))}
              </div>
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
