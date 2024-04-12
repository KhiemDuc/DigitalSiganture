import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';

const items = [
  {
    icon: <SettingsSuggestRoundedIcon />,
    title: 'Hiệu năng',
    description:
      'Tận hưởng hiệu suất vượt trội với sản phẩm được thiết kế để đáp ứng mọi nhu cầu của bạn.',
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: 'Giao diện',
    description:
      'Giao diện thân thiện, dễ dàng thao tác và sử dụng.',
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: 'Dễ dàng đăng ký và sử dụng',
    description:
      'Quy trình đăng ký và xác thực ngắn gọn nhanh chóng. ',
  },
  {
    icon: <AutoFixHighRoundedIcon />,
    title: 'Xác thực',
    description:
      'Độ tin cậy cao, được tin dùng bởi trường Đại học Thăng Long.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'Đội ngũ hỗ trợ',
    description:
      'Đội ngũ hỗ trợ chuyên nghiệp túc trực 24/7',
  },
  {
    icon: <LockPersonIcon/>,
    title: 'Bảo mật tốt',
    description:
      'Sử dụng mã hoá RSA và các thuật toán bảo mật mạnh để đảm bảo an toàn cho dữ liệu của bạn.',
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: '#06090a',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4">
            Nổi bật
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
          Khám phá lý do tại sao sản phẩm của chúng tôi nổi bật: khả năng thích ứng, độ bền, 
          thiết kế thân thiện với người dùng và sự đổi mới. 
          Tận hưởng sự hỗ trợ khách hàng đáng tin cậy và độ chính xác trong từng chi tiết.
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.800',
                  background: 'transparent',
                  backgroundColor: 'grey.900',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>  
    </Box>
  );
}
