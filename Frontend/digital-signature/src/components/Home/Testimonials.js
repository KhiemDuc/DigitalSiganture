import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/system";

const userTestimonials = [
  {
    avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />,
    name: "Nguyễn Xuân Huy",
    occupation: "Kỹ sư cao cấp",
    testimonial:
      "Tôi hoàn toàn yêu thích tính linh hoạt của dịch vụ chứng chỉ số và chữ ký số này! Thiết kế trực quan của nó đã thực sự nâng cao hiệu suất hàng ngày của tôi, làm cho các công việc trở nên hiệu quả và thú vị hơn.",
  },
  {
    avatar: <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />,
    name: "Đinh Văn Ngọc Vũ",
    occupation: "Trưởng nhóm Thiết kế sản phẩm",
    testimonial:
      "Một trong những tính năng nổi bật của dịch vụ này là hỗ trợ khách hàng xuất sắc. Trong kinh nghiệm của tôi, đội ngũ hỗ trợ đã phản hồi nhanh chóng và rất hữu ích. Thật yên tâm khi biết rằng họ luôn đứng sau dịch vụ của mình một cách vững chắc.",
  },
  {
    avatar: <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />,
    name: "Nguyễn Huy Văn",
    occupation: "CTO",
    testimonial:
      "Mức độ đơn giản và dễ sử dụng của dịch vụ chứng chỉ số và chữ ký số này đã đơn giản hóa cuộc sống của tôi đáng kể. Tôi không cần phải lo lắng về việc quản lý tài liệu hoặc chứng thực thông tin cá nhân nữa. Tôi đã tiết kiệm được rất nhiều thời gian, công sức nhờ vào dịch vụ này.",
  },
  {
    avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/4.jpg" />,
    name: "Lê Minh Quân",
    occupation: "Kỹ sư cao cấp",
    testimonial:
      "Tôi đánh giá cao sự chú ý đến từng chi tiết trong dịch vụ chứng chỉ số và chữ ký số này. Những chi tiết nhỏ tạo nên sự khác biệt lớn, và rõ ràng là những người tạo ra đã tập trung vào việc mang đến trải nghiệm cao cấp.",
  },
  {
    avatar: <Avatar alt="Travis Howard" src="/static/images/avatar/5.jpg" />,
    name: "Bùi Văn Du",
    occupation: "Trưởng phòng SAP",
    testimonial:
      "Tôi đã thử các dịch vụ tương tự khác, nhưng dịch vụ này nổi bật bởi các tính năng sáng tạo. Rõ ràng là những người sáng tạo đã dành nhiều tâm huyết vào việc tạo ra một giải pháp thực sự đáp ứng nhu cầu của người dùng.",
  },
  {
    avatar: <Avatar alt="Cindy Baker" src="/static/images/avatar/6.jpg" />,
    name: "Đào Ngọc Quân",
    occupation: "Kỹ sư cao cấp",
    testimonial:
      "Chất lượng của dịch vụ chứng chỉ số và chữ ký số này đã vượt quá mong đợi của tôi. Thực sự đáng để đầu tư!",
  },
];
const whiteLogos = [
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628e8573c43893fe0ace_Sydney-white.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d520d0517ae8e8ddf13_Bern-white.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f46794c159024c1af6d44_Montreal-white.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e891fa22f89efd7477a_TerraLight.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a09d1f6337b1dfed14ab_colorado-white.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5caa77bf7d69fb78792e_Ankara-white.svg",
];

const darkLogos = [
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628889c3bdf1129952dc_Sydney-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg",
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg",
];

const logoStyle = {
  width: "64px",
  opacity: 0.3,
};

export default function Testimonials() {
  const theme = useTheme();
  const logos = theme.palette.mode === "light" ? darkLogos : whiteLogos;

  return (
    <Container
      id="testimonials"
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
          Đánh giá từ những người đã trải nghiệm
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Xem những gì khách hàng của chúng tôi yêu thích về sản phẩm của chúng
          tôi. Khám phá cách chúng tôi vượt trội về hiệu quả, độ bền và sự hài
          lòng. Tham gia với chúng tôi để có chất lượng, đổi mới và hỗ trợ đáng
          tin cậy.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {userTestimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: "flex" }}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flexGrow: 1,
                p: 1,
              }}
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {testimonial.testimonial}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  pr: 2,
                }}
              >
                <CardHeader
                  avatar={testimonial.avatar}
                  title={testimonial.name}
                  subheader={testimonial.occupation}
                />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
