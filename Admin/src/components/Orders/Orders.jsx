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
import { addDays } from "date-fns";
import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";

const StyledTableRow = styled(TableRow)(() => ({
  "&:hover": {
    backgroundColor: "#ccc",
  },
  userSelect: "none",
}));

export default function Orders() {
  const [requests, setReuests] = React.useState([]);
  const [filteredRows, setFilteredRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleChangeMul = (op) => {
    if (op.length === 0) return setFilteredRows(requests);
    let opValues = op.map((o) => o.value);
    console.log(opValues);
    setFilteredRows(
      filteredRows.filter((row) => opValues.includes(row.subscription))
    );
  };
  const handleChange = (option) => {
    if (option == "new") {
      setFilteredRows(
        requests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } else {
      setFilteredRows(
        requests.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      );
    }
  };

  const handleSearch = (value) => {
    if (value === "") {
      setFilteredRows(requests);
    }
    const filteredRows = requests.filter((row) => {
      return (
        row.firstName.toLowerCase().includes(value.toLowerCase()) ||
        row.lastName.toLowerCase().includes(value.toLowerCase())
      );
    });
    console.log(filteredRows);
    setFilteredRows(filteredRows);
  };

  const handleFilter = () => {
    const filteredRows = requests.filter((row) => {
      return row.subscription.toLowerCase().includes(value.toLowerCase());
    });
    console.log(filteredRows);
    setFilteredRows(filteredRows);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date()),
      key: "selection",
    },
  ]);
  const navigate = useNavigate();
  React.useEffect(() => {
    getListRequests().then((response) => {
      setReuests(response.data.data);
      setFilteredRows(response.data.data);
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
      <Modal open={open} onClose={handleClose}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: 24,
            pt: 2,
            px: 4,
            pb: 3,
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              alignSelf: "flex-end",
            }}
          >
            <IconButton
              aria-label="CloseIcon"
              onClick={() => {
                handleClose();
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <DateRangePicker
            onChange={(item) => setState([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={state}
            direction="horizontal"
          />
          <div
            style={{
              alignSelf: "flex-end",
            }}
          >
            <Button variant="outlined">Xác Nhận</Button>
          </div>
        </div>
      </Modal>
      <div
        style={{
          alignSelf: "flex-end",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Button
          color="primary"
          endIcon={<InsertInvitationIcon />}
          onClick={handleOpen}
          sx={{
            border: "1px solid #ccc",
            boxShadow: "1px 1px 1px 1px #ccc",
            color: "hsl(0, 0%, 50%)",
          }}
        >
          Lọc theo ngày
        </Button>
        <ReactSelect
          styles={{
            control: (styles) => ({
              ...styles,
              width: "200px",
              height: "100%",
              boxShadow: "1px 1px 1px 1px #ccc",
            }),
          }}
          placeholder="Sắp xếp theo ngày"
          options={[
            { label: "Ngày mới nhất", value: "new" },
            { label: "Ngày cũ nhất", value: "old" },
          ]}
          onChange={handleChange}
        ></ReactSelect>

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
          onChange={handleChangeMul}
        ></ReactSelect>

        <SearchInput handleSearch={handleSearch}></SearchInput>
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
          {filteredRows.map((row) => (
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
