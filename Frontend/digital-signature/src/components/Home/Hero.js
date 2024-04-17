import * as React from "react";
import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #CEE5FD, #FFF)"
            : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
        backgroundSize: "100% 20%",
        backgroundRepeat: "no-repeat",
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
          <Typography
            component="h1"
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            KnB&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                color: (theme) =>
                  theme.palette.mode === "light"
                    ? "primary.main"
                    : "primary.light",
              }}
            >
              PKI
            </Typography>
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary">
            Cung cấp dịch vụ chữ ký số tiện lợi và an toàn. <br />
            Chào mừng bạn đến với trang web chứng chỉ số của Khiêm và Bách, hai
            sinh viên năm 4 đại học Thăng Long! Trang web này được phát triển
            nhằm cung cấp dịch vụ chứng thực số tiện lợi và an toàn, giúp mọi
            người dễ dàng xác minh thông tin và tạo ra các chứng chỉ số uy tín.
            Hãy khám phá và trải nghiệm dịch vụ tuyệt vời mà chúng tôi mang lại!
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
          >
            <TextField
              id="outlined-basic"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Nhập địa chỉ email của bạn"
              placeholder="Địa chỉ email của bạn"
              inputProps={{
                autocomplete: "off",
                ariaLabel: "Nhập địa chỉ email của bạn",
              }}
            />
            <Button variant="contained" color="primary">
              Bắt đầu nào
            </Button>
          </Stack>
          <Typography
            variant="caption"
            textAlign="center"
            sx={{ opacity: 0.8 }}
          >
            By clicking &quot;Bắt đầu&quot; you agree to our&nbsp;
            <Link href="#" color="primary">
              Terms & Conditions
            </Link>
            .
          </Typography>
        </Stack>
        <Box
          id="image"
          sx={(theme) => ({
            overflow: "hidden",
            mt: { xs: 8, sm: 10 },
            alignSelf: "center",
            height: { xs: 200, sm: 700 },
            width: "100%",
            backgroundSize: "cover",
            borderRadius: "10px",
            outline: "1px solid",
            outlineColor:
              theme.palette.mode === "light"
                ? alpha("#BFCCD9", 0.5)
                : alpha("#9CCCFC", 0.1),
            boxShadow:
              theme.palette.mode === "light"
                ? `0 0 12px 8px ${alpha("#9CCCFC", 0.2)}`
                : `0 0 24px 12px ${alpha("#033363", 0.2)}`,
          })}
        >
          {/* <Card sx={{ width: '100%', height: '100%'}}>
            <CardMedia
              component="iframe"
              alt="green iguana"
              width={'100%'}
              height={'100%'}
              image="../static/video/burbank.mp4"
              autoPlay
            />
          </Card> */}
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/i-rtxrEz_E8"
            title="What is Public Key Infrastructure (PKI) by Securemetric"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </Box>
      </Container>
    </Box>
  );
}
