import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BackHome from "../../components/BackHome";
import { useNavigate } from "react-router-dom";
import UserService from "./../../services/user.service";
import { Avatar, Divider } from "@mui/material";
import AuthService from "../../services/auth.service";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SearchUser() {
  const [user, setUser] = React.useState({});
  const [userName, setUserName] = React.useState("");
  const [message, setMessage] = React.useState("");

  const hideEmail = (email) => {
    const [user, domain] = email.split("@");
    return `${user[0]}***@${domain.replace(/./g, "*")}`;
  };

  const navigate = useNavigate();

  const searchUser = () => {
    UserService.searchUser(userName)
      .then((response) => {
        console.log(response.data);
        setUser({
          id: response.data.data._id,
          email: response.data.data.email,
          userName: response.data.data.userName,
          firstName: response.data.data.firstName,
          lastName: response.data.data.lastName,
        });
        setMessage("");
      })
      .catch((error) => {
        setMessage(
          error.response.data.message || error.message || error.toString()
        );
      });
  };

  const confirmUser = () => {
    AuthService.acceptResetPassword(user.id)
      .then((response) => {
        navigate(
          "/forgot_password/search_user/confirm/" + response.data.data.token
        );
      })
      .catch((error) => {});
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        style={{
          height: "100vh",
          display: "flex",
        }}
      >
        <CssBaseline />
        <BackHome />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            borderRadius: "8px",
            boxShadow:
              "1px 1px 2px rgba(0, 0, 0, .1), 0 2px 4px rgba(0, 0, 0, .1)",
            margin: "auto",
            width: "500px",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            padding={"20px"}
            // borderBottom={"1px solid #ccc"}
          >
            {user.id
              ? "Chúng tôi sẽ gửi mã đến email của bạn"
              : "Tìm tài khoản của bạn"}
          </Typography>
          <Divider sx={{ opacity: "1", width: "100%" }} />
          <Typography component="h3" variant="body1" mt={2}>
            {user.id ? (
              <>
                Vui lòng kiểm tra hòm thư email của bạn để nhận <br /> mã xác
                thực gồm 6 chữ số
              </>
            ) : (
              "Vui lòng nhập email hoặc tên tài khoản kiếm tài khoản của bạn"
            )}
          </Typography>
          {user.id ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "20px 40px",
                }}
              >
                <Box>
                  <Typography
                    component="h3"
                    variant="body1"
                    style={{ marginTop: "20px", fontSize: "0.9rem" }}
                  >
                    Tài khoản: {user.userName}
                  </Typography>
                  <Typography
                    component="h3"
                    variant="body1"
                    style={{ marginTop: "10px", fontSize: "0.9rem" }}
                  >
                    Email: {hideEmail(user.email)}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Avatar sx={{ width: 42, height: 42 }}>
                    {user.userName[0]}
                  </Avatar>
                  <Typography
                    component="h2"
                    variant="body1"
                    style={{ marginTop: "20px", fontWeight: "bold" }}
                  >
                    {user.firstName} {user.lastName}
                  </Typography>
                </Box>
              </Box>
              <Grid
                style={{
                  // marginTop: "40px",

                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "end",
                  borderTop: "1px solid rgba(0, 0, 0, .1)",
                  padding: "5px 20px",
                  width: "100%",
                }}
              >
                <Button
                  sx={{ mt: 1, mb: 2, mr: 2 }}
                  style={{
                    backgroundColor: "#ccc",
                    size: "small",
                    padding: "10px",
                    color: "white",
                    border: "none",
                  }}
                  onClick={() => {
                    navigate("/");
                    // Logic to navigate to home goes here
                  }}
                >
                  Huỷ
                </Button>
                <Button
                  sx={{ mt: 1, mb: 2 }}
                  style={{
                    backgroundColor: "#6655ff",
                    size: "small",
                    padding: "10px",
                    color: "white",
                    border: "none",
                  }}
                  onClick={() => {
                    confirmUser();
                  }}
                >
                  Tiếp tục
                </Button>
              </Grid>
            </>
          ) : (
            <>
              <Box
                component="form"
                sx={{ mt: 3, width: "500px", padding: "20px" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Gmail hoặc tên tài khoản của bạn"
                      required
                      fullWidth
                      value={userName}
                      name="userName"
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </Grid>
                </Grid>
                {message && (
                  <div
                    className="form-text"
                    style={{
                      textAlign: "center",
                      color: "red",
                      marginTop: "10px",
                    }}
                  >
                    Không có kết quả tìm kiếm. Tài khoản hoặc email của bạn
                    không tồn tại.
                  </div>
                )}
              </Box>

              <Grid
                style={{
                  // marginTop: "40px",

                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "end",
                  borderTop: "1px solid rgba(0, 0, 0, .1)",
                  padding: "5px 20px",
                  width: "100%",
                }}
              >
                <Button
                  sx={{ mt: 1, mb: 2, mr: 2 }}
                  style={{
                    backgroundColor: "#ccc",
                    size: "small",
                    padding: "10px",
                    color: "white",
                    border: "none",
                  }}
                  onClick={() => {
                    navigate("/");
                    // Logic to navigate to home goes here
                  }}
                >
                  Huỷ
                </Button>
                <Button
                  sx={{ mt: 1, mb: 2 }}
                  style={{
                    backgroundColor: "#6655ff",
                    size: "small",
                    padding: "10px",
                    color: "white",
                    border: "none",
                  }}
                  onClick={() => {
                    searchUser();
                  }}
                >
                  Tìm kiếm
                </Button>
              </Grid>
            </>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
