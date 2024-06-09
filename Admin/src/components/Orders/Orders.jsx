import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getListRequests } from "../../service/certificate";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import SearchInput from "../SearchInput/SearchInput";
import ReactSelect from "react-select";
const StyledTableRow = styled(TableRow)(() => ({
  "&:hover": {
    backgroundColor: "#ccc",
  },
  userSelect: "none",
}));

export default function Orders() {
  const [requests, setReuests] = React.useState([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    getListRequests().then((response) => {
      setReuests(response.data.data);
    });
  }, []);
  const hanldeOpenModal = (request) => {
    navigate(`/admin/orders/${request._id}`, { state: request });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem 1rem 0rem 1rem",
      }}
    >
      <div
        style={{
          alignSelf: "flex-end",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "50%",
        }}
      >
        <ReactSelect
          styles={{
            control: (styles) => ({
              ...styles,
              width: "200px",
              height: "100%",
              boxShadow: "1px 1px 1px 1px #ccc",
            }),
          }}
          placeholder="Lọc theo gói"
          options={requests.map((request) => ({
            label:
              request.subscription?.charAt(0).toUpperCase() +
              request.subscription?.slice(1),
            value: request.subscription,
          }))}
          isMulti
        ></ReactSelect>
        <SearchInput></SearchInput>
      </div>
      <Table
        size="small"
        sx={{
          border: "1px solid #ccc",
          overflow: "hidden",
        }}
      >
        <TableHead
          sx={{
            backgroundColor: "#fff",
            height: "56px",
          }}
        >
          <TableRow>
            <TableCell>Họ Tên</TableCell>
            <TableCell>Địa chỉ</TableCell>
            <TableCell>CCCD</TableCell>
            <TableCell>Giới tính</TableCell>
            <TableCell>Loại</TableCell>
            <TableCell>Gói</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((row) => (
            <StyledTableRow key={row._id} onClick={() => hanldeOpenModal(row)}>
              <TableCell>{row.lastName + " " + row.firstName}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.IdNum}</TableCell>
              <TableCell>
                {row?.gender === "Male"
                  ? "Nam"
                  : row?.gender === "Female"
                  ? "Nữ"
                  : "N/A"}
              </TableCell>
              <TableCell>
                {row.isExtend ? "Gia hạn/cấp đổi" : "Cấp mới"}
              </TableCell>
              <TableCell>
                {row.subscription?.charAt(0).toUpperCase() +
                  row.subscription?.slice(1)}
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
