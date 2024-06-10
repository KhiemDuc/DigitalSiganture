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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchInput from "../SearchInput/SearchInput";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddIcon from "@mui/icons-material/Add";

const StyledTableRow = styled(TableRow)(() => ({
  "&:hover": {
    backgroundColor: "#ccc",
  },
  userSelect: "none",
}));

const Plan = () => {
  const [plans, setPlans] = React.useState([]);
  const [filteredPlans, setFilteredPlans] = React.useState([]);
  const [openIds, setOpenIds] = useState([]);
  const [benefits, setBenefits] = useState([""]);

  const handleBenefitChange = (e, index) => {
    const newBenefits = [...benefits];
    newBenefits[index] = e.target.value;
    setBenefits(newBenefits);
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, ""]);
  };
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleOpen = (id) => {
    setOpenIds(
      openIds.includes(id)
        ? openIds.filter((openId) => openId !== id)
        : [...openIds, id]
    );
  };
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
  const handleRemoveBenefit = (index) => {
    if (benefits.length === 1) return;
    const newBenefits = [...benefits];
    newBenefits.splice(index, 1);
    setBenefits(newBenefits);
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
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => handleOpenModal()}
        >
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
              <TableCell />
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
              <>
                <StyledTableRow key={row._id}>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => handleOpen(row._id)}
                    >
                      {openIds.includes(row._id) ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
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
                <TableRow key={`${row._id} small`}>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse
                      in={openIds.includes(row._id)}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box sx={{ margin: 1 }}>
                        <Typography
                          variant="h7"
                          gutterBottom
                          component="div"
                          fontWeight={"bold"}
                        >
                          Lợi ích
                        </Typography>
                        <Table size="small" aria-label="purchases">
                          <TableBody>
                            {row.benefits.map((benefit, index) => (
                              <TableRow
                                key={{
                                  index,
                                }}
                              >
                                <TableCell>{benefit}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>

        {/* Modal */}
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
              padding: " 1rem 2rem",
              borderRadius: "10px",
              gap: "0.5rem",
              width: "600px",
            }}
          >
            <IconButton
              aria-label="expand row"
              size="small"
              style={{ alignSelf: "flex-end" }}
              onClick={() => handleClose()}
            >
              <CloseIcon />
            </IconButton>
            <div class="form-group w-100">
              <label for="exampleInputEmail1">Tên gói: </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Nhập tên gói"
              />
            </div>
            <div class="form-group w-100">
              <label for="exampleInputEmail1">Mô tả:</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Nhập mô tả"
              />
            </div>
            <div class="form-group w-100">
              <label for="exampleInputEmail1">Giá:</label>
              <input
                type="number"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Nhập giá tiền"
              />
            </div>
            <div class="form-group w-100">
              <label for="exampleInputEmail1">Tier:</label>
              <input
                type="number"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Tier .."
              />
            </div>
            <div
              class="form-group w-100"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <div
                className="w-100"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label>Lợi ích:</label>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => handleAddBenefit()}
                >
                  <AddCircleOutlineIcon
                    sx={{
                      fontSize: "1rem",
                    }}
                  />
                </IconButton>
              </div>
              {benefits.map((benefit, index) => (
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <input
                    type="text"
                    class="form-control"
                    id={index}
                    aria-describedby="emailHelp"
                    placeholder="Nhập lợi ích"
                  />
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => handleRemoveBenefit(index)}
                    sx={{
                      position: "absolute",
                      right: "0",
                      top: "5px",
                    }}
                  >
                    <RemoveCircleOutlineIcon
                      sx={{
                        fontSize: "1rem",
                      }}
                    />
                  </IconButton>
                </div>
              ))}
            </div>

            <Button
              variant="outlined"
              href="#outlined-buttons"
              sx={{
                marginTop: "1rem",
                alignSelf: "flex-end",
              }}
            >
              Thêm gói
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};
export default Plan;
