import { Box, Button, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

// STYLED COMPONENTS
const FlexBox = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const JustifyBox = styled(FlexBox)({
  maxWidth: 320,
  flexDirection: "column",
  justifyContent: "center",
});

const IMG = styled("img")({
  width: "100%",
  marginBottom: "32px",
});

const NotFoundRoot = styled(FlexBox)({
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh !important",
});

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <NotFoundRoot>
      <JustifyBox>
        <Typography variant="h5" gutterBottom sx={{ color: "#63a0ff" }}>
          Trang này không tồn tại
        </Typography>
        <IMG src="../../../src/assets/images/404.svg" alt="" />

        <Button
          color="primary"
          variant="outlined"
          sx={{ textTransform: "capitalize" }}
          onClick={() => navigate(-1)}
        >
          Trở lại trang trước
        </Button>
      </JustifyBox>
    </NotFoundRoot>
  );
}
