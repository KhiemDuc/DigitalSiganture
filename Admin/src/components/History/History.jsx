import axios from "../../setup/axios";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import forge from "node-forge";
import { Button, Modal } from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { saveAs } from "file-saver";
import SearchInput from "../SearchInput/SearchInput";
import { deleteCert } from "../../service/certificate";
import ModalNoti from "../ModalNoti";
function DataTable({ rows }) {
  const [filteredRows, setFilteredRows] = React.useState([]);
  const [isDelete, setIsDelete] = React.useState(false);
  const [isShow, setIsShow] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [id, setId] = React.useState("");
  const handleOpenConfirm = () => {
    setIsModalOpen(true);
  };
  const handleCloseConfirm = () => {
    setIsModalOpen(false);
  };
  const handleSetID = (id) => {
    setId(id);
  };
  const handleDelete = async (id) => {
    try {
      const data = await deleteCert(id);
      if (data.status === 200) {
        const newRows = rows.filter((row) => row._id !== id);
        setFilteredRows(newRows);
        rows = newRows;
        setIsDelete(true);
      }
    } catch (err) {
      setIsDelete(false);
    }
    setIsShow(true);
  };
  const handleClose = () => {
    setIsShow(false);
  };
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
      <ModalNoti
        handleClose={handleClose}
        isDone={isDelete}
        show={isShow}
        content={
          isDelete ? "Huỷ chứng chỉ thành công" : "Huỷ chứng chỉ thất bại"
        }
        title={"Huỷ chứng chỉ"}
      ></ModalNoti>
      <Modal open={isModalOpen}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            backgroundColor: "white",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            gap: "1rem",
          }}
        >
          <div class="alert alert-info" role="alert">
            Bạn có chắc chắn muốn huỷ chứng chỉ này hay không
          </div>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                handleCloseConfirm();
                handleDelete(id);
              }}
            >
              Đồng ý
            </Button>
            <Button variant="outlined" onClick={handleCloseConfirm}>
              Huỷ
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
const History = () => {
  const [certificates, setCertificates] = React.useState([]);

  useEffect(() => {
    axios.get("/ca/history").then((res) => {
      setCertificates(res.data.data);
    });
  }, []);
  return (
    <div>
      <DataTable rows={certificates} />
    </div>
  );
};
export default History;
