import { useEffect } from "react";
import axios from "../../setup/axios";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";
import SearchInput from "../SearchInput/SearchInput";

function DataTable({ rows }) {
  const [filteredRows, setFilteredRows] = React.useState([]);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 240,
      valueGetter: (value, row) => `${row._id || ""}`,
    },
    { field: "userName", headerName: "Tài khoản", width: 180 },
    {
      field: "avatar",
      headerName: "Ảnh đại diện",
      width: 100,
      renderCell: (values, row) => (
        <Avatar
          src={`http://localhost:8080/public/${values.row?.userInfo.avatar}`}
          style={{
            width: 35,
            height: 35,
            margin: "auto",
            marginTop: 10,
          }}
        />
      ),
    },
    {
      field: "createdAt",
      headerName: "Tạo ngày",
      width: 130,
      valueGetter: (values, row) => {
        const date = new Date(row.createdAt);
        return date.toLocaleDateString("vi-VN");
      },
    },
    {
      field: "subscription",
      headerName: "Gói đăng ký",
      width: 130,
      valueGetter: (values, row) => {
        return row.plan;
      },
    },
    {
      field: "gender",
      headerName: "Giới tính",
      width: 90,
      valueGetter: (values, row) => {
        return row?.userInfo.gender === "Male"
          ? "Nam"
          : row?.userInfo.gender === "Female"
          ? "Nữ"
          : "N/A";
      },
    },
    {
      field: "fullName",
      headerName: "Họ và tên",
      sortable: false,
      width: 160,
      valueGetter: (value, row) =>
        `${row?.userInfo.lastName || ""} ${row?.userInfo.firstName || ""}`,
    },
    {
      field: "verified",
      headerName: "Xác thực",
      width: 160,
      valueGetter: (value, row) =>
        row?.userInfo.verified ? "Đã xác thực ✔️" : "Chưa xác thực",
    },
  ];

  const handleSearch = (value) => {
    const filteredRows = rows.filter((row) => {
      return (
        row.userName.toLowerCase().includes(value.toLowerCase()) ||
        row.userInfo.lastName.toLowerCase().includes(value.toLowerCase()) ||
        row.userInfo.firstName.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredRows(filteredRows);
  };
  console.log(filteredRows.length == 0);

  return (
    <div
      style={{
        height: "calc(100vh - 64px)",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "1rem 1rem 0rem 1rem",

        justifyContent: "space-between",
        gap: "1rem",
      }}
    >
      <div
        style={{
          alignSelf: "flex-end",
        }}
      >
        <SearchInput handleSearch={handleSearch} />
      </div>
      <DataGrid
        rows={filteredRows.length != 0 ? filteredRows : rows}
        getRowId={(row) => row._id}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}

const UserList = () => {
  const [users, setUsers] = React.useState([]);
  useEffect(() => {
    axios
      .get("/ca/user")
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => {});
  }, []);
  return (
    <>
      <DataTable rows={users}></DataTable>
    </>
  );
};

export default UserList;
