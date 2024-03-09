import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function FAQ() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container
      id="faq"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        color="text.primary"
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        Các câu hỏi thường gặp
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <Typography component="h3" variant="subtitle2">
              Làm cách nào để liên hệ với bộ phận hỗ trợ khách hàng nếu tôi có câu hỏi hoặc vấn đề?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              Bạn có thể liên hệ với nhóm hỗ trợ khách hàng của chúng tôi bằng cách gửi email tới
              <Link> nguyenduckhiem1002@gmail.com</Link>
              hoặc gọi đến số điện thoại 0358978571 của chúng tôi. Chúng tôi ở đây để hỗ trợ bạn kịp thời.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2d-content"
            id="panel2d-header"
          >
            <Typography component="h3" variant="subtitle2">
              Tôi có thể được hoàn lại tiền nếu không hài lòng với sản phẩm không?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '70%' } }}
            >
              Tất nhiên! Chúng tôi có chính sách đổi trả không rắc rối. 
              Nếu bạn không hoàn toàn hài lòng với dịch vụ, bạn có được hoàn tiền trong 7 ngày.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel3'}
          onChange={handleChange('panel3')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3d-content"
            id="panel3d-header"
          >
            <Typography component="h3" variant="subtitle2">
              Dịch vụ của bạn có điểm nổi bật gì so với các sản phẩm khác trên thị trường?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component="h3" variant="subtitle2">
              Bảo mật tốt, độ xác thực cao, hiệu năng tốt, thao tác nhanh gọn, 
              dịch vụ hỗ trợ tận tâm, quy trình đăng ký thủ tục đơn giản.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
      </Box>
    </Container>
  );
}