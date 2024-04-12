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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function ForgotPassword() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" style={{ height: "100vh", display: "flex" }}>
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
            sx={{
              textAlign: "left",
              borderBottom: "1px solid rgba(0, 0, 0, .1)",
              padding: "15px ",
            }}
          >
            Quên Mật Khẩu
          </Typography>
          <Typography
            component="h1"
            variant="body1"
            sx={{ textAlign: "left", padding: "15px 15px 0 15px" }}
          >
            Vui lòng nhập tài khoản email của bạn để tìm kiếm tài khoản của bạn
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3, padding: "0 15px" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Địa chỉ email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{
                backgroundColor: "#6655ff",
                borderRadius: "15px",
                padding: "10px",
                color: "white",
                width: "100%",
                border: "none",
              }}
            >
              Tìm Kiếm
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
