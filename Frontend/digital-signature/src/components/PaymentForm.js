import * as React from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardMedia, Avatar } from '@mui/material';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import ErrorIcon from '@mui/icons-material/Error';

import { styled } from '@mui/system';

const FormGrid = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function PaymentForm() {
  const [paymentType, setPaymentType] = React.useState('creditCard');
  const [cardNumber, setCardNumber] = React.useState('');
  const [cvv, setCvv] = React.useState('');
  const [expirationDate, setExpirationDate] = React.useState('');

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    if (value.length <= 16) {
      setCardNumber(formattedValue);
    }
  };

  const handleCvvChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  const handleExpirationDateChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{2})(?=\d{2})/, '$1/');
    if (value.length <= 4) {
      setExpirationDate(formattedValue);
    }
  };

  return (
    <Stack spacing={{ xs: 2, sm: 4 }} useFlexGap>
      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          aria-label="Payment options"
          name="paymentType"
          value={paymentType}
          onChange={handlePaymentTypeChange}
          sx={{
            flexDirection: { sm: 'column', md: 'row' },
            gap: 2,
          }}
        >
          <Card
            raised={paymentType === 'creditCard'}
            sx={{
              maxWidth: { sm: '100%', md: '50%' },
              flexGrow: 1,
              outline: '1px solid',
              outlineColor:
                paymentType === 'creditCard' ? 'primary.main' : 'divider',
              backgroundColor:
                paymentType === 'creditCard' ? 'background.default' : '',
            }}
          >
            <CardActionArea onClick={() => setPaymentType('creditCard')}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CreditCardRoundedIcon color="primary" fontSize="small" />
                <Typography fontWeight="medium">Thẻ</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card
            raised={paymentType === 'bankTransfer'}
            sx={{
              maxWidth: { sm: '100%', md: '50%' },
              flexGrow: 1,
              outline: '1px solid',
              outlineColor:
                paymentType === 'bankTransfer' ? 'primary.main' : 'divider',
              backgroundColor:
                paymentType === 'bankTransfer' ? 'background.default' : '',
            }}
          >
            <CardActionArea onClick={() => setPaymentType('bankTransfer')}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccountBalanceRoundedIcon color="primary" fontSize="small" />
                <Typography fontWeight="medium">Chuyển khoản</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </RadioGroup>
      </FormControl>
      {paymentType === 'creditCard' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              p: 3,
              height: { xs: 300, sm: 350, md: 375 },
              width: '100%',
              borderRadius: '20px',
              border: '1px solid ',
              borderColor: 'divider',
              backgroundColor: 'background.paper',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
            }}
          >
          <Alert severity='success' icon={<ErrorIcon/>}>
            Chức năng đang được phát triển vui lòng chọn chức năng chuyển khoản ngân hàng
          </Alert>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle2">Credit card</Typography>
              <CreditCardRoundedIcon sx={{ color: 'text.secondary' }} />
            </Box>
            <SimCardRoundedIcon
              sx={{
                fontSize: { xs: 48, sm: 56 },
                transform: 'rotate(90deg)',
                color: 'text.secondary',
              }}
            />
            
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                gap: 2,
              }}
            >
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-number" required>
                  Card number
                </FormLabel>
                <OutlinedInput
                  id="card-number"
                  autoComplete="card-number"
                  placeholder="0000 0000 0000 0000"
                  required
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                />
              </FormGrid>
              <FormGrid sx={{ maxWidth: '20%' }}>
                <FormLabel htmlFor="cvv" required>
                  CVV
                </FormLabel>
                <OutlinedInput
                  id="cvv"
                  autoComplete="CVV"
                  placeholder="123"
                  required
                  value={cvv}
                  onChange={handleCvvChange}
                />
              </FormGrid>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-name" required>
                  Name
                </FormLabel>
                <OutlinedInput
                  id="card-name"
                  autoComplete="card-name"
                  placeholder="John Smith"
                  required
                />
              </FormGrid>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-expiration" required>
                  Expiration date
                </FormLabel>
                <OutlinedInput
                  id="card-expiration"
                  autoComplete="card-expiration"
                  placeholder="MM/YY"
                  required
                  value={expirationDate}
                  onChange={handleExpirationDateChange}
                />
              </FormGrid>
            </Box>
          </Box>
          
        </Box>
      )}

      {paymentType === 'bankTransfer' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Alert severity="warning" icon={<WarningRoundedIcon />}>
            Vui lòng đợi trong giây lát để đơn hàng được xử lý.
          </Alert>
          
          <Typography variant="subtitle1" fontWeight="medium">
            Chuyển khoản ngân hàng
          </Typography>
          <Typography variant="body1" gutterBottom>
            
          </Typography>
          <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
          }}
        >
          <Card sx={{ minWidth: 280, maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="280"
                width={'100%'}
                image="https://api.vietqr.io/image/970422-7600142281002-gsDIvXx.jpg?accountName=NGUYEN%20DUC%20KHIEM&amount=150000&addInfo=CK%20XN%20DK%20PRO"
                alt="green iguana"
              />

            </CardActionArea>
          </Card>
          <Box
          fullWidth
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            justifyItems: 'start',
            border:'1px solid #d6e2ebcc',
            borderRadius: '10px',
            paddingLeft: '40px',
            paddingTop: '10px',
          }}
        >
          <Box  sx={{ display: 'flex', gap: 1, flexDirection:'row', width:'100%'  }}>
            <Box sx={{width: '120px', height: '50px'}}>
                <Avatar
                alt="Remy Sharp"
                src="../../static/img/Logo_MB_new.png"
                sx={{ width: '100%', height: '100%' }}
                variant="square"
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 1, flexDirection:'column' }}>
            <Typography variant="body1" color="medium">
              NGUYEN DUC KHIEM
            </Typography>
            <Box sx={{ display: 'flex', gap: 1  }}>

            <Typography variant="body1" color="text.secondary" textAlign='left'>
              Ngân Hàng:
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              MB Bank
            </Typography>
            </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, flexDirection:'column', width:'100%'}}>
            <Typography variant="body1" color="text.secondary" textAlign='left'>
              Số tài khoản:
            </Typography>
            <Typography variant="body1" fontWeight="medium" textAlign='left'>
              7600142281002
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexDirection:'column', justifyContent:'flex-start',width:'100%' }}>
            <Typography variant="body1" color="text.secondary" textAlign='left'>
              Số tiền:
            </Typography>
            <Typography variant="body1" fontWeight="medium" textAlign='left'>
              150.000 VND
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexDirection:'column', justifyContent:'flex-start',width:'100%' }}>
            <Typography variant="body1" color="text.secondary" textAlign='left'>
              Nội Dung:
            </Typography>
            <Typography variant="body1" fontWeight="medium" textAlign='left'>
              CK XN DK PRO
            </Typography>
          </Box>
          </Box>
          </Box>
        </Box>
      )}
    </Stack>
  );
}