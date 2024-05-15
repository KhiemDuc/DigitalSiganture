import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PaymentService from "../../services/payment.service";
import { Avatar, Img } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import getLPTheme from "../../helpers/getLPTheme";
import { useState, useEffect } from "react";
import AppAppBar from "../../components/Home/AppBar";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../../redux/infoSlice";
import { showToast, ToastType } from "../../common/toast";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import { delay } from "framer-motion";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function MyPlan() {
  const [tier, setTier] = React.useState({});
  const [mode, setMode] = useState("light");
  const [open, setOpen] = React.useState(false);
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };
  const LPtheme = createTheme(getLPTheme(mode));
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleCancel = () => {
    setIsLoading(true);
    delay(3000);
    PaymentService.cancelmySubscriptionPlan()
      .then((response) => {
        setIsLoading(false);
        setIsDone(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      console.log(user._id);
      dispatch(getUserInfo(user._id))
        .unwrap()
        .then(() => {})
        .catch(() => {
          showToast(
            "Lỗi khi lấy dữ liệu User vui lòng đăng nhập lại",
            ToastType.ERROR
          );
        });
    }
  }, [user, dispatch]);

  React.useEffect(() => {
    PaymentService.getMySubCriptionPlan()
      .then((response) => {
        setTier(response.data.data.plan);
        console.log(response.data.data.plan);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Container
      sx={{
        pt: { xs: 4, sm: 6 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 4 },
      }}
    >
      <ThemeProvider theme={LPtheme}>
        <CssBaseline />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Box sx={{ bgcolor: "background.default" }}>
          <AppAppBar
            hideButton="true"
            mode={mode}
            toggleColorMode={toggleColorMode}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-evenly",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: { sm: "100%", md: "100%" },
              textAlign: { sm: "left", md: "left" },
            }}
          >
            <Typography component="h2" variant="h4" color="text.primary">
              Gói của bạn
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Xem chi tiết ưu đãi và thông tin gói dịch vụ của bạn
            </Typography>
          </Box>
          <Box>
            <Button
              sx={{
                width: "220px",
                fontWeight: "bold",
                backgroundColor: "white",
                color: " rgb(102, 85, 255)",
              }}
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => {
                navigate("/pricing");
              }}
            >
              Xem thêm gói dịch vụ
            </Button>
          </Box>
        </Box>

        <Grid sx={{ width: "100%" }}>
          <Grid
            item
            key={tier.description}
            xs={12}
            sm={tier.description === "Enterprise" ? 12 : 6}
            md={4}
          >
            <Card
              sx={{
                p: 4,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                borderRadius: 8,
                border:
                  tier.description === "Gói chuyên nghiệp"
                    ? "1px solid"
                    : undefined,
                borderColor:
                  tier.description === "Gói chuyên nghiệp"
                    ? "primary.main"
                    : undefined,
                background:
                  tier.description === "Gói chuyên nghiệp"
                    ? "linear-gradient(#033363, #021F3B)"
                    : undefined,
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    mb: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color:
                      tier.description === "Gói chuyên nghiệp"
                        ? "grey.100"
                        : "",
                  }}
                >
                  <Typography
                    component="h3"
                    variant="h5"
                    sx={{ textAlign: "left", fontWeight: "bold" }}
                  >
                    {tier.description}
                  </Typography>
                  {tier.description ===
                    "Gói dành cho sinh viên trường Đại học Thăng Long" && (
                    <Img
                      src="../../../static/img/tlu_name.png"
                      sx={{ height: "32px" }}
                    />
                  )}
                  {tier.description === "Gói chuyên nghiệp" && (
                    <Chip
                      icon={<AutoAwesomeIcon />}
                      label={tier.subheader}
                      size="small"
                      sx={{
                        background: (theme) =>
                          theme.palette.mode === "light" ? "" : "none",
                        backgroundColor: "primary.contrastText",
                        "& .MuiChip-label": {
                          color: "primary.dark",
                        },
                        "& .MuiChip-icon": {
                          color: "primary.dark",
                        },
                      }}
                    />
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    color:
                      tier.description === "Gói chuyên nghiệp"
                        ? "grey.50"
                        : undefined,
                  }}
                >
                  <Typography component="h3" variant="h2">
                    {tier.price}
                  </Typography>
                  <Typography component="h3" variant="h6">
                    &nbsp;vnd/ tháng
                  </Typography>
                </Box>
                <Divider
                  sx={{
                    my: 2,
                    opacity: 0.2,
                    borderColor: "grey.500",
                  }}
                />
                {tier?.benefits?.map((line) => (
                  <Box
                    key={line}
                    sx={{
                      py: 1,
                      display: "flex",
                      gap: 1.5,
                      alignItems: "center",
                    }}
                  >
                    <CheckCircleRoundedIcon
                      sx={{
                        width: 20,
                        color:
                          tier.description === "Gói chuyên nghiệp"
                            ? "primary.light"
                            : "primary.main",
                      }}
                    />
                    <Typography
                      component="text"
                      variant="subdescription2"
                      sx={{
                        color:
                          tier.description === "Gói chuyên nghiệp"
                            ? "grey.200"
                            : undefined,
                      }}
                    >
                      {line}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    handleOpen();
                  }}
                >
                  Huỷ gói
                </button>
                <Modal
                  open={open}
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
                      borderRadius: "15px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    {isLoading ? (
                      <CircularProgress />
                    ) : isDone ? (
                      // ...
                      <>
                        <IconButton
                          aria-label="close"
                          onClick={handleClose} // Replace 'handleClose' with your function to close the modal
                          sx={{
                            position: "absolute", // Position the button absolutely
                            top: 0, // Position it at the top
                            right: 0, // Position it at the left
                            padding: 2,
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyItems: "space-between",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          <Avatar
                            style={{ width: "80px", height: "80px" }}
                            src="/static/img/success.png"
                          />
                          <Typography fontSize={17} id="modal-modal-title">
                            Huỷ gói thành công
                          </Typography>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box>
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                          >
                            Bạn có chắc muốn huỷ gói này không?
                          </Typography>
                          <Typography
                            id="modal-modal-description"
                            sx={{ mt: 2 }}
                          >
                            Nếu huỷ gọi bạn sẽ mất các ưu đãi hiện tại
                          </Typography>
                        </Box>
                        <Divider />
                        <Box
                          sx={{
                            display: "flex",
                            gap: 2,
                            justifyContent: "space-between",
                            width: "100%",
                            marginTop: 6,
                          }}
                        >
                          <Button
                            onClick={() => {
                              handleCancel();
                            }}
                          >
                            Xác Nhận
                          </Button>
                          <button
                            className="btn btn-primary"
                            onClick={handleClose}
                          >
                            Đóng
                          </button>
                        </Box>
                      </>
                    )}
                  </Box>
                </Modal>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Container>
  );
}
