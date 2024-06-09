import axios from "../../setup/axios";
import { useEffect } from "react";
import { Table, TableBody, TableCell } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SearchInput from "../SearchInput/SearchInput";

const StyledTableRow = styled(TableRow)(() => ({
  "&:hover": {
    backgroundColor: "#ccc",
  },
  userSelect: "none",
}));

const Plan = () => {
  const [plans, setPlans] = React.useState([]);
  const [filteredPlans, setFilteredPlans] = React.useState([]);
  useEffect(() => {
    axios.get("/plan").then((res) => {
      setPlans(res.data.data);
      setFilteredPlans(res.data.data);
    });
  }, []);
  const handleSearch = (value) => {
    if (value === "") return setFilteredPlans(plans);
    const filteredRows = plans.filter((row) => {
      return (
        row._id.includes(value) ||
        row.name.toLowerCase().includes(value.toLowerCase()) ||
        row.description.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredPlans(filteredRows);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div
        style={{
          margin: "1rem 1rem 0 1rem",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Button variant="outlined" startIcon={<AddIcon />}>
          Thêm gói
        </Button>
        <SearchInput handleSearch={handleSearch} />
      </div>
      <div
        style={{
          padding: "0 1rem 1rem 1rem",
        }}
      >
        <Table
          size="small"
          sx={{
            border: "1px solid #ccc",
            borderRadius: "15px",
          }}
        >
          <TableHead
            sx={{
              backgroundColor: "#fff",
              height: "56px",
            }}
          >
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Loại</TableCell>
              <TableCell>Tên gói</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Tier</TableCell>
              <TableCell>Hành động</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPlans.map((row) => (
              <StyledTableRow key={row._id}>
                <TableCell>{row._id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.price.toLocaleString("de-DE")} VND</TableCell>
                <TableCell>{row.tier}</TableCell>
                <TableCell>
                  <Button variant="outlined" startIcon={<EditIcon />}>
                    Sửa
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" startIcon={<DeleteIcon />}>
                    Xoá
                  </Button>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default Plan;
