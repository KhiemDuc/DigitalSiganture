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
import { Link } from "react-router-dom";

const tiers = [
  {
    title: "Miễn phí",
    price: "0",
    description: ["1 Chứng chỉ số", "Thời hạn 1 tháng"],
    buttonText: "Đăng ký miễn phí",
    buttonVariant: "outlined",
    checkoutID: 1,
    buttonLink: "subscription/student_verify",
  },

  {
    title: "Chuyên nghiệp",
    subheader: "Recommended",
    price: "100.000",
    description: [
      "2 Chứng chỉ số",
      "Cấp lại ngay khi chứng chỉ hết hạn",
      "Hỗ trợ tận nơi",
      "Priority email support",
      "Dedicated team",
      "Best deals",
    ],
    buttonText: "Bắt đầu ngay",
    buttonVariant: "contained",
    checkoutID: 2,
    buttonLink: "subscription/student_verify",
  },
  {
    title: "Sinh Viên Thang Long University",
    price: "0",
    description: [
      "1 Chứng chỉ số",
      "Cấp lại ngay khi chứng chỉ hết hạn",
      "Thời hạn đến khi ra trường",
      "Trung tâm hỗ trợ sinh viên",
      "Hỗ trợ qua email",
    ],
    buttonText: "Đăng ký xác nhận sinh viên",
    buttonVariant: "outlined",
    buttonLink: "subscription/student_verify",
  },
];

export default function Pricing() {
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
            key={tier.title}
            xs={12}
            sm={tier.title === "Enterprise" ? 12 : 6}
            md={4}
          >
            <Card
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                border:
                  tier.title === "Chuyên nghiệp" ? "1px solid" : undefined,
                borderColor:
                  tier.title === "Chuyên nghiệp" ? "primary.main" : undefined,
                background:
                  tier.title === "Chuyên nghiệp"
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
                    color: tier.title === "Chuyên nghiệp" ? "grey.100" : "",
                  }}
                >
                  <Typography component="h3" variant="h6">
                    {tier.title}
                  </Typography>
                  {tier.title === "Chuyên nghiệp" && (
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
                      tier.title === "Chuyên nghiệp" ? "grey.50" : undefined,
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
                {tier.description.map((line) => (
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
                          tier.title === "Chuyên nghiệp"
                            ? "primary.light"
                            : "primary.main",
                      }}
                    />
                    <Typography
                      component="text"
                      variant="subtitle2"
                      sx={{
                        color:
                          tier.title === "Chuyên nghiệp"
                            ? "grey.200"
                            : undefined,
                      }}
                    >
                      {line}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
              <CardActions>
                <Link
                  fullWidth
                  variant={tier.buttonVariant}
                  to={tier.buttonLink}
                  className="btn btn-primary rounded-pill"
                >
                  {tier.buttonText}
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
