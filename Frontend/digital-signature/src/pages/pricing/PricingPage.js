import { Box } from "@chakra-ui/layout";
import AppAppBar from "../../components/Home/AppBar";
import Pricing from "../../components/Home/Pricing";
import getLPTheme from "../../helpers/getLPTheme";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { React } from "react";
import { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../../redux/infoSlice";
import { ToastContainer } from "react-toastify";
import { showToast, ToastType } from "../../common/toast";

export default function PricingPage() {
  const [mode, setMode] = useState("light");
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };
  const LPtheme = createTheme(getLPTheme(mode));

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

  return (
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
        <Pricing />
      </Box>
    </ThemeProvider>
  );
}
