import axios from "../../setup/axios";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import forge from "node-forge";
import { Button } from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { saveAs } from "file-saver";
import SearchInput from "../SearchInput/SearchInput";

function DataTable({ rows }) {
  const [filteredRows, setFilteredRows] = React.useState([]);
  const columns = [
    {
      field: "id",
      headerName: "ID Chứng chỉ",
      width: 220,
      valueGetter: (value, row) => `${row._id || ""}`,
      sx: {
        padding: "1rem !important",
      },
    },

    {
      field: "userId",
      headerName: "ID người dùng",
      width: 220,
    },

    { field: "userName", headerName: "Tài khoản", width: 140 },

    {
      field: "iAt",
      headerName: "Tạo ngày",
      width: 100,
      valueGetter: (values, row) => {
        const date = new Date(row.iAt);
        return date.toLocaleDateString("vi-VN");
      },
    },
    {
      field: "endDate",
      headerName: "Hết hạn ngày",
      width: 100,
      valueGetter: (values, row) => {
        let certificate;
        try {
          //   Parse the PEM data and extract the certificate details
          certificate = forge.pki.certificateFromPem(row.certPem);
        } catch (error) {
          console.log(error);
        }
        const date = new Date(certificate?.validity.notAfter);
        return date.toLocaleDateString("vi-VN");
      },
    },
    {
      field: "certPem",
      headerName: "Chứng chỉ số",
      width: 130,
    },
    {
      field: "activiti",
      headerName: "Hành động",
      width: 190,
      renderCell: (values, row) => {
        return (
          <Button variant="outlined" startIcon={<DeleteIcon />}>
            Huỷ chứng chỉ
          </Button>
        );
      },
    },
    {
      field: "download",
      headerName: "Tải xuống chứng chỉ",
      width: 160,
      renderCell: (values, row) => {
        return (
          <Button
            variant="outlined"
            startIcon={<SaveAltIcon />}
            onClick={() => {
              downloadCert(values.row?.certPem, values.row?.userName);
            }}
          >
            Tải xuống
          </Button>
        );
      },
    },
  ];
  const downloadCert = (pem, nameOfFile) => {
    const fileName = `${nameOfFile}_cert.crt`;
    const certificate = forge.pki.certificateFromPem(pem);

    const der = forge.asn1
      .toDer(forge.pki.certificateToAsn1(certificate))
      .getBytes();

    const blob = new Blob(
      [new Uint8Array(der.split("").map((c) => c.charCodeAt(0)))],
      {
        type: "application/x-x509-ca-cert;charset=utf-8",
      }
    );
    saveAs(blob, fileName);
  };

  const handleSearch = (value) => {
    const filteredRows = rows.filter((row) => {
      return row.userName.toLowerCase().includes(value.toLowerCase());
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
        gap: "1rem",
        padding: "1rem 1rem 0 1rem",
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
        disableRowSelectionOnClick
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
const CertiList = () => {
  const [certificates, setCertificates] = React.useState([]);
  useEffect(() => {
    axios.get("/ca/certificate").then((res) => {
      setCertificates(res.data.data);
    });
  }, []);
  return (
    <div>
      <DataTable rows={certificates} />
    </div>
  );
};
export default CertiList;
