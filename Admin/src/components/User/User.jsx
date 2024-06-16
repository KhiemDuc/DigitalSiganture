import { useEffect } from "react";
import axios from "../../setup/axios";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";
import SearchInput from "../SearchInput/SearchInput";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Button } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { toggleLockUser } from "../../service/user";

function DataTable() {
  const [rows, setRows] = React.useState([]);
  useEffect(() => {
    axios
      .get("/ca/user")
      .then((res) => {
        setRows(res.data.data);
        setFilteredRows(res.data.data);
      })
      .catch((err) => {});
  }, []);
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
    {
      field: "activiti",
      headerName: "Khoá tài khoản",
      width: 150,
      renderCell: (values, row) => {
        return (
          <Button
            variant="outlined"
            onClick={() => {
              toggleLockUser(values.row._id)
                .then((res) => {
                  const newRows = filteredRows.map((row) => {
                    if (row._id === values.row._id) {
                      return { ...row, isLocked: !row.isLocked };
                    }
                    return row;
                  });
                  setFilteredRows(newRows);
                })
                .catch((err) => {});
            }}
            startIcon={!values.row.isLocked ? <LockOpenIcon /> : <LockIcon />}
          >
            {!values.row.isLocked ? "Khoá" : "Mở khoá"}
          </Button>
        );
      },
    },
  ];

  const handleSearch = (value) => {
    if (!value) {
      setFilteredRows(rows);
      return;
    }
    const filteredRows = rows.filter((row) => {
      return (
        row.userName.toLowerCase().includes(value.toLowerCase()) ||
        row.userInfo.lastName.toLowerCase().includes(value.toLowerCase()) ||
        row.userInfo.firstName.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredRows(filteredRows);
  };

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
  return (
    <>
      <DataTable></DataTable>
    </>
  );
};

export default UserList;
