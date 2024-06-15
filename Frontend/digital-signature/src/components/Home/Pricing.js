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
import axios from "../../setup/axios";
import { Link, useNavigate } from "react-router-dom";
import { usePayOS } from "payos-checkout";
import payOSconfig from "../../setup/payOS";
import { useSelector } from "react-redux";
import PaymentService from "../../services/payment.service";
import { Img } from "@chakra-ui/react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast, ToastType } from "../../common/toast";

// const OpenPopup = ({ link, cancelUrl, returnUrl, text }) => {
//   const { open } = usePayOS(payOSconfig(link, returnUrl));
//   const onBuy = () => {
//     console.log(link, cancelUrl, returnUrl);
//     // window.location.href = link;
//     open();
//   };
//   return (
//     <button onClick={onBuy} className="btn-primary btn-outline">
//       {text}
//     </button>
//   );
// };

export default function Pricing() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [tiers, setTier] = React.useState([]);
  const [myPlan, setMyPlan] = React.useState({});
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  var { open } = usePayOS(payOSconfig(data.link, data.returnUrl, showToast));

  const navigate = useNavigate();

  console.log(tiers);

  const onBuy = (planId, tier) => {
    if (myPlan?._id === planId) {
      showToast("Bạn đã đăng ký gói này", ToastType.WARNING);
      return;
    }
    if (myPlan.tier > tier) {
      showToast(
        "Gói của bạn đăng ký đang là tốt nhất, bạn có thể huỷ gói để đăng ký gói khác",
        ToastType.WARNING
      );
      return;
    }

    axios
      .post("subscription", {
        planId,
      })
      .then((res) => {
        console.log(res.data);

        setData(res.data.data);
        setLoading(true);
      })
      .catch((err) => console.log(err));
  };

  if (loading) {
    try {
      open();
    } catch (error) {
      console.log(error);
    }
    // open();
  }

  React.useEffect(() => {
    PaymentService.getListPlan()
      .then((response) => {
        setTier(response.data.data);
      })
      .catch((error) => console.log(error));
    PaymentService.getMySubCriptionPlan()
      .then((response) => {
        setMyPlan(response.data.data.plan);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Container
      id="pricing"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
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
      <Box
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          Gói hội viên
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Đăng ký các gói hội viên để được hưởng các mức ưu đãi khác nhau
        </Typography>
      </Box>

      <Grid container spacing={2} alignItems="center" justifyContent="center">
        {tiers.map((tier) => (
          <Grid
            item
            key={tier.description}
            xs={12}
            sm={tier.description === "Enterprise" ? 12 : 6}
            md={4}
          >
            <Card
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
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
                    : tier.description ===
                      "Gói dành cho sinh viên trường Đại học Thăng Long"
                    ? "#020066"
                    : tier.description === "Gói cơ bản"
                    ? undefined
                    : "linear-gradient(#033363, #021F3B)",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    mb: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: tier.description !== "Gói cơ bản" ? "grey.100" : "",
                  }}
                >
                  <Typography
                    component="h3"
                    variant="h6"
                    sx={{ textAlign: "left" }}
                  >
                    {tier.description}
                  </Typography>
                  {tier.description ===
                    "Gói dành cho sinh viên trường Đại học Thăng Long" && (
                    <Img
                      src="../../../static/img/tlu_white.png"
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
                      tier.description !== "Gói cơ bản" ? "grey.50" : undefined,
                  }}
                >
                  <Typography component="h3" variant="h2">
                    {tier.price.toLocaleString("de-DE")}
                  </Typography>
                  <Typography component="h3" variant="h6">
                    &nbsp;VND/ tháng
                  </Typography>
                </Box>
                <Divider
                  sx={{
                    my: 2,
                    opacity: 0.2,
                    borderColor: "grey.500",
                  }}
                />
                {tier?.benefits.map((line) => (
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
                          tier.description !== "Gói cơ bản"
                            ? "primary.light"
                            : "primary.main",
                      }}
                    />
                    <Typography
                      component="text"
                      variant="subdescription2"
                      sx={{
                        color:
                          tier.description !== "Gói cơ bản"
                            ? "grey.200"
                            : undefined,
                      }}
                    >
                      {line}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
              {isLoggedIn ? (
                <CardActions>
                  {tier.description === "Gói chuyên nghiệp" ? (
                    <button
                      onClick={() => {
                        onBuy(tier._id, tier.tier);
                      }}
                      className={
                        myPlan?._id === tier._id
                          ? "btn btn-outline-light"
                          : "btn btn-outline-light"
                      }
                      disabled={myPlan?._id === tier._id}
                    >
                      {myPlan?._id === tier._id ? "Gói của bạn" : "Mua ngay"}
                    </button>
                  ) : tier.description === "Gói cơ bản" ? (
                    <button
                      type="button"
                      class="btn btn-outline "
                      disabled={myPlan?._id === tier._id || myPlan.tier > 1}
                    >
                      {myPlan?._id === tier._id ? "Gói của bạn" : " ✔️"}
                    </button>
                  ) : tier.description ===
                    "Gói dành cho sinh viên trường Đại học Thăng Long" ? (
                    <button
                      className={
                        myPlan?._id === tier._id
                          ? "btn btn-outline"
                          : "btn btn-outline-light"
                      }
                      disabled={myPlan?._id === tier._id}
                      onClick={() => {
                        if (myPlan?._id === tier._id) {
                          showToast(
                            "Bạn đã đăng ký gói này",
                            ToastType.WARNING
                          );
                          return;
                        }
                        navigate("/subscription/student_verify");
                      }}
                    >
                      {myPlan?._id === tier._id
                        ? "Gói của bạn ✔️"
                        : "Xác thực ngay"}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        onBuy(tier._id, tier.tier);
                      }}
                      className={
                        myPlan?._id === tier._id
                          ? "btn btn-outline-light"
                          : "btn btn-outline-light"
                      }
                      disabled={myPlan?._id === tier._id}
                    >
                      {myPlan?._id === tier._id ? "Gói của bạn" : "Mua ngay"}
                    </button>
                  )}
                </CardActions>
              ) : (
                <Link
                  fullWidth
                  variant={tier.buttonVariant}
                  to="/sign_in"
                  className={
                    tier.description === "Gói cơ bản"
                      ? "btn btn-outline-primary"
                      : "btn btn-outline-light"
                  }
                >
                  Bắt đầu ngay
                </Link>
              )}

              {/* {loading && (
                <OpenPopup
                  link={data.link}
                  cancelUrl={data.cancelUrl}
                  returnUrl={data.returnUrl}
                  text={"Mua ngay"}
                />
              )} */}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
