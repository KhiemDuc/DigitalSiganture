import React from "react";
import { Link } from "react-router-dom";

const BackHome = () => {
  return (
    <>
      <Link to="/">
        <img
          alt="Home"
          src="../../../static/img/knb.svg"
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            cursor: "pointer",
            width: "180px",
            height: "100px",
          }}
        />
      </Link>
    </>
  );
};

export default BackHome;
