import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { width } from "@mui/system";

const CardCustom = ({ date, status, boxShadow }) => {
  return (
    <Box
      className="card-show"
      sx={{
        maxWidth: 330,
        border: "1px solid #e3dbdb",
        borderRadius: "15px",
        width: "100%",
        boxShadow: boxShadow,
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Vé yêu cầu
        </Typography>
        <Typography variant="h5" component="div">
          Cấp chứng chỉ số
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {status}
        </Typography>
        <Typography variant="body2">
          <br />
          {date}
        </Typography>
      </CardContent>
      <CardActions className="card-show--action">
        <Button sx={{ width: "100%" }} size="small">
          Xem chi tiết vé yêu cầu
        </Button>
      </CardActions>
    </Box>
  );
};

export default CardCustom;
