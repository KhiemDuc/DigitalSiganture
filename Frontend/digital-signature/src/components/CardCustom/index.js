import * as React from "react";
import Box from "@mui/material/Box";
import { useState } from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const CardCustom = ({ date, status, boxShadow, isExtend, item }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showFullKey, setShowFullKey] = useState(false);
  return (
    <Box
      className="card-show"
      sx={{
        maxWidth: 330,
        border: "1px solid #e3dbdb",
        borderRadius: "15px",
        width: "100%",
        boxShadow: boxShadow,
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Vé yêu cầu
        </Typography>
        <Typography variant="h5" component="div">
          {isExtend ? "Gia hạn chứng chỉ số" : "Cấp chứng chỉ số"}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {status}
        </Typography>
        <Typography variant="body2">
          <br />
          {date}
        </Typography>
      </CardContent>
      <CardActions className="card-show--action">
        <Button
          sx={{ width: "100%" }}
          size="small"
          onClick={() => {
            handleOpen();
          }}
        >
          Xem chi tiết vé yêu cầu
        </Button>
      </CardActions>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "1px solid #ccc",
            boxShadow: 24,
            p: 4,
            width: "50%",
            borderRadius: "15px",
          }}
        >
          <Typography id="modal-modal-title" variant="bold" component="h2">
            Chi tiết vé yêu cầu
          </Typography>
          <Box
            sx={{
              marginTop: "20px",
            }}
          >
            {item?.firstName && item?.lastName && (
              <p>
                Họ và tên: {item?.firstName} {item?.lastName}
              </p>
            )}
            {item?.dateOfBirth && (
              <p>
                Ngày sinh:{" "}
                {item?.dateOfBirth &&
                  new Date(item.dateOfBirth).toLocaleDateString("vi-VN")}
              </p>
            )}
            {item?.gender && <p>Giới tính: {item?.gender}</p>}
            {item?.nationality && <p>Quốc tịch: {item?.nationality}</p>}
            {item?.address && <p>Địa chỉ: {item?.address}</p>}
            {item?.email && <p>Email: {item?.email}</p>}
            {item?.phone && <p>Số điện thoại: {item?.phone}</p>}
            {item?.IdNum && <p>Căn cước công dân: {item?.IdNum}</p>}
            {item?.publicKey && (
              <p
                className="w-100"
                style={{ wordBreak: "break-all" }}
                title={item?.publicKey}
              >
                Khoá công khai:{" "}
                {showFullKey
                  ? item?.publicKey
                  : item?.publicKey.substring(0, 50)}{" "}
                {item?.publicKey.length > 50 && (
                  <span
                    style={{
                      width: "wrap-content",
                      color: "black",
                      cursor: "pointer",
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                    onClick={() => setShowFullKey(!showFullKey)}
                  >
                    {showFullKey ? "Ẩn bớt" : "Xem thêm"}
                  </span>
                )}
              </p>
            )}
            {item?.status && (
              <p
                style={{
                  color:
                    item.status === "SUCCESS"
                      ? "green"
                      : item.status === "PENDING"
                      ? "#f9b23d"
                      : item.status === "REJECTED"
                      ? "red"
                      : "black",
                }}
              >
                Trạng thái: {item?.status}
              </p>
            )}
            {item?.rejectedReason && (
              <p>Lý do từ chối: {item?.rejectedReason}</p>
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default CardCustom;
