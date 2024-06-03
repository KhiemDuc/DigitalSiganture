import { Typography, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CardCustom from "../../components/CardCustom";
import { useEffect } from "react";
import CertificateService from "../../services/certificate.service";
import { useState } from "react";

const data = [
  {
    id: 1,
    name: "Chứng thư số",
    status: "Đã xác thực",
    date: "2021-09-01",
  },
  {
    id: 2,
    name: "Chữ ký số",
    status: "Đang chờ xác thực",
    date: "2022-09-01",
  },
  {
    id: 3,
    name: "Chữ ký số",
    status: "Từ chối",
    date: "2023-09-01",
  },
  {
    id: 4,
    name: "Chữ ký số",
    status: "Từ chối",
    date: "2023-09-01",
  },
  {
    id: 5,
    name: "Chữ ký số",
    status: "Từ chối",
    date: "2023-09-01",
  },
];

const rejectColorRed =
  "rgba(255, 0, 0, 0.3) 5px 5px, rgba(255, 0, 0, 0.2) 10px 10px";
const pendingColor =
  "rgba(255, 165, 0, 0.3) 5px 5px, rgba(255, 140, 0, 0.2) 10px 10px";
const doneColor =
  "rgba(0, 128, 0, 0.3) 5px 5px, rgba(0, 128, 0, 0.2) 10px 10px";

function RequestTicket() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    CertificateService.myRequest()
      .then((response) => {
        console.log(response.data.data);
        setRequests(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const rejectItems = requests.filter((item) => item.status === "REJECTED");
  const pendingItems = requests.filter((item) => item.status === "PENDING");
  console.log(pendingItems);
  const doneItems = requests.filter((item) => item.status === "SUCCESS");

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <Grid container spacing={1} minHeight={160}>
        <Grid
          xs
          display="flex"
          justifyContent="flex-start"
          alignItems="start"
          flexDirection={"column"}
          gap={4}
        >
          <Typography variant="h6" fontSize={"16px"} fontWeight={"600"}>
            Đang yêu cầu
          </Typography>
          {pendingItems.map((item) => {
            return (
              <CardCustom
                key={item.id}
                date={item.date}
                status={item.status}
                boxShadow={pendingColor}
                isExtend={item.isExtend}
                item={item}
              ></CardCustom>
            );
          })}
        </Grid>
        <Grid
          xs
          display="flex"
          justifyContent="flex-start"
          alignItems="start"
          flexDirection={"column"}
          gap={4}
        >
          <Typography variant="h6" fontSize={"16px"} fontWeight={"600"}>
            Thành công
          </Typography>
          {doneItems.map((item) => {
            return (
              <CardCustom
                key={item.id}
                date={item.date}
                status={item.status}
                boxShadow={doneColor}
                isExtend={item.isExtend}
                item={item}
              ></CardCustom>
            );
          })}
        </Grid>
        <Grid
          xs
          display="flex"
          justifyContent="flex-start"
          alignItems="start"
          flexDirection={"column"}
          gap={4}
        >
          <Typography variant="h6" fontSize={"16px"} fontWeight={"600"}>
            Từ chối
          </Typography>
          {rejectItems.map((item) => {
            return (
              <CardCustom
                key={item.id}
                date={item.date}
                status={item.status}
                boxShadow={rejectColorRed}
                isExtend={item.isExtend}
                item={item}
              ></CardCustom>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
}

export default RequestTicket;
