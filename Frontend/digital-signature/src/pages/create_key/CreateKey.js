import Layout from "../../components/Layout";
import { TextField, TextareaAutosize, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useNavigate } from "react-router-dom";

const CreateKey = () => {
  const [showPassword, setShowPassword] = React.useState(true);
  const [privateKey, setPrivateKey] = React.useState("văn ải chỉa");
  const [publicKey, setPublicKey] = React.useState("test");
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Layout
      heading={"Tạo cặp khoá"}
      subheading={
        "Gồm khoá công khai và bảo mật, khoá bảo mật chính là chữ ký số của bạn, hay bảo quản cẩn thận"
      }
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <button className="btn btn-primary">Tạo cặp khoá</button>
        <div
          style={{
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
            width: "50%",
            flexDirection: "column",
          }}
        >
          <h5
            style={{
              alignSelf: "flex-start",
            }}
          >
            Khoá công khai
          </h5>
          <div
            style={{
              width: "100%",
              height: "130px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              boxShadow: "5px 5px 5px #d1c1f1",
              padding: "5px",
              outline: "none",
              resize: "none",
              position: "relative",
            }}
          >
            <textarea
              readOnly={true}
              style={{
                width: "100%",
                height: "100%",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                outline: "none",
                resize: "none",
              }}
              value={publicKey}
            ></textarea>
            <Tooltip
              sx={{
                marginLeft: "16px",
              }}
              title="Sao chép!"
            >
              <IconButton
                aria-label="delete"
                color="#ccc"
                sx={{
                  position: "absolute",
                  alignSelf: "flex-end",
                  right: 0,
                }}
                onClick={() => {
                  navigator.clipboard.writeText(publicKey);
                }}
              >
                <ContentCopyIcon fontSize="10px" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div
          style={{
            width: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <h5>Khoá bí mật</h5>
          </div>
          <div
            style={{
              width: "100%",
              height: "200px",
              position: "relative",
              boxShadow: "5px 5px 5px #d1c1f1",
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "5px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "5px",
                backdropFilter: "blur(8px)",
                padding: "10px",
                display: showPassword ? "block" : "none",
              }}
            />
            <textarea
              readOnly={true}
              style={{
                width: "100%",
                height: "100%",
                outline: "none",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
              }}
              value={privateKey}
            >
              Anh đẹp trai
            </textarea>
            <Tooltip
              sx={{
                marginLeft: "16px",
              }}
              title="Sao chép!"
            >
              <IconButton
                aria-label="delete"
                color="#ccc"
                sx={{
                  position: "absolute",
                  alignSelf: "flex-end",
                  right: 0,
                }}
                onClick={() => {
                  navigator.clipboard.writeText(privateKey);
                }}
              >
                <ContentCopyIcon fontSize="10px" />
              </IconButton>
            </Tooltip>
            <Tooltip
              sx={{
                marginLeft: "16px",
              }}
              title="Hiển thị khoá bí mật"
            >
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                }}
                onClick={handleClickShowPassword}
              >
                <Visibility fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <Tooltip
          followCursor
          title="Bạn vui lòng sao chép mã khoá công khai trước khi tiếp tục!"
        >
          <button
            style={{ alignSelf: "end" }}
            className="btn btn-outline-primary"
            onClick={() => {
              navigate("/certificate/request");
            }}
          >
            Tiếp tục
          </button>
        </Tooltip>
      </div>
    </Layout>
  );
};

export default CreateKey;
