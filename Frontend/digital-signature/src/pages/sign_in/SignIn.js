import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import getCheckoutTheme from '../../components/getCheckoutTheme';




// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme(getCheckoutTheme('light'));

export default function SignInSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" paddingTop={10}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
        >
          <Box
          id="image"
          sx={(theme) => ({
            overflow: 'hidden',
            mt: { xs: 8, sm: 10 },
            alignSelf: 'center',
            width: '100%',
            backgroundSize: 'cover',
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
            <img width="60%" height="60%" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" />
          </Box>
          </Grid>
        
        <Grid item xs={12} sm={8} md={5} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Tạo tài khoản KnB
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                padding={4}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                padding={4}
              />
              <Grid container style={{display: 'flex', justifyItems: 'center', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
              <Grid>
              <FormControlLabel
                style={{ width: '100%', textAlign: 'left'}}
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              </Grid>
              <Grid>
              <Link to="/sign_up" variant="body2">
                    Forgot password?
                    </Link>
              </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{backgroundColor: '#6655ff', borderRadius: '10px', padding: '10px'}}
                className='!p-3'
              >
                Tạo tài khoản
              </Button>
                  <Link to="/sign_up" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}