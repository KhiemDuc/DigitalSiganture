import * as React from "react";
import PropTypes from "prop-types";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import AppAppBar from "../../components/Home/AppBar";
import Hero from "../../components/Home/Hero";
import LogoCollection from "../../components/LogoCollection";
import Highlights from "../../components/Home/Highlights";
import Pricing from "../../components/Home/Pricing";
import Features from "../../components/Home/Features";
import Testimonials from "../../components/Home/Testimonials";
import FAQ from "../../components/Home/FAQ";
import Footer from "../../components/Home/Footer";
import getLPTheme from "../../helpers/getLPTheme";
import { Team } from "../../components/Home/Team";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../../redux/infoSlice";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { showToast, ToastType } from "../../common/toast";
import { useSpring, animated } from "react-spring";
import { useScroll } from "@react-spring/web";
import { useLocation } from "react-router-dom";
import "https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/0.1.0-beta.2/libs/oversea/index.js";

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100dvw",
        position: "fixed",
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Platform"
        sx={{
          backgroundColor: "background.default",
          "& .Mui-selected": {
            pointerEvents: "none",
          },
        }}
      >
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: "20px", mr: 1 }} />
          Custom theme
        </ToggleButton>
        <ToggleButton value={false}>Material Design 2</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.shape({
    valueOf: PropTypes.func.isRequired,
  }).isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

export default function LandingPage() {
  const springs = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(scrollYProgress);

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/0.1.0-beta.2/libs/oversea/index.js";
    script.onload = () => {
      if (location.pathname === "/" || location.pathname === "/home") {
        new window.CozeWebSDK.WebChatClient({
          config: {
            bot_id: "7371504896325074951",
          },
          componentProps: {
            title: "Hướng dẫn sử dụng với KnB PKI với AI",
            subtitle: "Hãy nhập câu hỏi của bạn vào đây",
            placeholder: "Nhập câu hỏi của bạn vào đây",
          },
        });
        // Hành động A
      }
    };
    document.body.appendChild(script);
    return () => {
      let element = document.querySelector(".fda3723591e0b38e7e52");

      if (element) {
        element.remove();
      }
      document.body.removeChild(script);
    };
  }, []);

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
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
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
        <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
        <animated.div style={springs}>
          <Hero />
        </animated.div>
        <animated.div style={springs}>
          <LogoCollection />
        </animated.div>
        <animated.div style={springs}>
          <Features />
        </animated.div>
        <Divider />
        <animated.div style={springs}>
          <Testimonials />
        </animated.div>
        <Divider />
        <animated.div style={springs}>
          <Highlights />
        </animated.div>
        <Divider />
        <animated.div style={{ springs: scrollYProgress }}>
          <Pricing />
        </animated.div>
        <Divider />
        <animated.div style={springs}>
          <Team />
        </animated.div>
        <animated.div style={springs}>
          <FAQ />
        </animated.div>
        <Divider />
        <animated.div style={springs}>
          <Footer />
        </animated.div>
      </Box>
    </ThemeProvider>
  );
}
