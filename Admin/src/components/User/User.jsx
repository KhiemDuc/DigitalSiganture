import { useEffect } from "react";
import axios from "../../setup/axios";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";
import Title from "../Title/Title";

function DataTable({ rows }) {
  const [plan, setPlan] = React.useState([]);
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
          src={`http://localhost:8081/public/${values.row?.userInfo.avatar}`}
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
        const id = row.subscription;
        console.log(id);
        console.log(plan);
        const planName = plan.find((p) => p._id === id)?.description;
        console.log(planName);
        return planName;
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
  useEffect(() => {
    axios.get("/plan").then((res) => {
      setPlan(res.data.data);
    });
  }, []);
  return (
    <div style={{ height: "calc(100vh - 64px)", width: "100%" }}>
      <DataGrid
        rows={rows}
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
      <DataTable rows={users}></DataTable>;
    </>
  );
};

export default UserList;
