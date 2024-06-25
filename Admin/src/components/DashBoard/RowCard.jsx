import { ExpandLess, TrendingUp, TrendingDown } from "@mui/icons-material";
import { Card, Fab, Grid, Typography, styled } from "@mui/material";
import axios from "../../setup/axios";
import React, { useEffect } from "react";
import Stack from "@mui/material/Stack";
import { Gauge } from "@mui/x-charts/Gauge";

// STYLED COMPONENTS
const ContentBox = styled("div")(() => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "10px",
}));

const FabIcon = styled(Fab)(() => ({
  width: "44px !important",
  height: "44px !important",
  boxShadow: "none !important",
}));

const H3 = styled("h3")(() => ({
  margin: 0,
  fontWeight: "500",
  marginLeft: "12px",
}));

const H1 = styled("h1")(({ theme }) => ({
  margin: 0,
  flexGrow: 1,
  color: theme.palette.text.secondary,
}));

const Span = styled("span")(() => ({
  fontSize: "13px",
  marginLeft: "4px",
}));

const IconBox = styled("div")(() => ({
  width: 16,
  height: 16,
  color: "#fff",
  display: "flex",
  overflow: "hidden",
  borderRadius: "300px ",
  justifyContent: "center",
  "& .icon": { fontSize: "14px" },
}));

export default function StatCards2({ data, usersData }) {
  const today = new Date().toISOString().split("T")[0];

  const todayData = data?.find((item) => {
    const itemDate = new Date(item.time).toISOString().split("T")[0];
    return itemDate === today;
  });
  const yesterdayData = data?.find((item) => {
    const itemDate = new Date(item.time).toISOString().split("T")[0];
    return (
      itemDate ===
      new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .split("T")[0]
    );
  });

  const todayDataAmount = todayData?.amount ? todayData?.amount : 0;
  const yesterdayDataAmount = yesterdayData?.amount ? yesterdayData?.amount : 0;
  const isIncrease = todayDataAmount > yesterdayDataAmount;
  const perCent =
    ((todayDataAmount - yesterdayDataAmount) / yesterdayDataAmount) * 100;

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} md={6}>
        <Card
          elevation={3}
          sx={{ p: 2 }}
          style={{
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
            borderRadius: "8px",
          }}
        >
          <ContentBox>
            <FabIcon
              size="medium"
              sx={{ background: "rgba(9, 182, 109, 0.15)" }}
            >
              <TrendingUp color="success" />
            </FabIcon>

            <Typography color="#08ad6c">
              Số lượng User tăng lên trong ngày
            </Typography>
          </ContentBox>

          <ContentBox sx={{ pt: 2 }}>
            <Typography variant="h5">
              {todayData?.amount ? todayData?.amount : 0}
            </Typography>

            <IconBox sx={{ backgroundColor: "success.main" }}>
              <ExpandLess className="icon" />
            </IconBox>

            <Span color="#08ad6c">{perCent}%</Span>
          </ContentBox>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography color="#1976d2">User đã xác thực</Typography>
            <Gauge
              width={100}
              height={100}
              value={usersData}
              startAngle={-90}
              endAngle={90}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography>User chưa xác thực</Typography>
            <Gauge
              width={100}
              height={100}
              value={60}
              startAngle={-90}
              endAngle={90}
            />
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
