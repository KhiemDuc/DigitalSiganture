import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BackHome = () => {
  return (
    <>
      <Link
        to="/"
        style={{
          alignSelf: "flex-start",
          color: "#0866ff",
        }}
      >
        <ArrowBackIcon
          sx={{
            color: "#0866ff",
            fontSize: "30px",
          }}
        />
        Huỷ đăng ký
        {/* <img
          alt="Home"
          src="../../../static/img/knb.svg"
          style={{
            position: "absolute",
            top: "0px",
            left: "10px",
            cursor: "pointer",
            width: "160px",
            height: "100px",
          }}
        /> */}
      </Link>
    </>
  );
};

export default BackHome;
