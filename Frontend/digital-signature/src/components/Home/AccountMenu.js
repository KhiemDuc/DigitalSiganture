import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import EventBus from "../../common/EventBus";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CreateIcon from "@mui/icons-material/Create";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import PaymentService from "../../services/payment.service";
import PaymentIcon from "@mui/icons-material/Payment";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";

const SmallIcon = styled(CheckCircleIcon)(({ theme }) => ({
  width: 16,
  height: 16,
  color: "#0866ff",
  // border: `0.5px solid ${theme.palette.background.paper}`,
  borderRadius: "50%",
}));

export default function AccountMenu() {
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.info);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [myPlan, setMyPlan] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseProfile = () => {
    navigate("/user_info/" + currentUser._id);
    setAnchorEl(null);
  };

  const logOut = React.useCallback(() => {
    dispatch(logout());
    navigate("/");
    window.location.reload();
  }, [dispatch]);

  React.useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
    });
    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  React.useEffect(() => {
    PaymentService.getMySubCriptionPlan()
      .then((response) => {
        setMyPlan(response.data.data.plan);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <React.Fragment>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              userInfo?.verified && (
                <SmallIcon sx={{ backgroundColor: "white" }} />
              )
            }
          >
            <Avatar
              sx={{ width: 32, height: 32 }}
              src={
                userInfo?.avatar &&
                process.env.REACT_APP_API_URL + "public/" + userInfo?.avatar
              }
            >
              {currentUser.userName[0]}
            </Avatar>
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        sx={{ borderTop: "1px solid #ccc" }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar
            src={
              userInfo?.avatar &&
              process.env.REACT_APP_API_URL + "public/" + userInfo?.avatar
            }
          >
            {currentUser.userName[0]}
          </Avatar>
          {userInfo?.lastName + " " + userInfo?.firstName}
          {userInfo?.verified && (
            <Tooltip
              sx={{
                marginLeft: "16px",
              }}
              title="Tài Khoản đã được xác thực"
            >
              <SmallIcon />
            </Tooltip>
          )}
          {myPlan?.description ===
            "Gói dành cho sinh viên trường Đại học Thăng Long" && (
            <img
              src="../../../static/img/tlu_name.png"
              style={{ marginLeft: "16px", width: "20px", height: "20px" }}
              alt="Thăng Long University"
            />
          )}
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            navigate("/certificate/create_key");
          }}
        >
          <ListItemIcon>
            <AppRegistrationIcon fontSize="small" />
          </ListItemIcon>
          Đăng ký chứng chỉ số
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/certificate/my_request");
          }}
        >
          <ListItemIcon>
            <ScheduleSendIcon fontSize="small" />
          </ListItemIcon>
          Xem danh sách yêu cầu
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/certificate/check");
          }}
        >
          <ListItemIcon>
            <FingerprintIcon fontSize="small" />
          </ListItemIcon>
          Xác thực chứng chỉ số
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/certificate/extend");
          }}
        >
          <ListItemIcon>
            <HourglassFullIcon fontSize="small" />
          </ListItemIcon>
          Gia hạn chứng chỉ số
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/certificate/create_digital_signature");
          }}
        >
          <ListItemIcon>
            <CreateIcon fontSize="small" />
          </ListItemIcon>
          Tạo chữ ký số
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/subscription/my_subscription");
          }}
        >
          <ListItemIcon>
            <PaymentIcon fontSize="small" />
          </ListItemIcon>
          Gói của tôi
        </MenuItem>
        <MenuItem onClick={handleCloseProfile}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={logOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
