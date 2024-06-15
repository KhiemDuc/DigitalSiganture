import * as React from "react";
import { useRef, useState } from "react";
import { FormControl, FormLabel, Grid, Input, Select } from "@chakra-ui/react";
import { Box, Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Badge,
  Text,
  HStack,
} from "@chakra-ui/react";
import { theme } from "../../helpers/userInfoTheme";
import { ChakraProvider } from "@chakra-ui/react";
import BackHome from "../BackHome";
import { useNavigate } from "react-router-dom";
import PaymentService from "../../services/payment.service";
import AppAppBar from "../Home/AppBar";
import getLPTheme from "../../helpers/getLPTheme";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const Header = () => {
  const LPtheme = createTheme(getLPTheme("light"));
  return (
    <ThemeProvider theme={LPtheme}>
      <AppAppBar hideButton="true" />
    </ThemeProvider>
  );
};

function StudentVerify() {
  const [showFormControls, setShowFormControls] = React.useState(false);
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const handleSubcriptionStudent = () => {
    const studentInfo = {
      studentId,
      firstName,
      lastName,
    };
    PaymentService.subscriptionStudent(studentInfo)
      .then((res) => {
        navigate("/otp_student_verify/" + res.data.data.token);
      })
      .catch((err) => {});
  };

  return (
    <ChakraProvider theme={theme}>
      <Grid templateColumns="repeat(1, 1fr)" gap={4}>
        <BackHome />
        <h4
          style={{
            textAlign: "center",
            margin: "120px 0 0 60px",
            fontSize: "36px",
            fontWeight: 500,
            lineHeight: 1.5,
            fontFamily: "Be Vietnam Pro",
          }}
        >
          Mở khóa ưu đãi chỉ dành cho sinh viên TLU
        </h4>
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
          gap={4}
          padding={"20px 60px 60px 60px"}
        >
          {!showFormControls && (
            <>
              <FormControl id="firstName">
                <FormLabel>Tên</FormLabel>
                <Input
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  focusBorderColor="brand.blue"
                  type="text"
                />
              </FormControl>

              <FormControl id="lastName">
                <FormLabel>Họ</FormLabel>
                <Input
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  focusBorderColor="brand.blue"
                  type="text"
                />
              </FormControl>

              <FormControl id="gender">
                <FormLabel>Giới tính</FormLabel>
                <Select
                  focusBorderColor="brand.blue"
                  placeholder="Chọn giới tính"
                >
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                </Select>
              </FormControl>

              <FormControl id="dateOfbirth">
                <FormLabel>Ngày Sinh</FormLabel>
                <Input
                  focusBorderColor="brand.blue"
                  type="date"
                  placeholder=""
                />
              </FormControl>

              <FormControl id="phoneNumber">
                <FormLabel>Số Điện Thoại</FormLabel>
                <Input
                  focusBorderColor="brand.blue"
                  type="tel"
                  placeholder="(+84) 123 456 789"
                />
              </FormControl>

              <FormControl id="emailAddress">
                <FormLabel>Email do nhà trường cấp</FormLabel>
                <Input
                  focusBorderColor="brand.blue"
                  type="email"
                  placeholder="khimback@thanglong.edu.vn"
                />
              </FormControl>
              <FormControl id="Msv">
                <FormLabel>Mã Sinh Viên</FormLabel>
                <Input
                  value={studentId}
                  focusBorderColor="brand.blue"
                  type="text"
                  placeholder="A40953"
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </FormControl>
              <FormControl id="class">
                <FormLabel>Lớp</FormLabel>
                <Input
                  focusBorderColor="brand.blue"
                  type="text"
                  placeholder="TT33H7"
                />
              </FormControl>
            </>
          )}
        </Grid>
      </Grid>
      <Box mt={5} py={5} px={8} borderTopWidth={1} borderColor="brand.light">
        <Button
          onClick={() => {
            handleSubcriptionStudent();
          }}
        >
          Tiếp tục
        </Button>
      </Box>
    </ChakraProvider>
  );
}

export default StudentVerify;
