import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardMedia } from "@mui/material";

export const Team = (props) => {
  return (
    <Container
      id="team"
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
          Thành Viên Dự Án
        </Typography>
      </Box>
      <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent="center"
        alignContent="space-between"
      >
        <Card sx={{ minWidth: 250, maxWidth: 345, mx: 5, mt: 2 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="250"
              image="../static/img/khiem_dev.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Nguyễn Đức Khiêm
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fullstack Deverloper
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card sx={{ minWidth: 250, maxWidth: 345, mx: 5, mt: 2 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="250"
              image="../static/img/bach_dev.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Bùi Văn Bách
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fullstack Deverloper
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Container>
  );
};
