import { Avatar, Button, Modal } from "@mui/material";

const ModalNoti = ({ show, handleClose, isDone, title, content }) => {
  return (
    <Modal open={show} onClose={handleClose}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
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
        <Avatar
          style={{ width: "100px", height: "100px" }}
          src={
            isDone
              ? "../../../src/assets/images/success.png"
              : "../../../src/assets/images/remove.png"
          }
        />
        <div>
          <h2>{title}</h2>
          <p>{content}</p>
        </div>
        <Button variant="outlined" onClick={handleClose}>
          Đóng
        </Button>
      </div>
    </Modal>
  );
};
export default ModalNoti;
