import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./../Title/Title";
import { getListRequests } from "../../service/certificate";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
const StyledTableRow = styled(TableRow)(() => ({
  "&:hover": {
    backgroundColor: "#ccc",
  },
  userSelect: "none",
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function Orders() {
  const [requests, setReuests] = React.useState([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    getListRequests().then((response) => {
      console.log(response);
      setReuests(response.data.data);
    });
  }, []);
  const hanldeOpenModal = (request) => {
    navigate(`/admin/orders/${request._id}`, { state: request });
  };
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Họ Tên</TableCell>
            <TableCell>Địa chỉ</TableCell>
            <TableCell>CCCD</TableCell>
            <TableCell>Giới tính</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((row) => (
            <StyledTableRow key={row._id} onClick={() => hanldeOpenModal(row)}>
              <TableCell>{row.firstName + " " + row.lastName}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.IdNum}</TableCell>
              <TableCell>
                {row.gender === "Male"
                  ? "Nam"
                  : gender === "Female"
                  ? "Nữ"
                  : "N/A"}
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
