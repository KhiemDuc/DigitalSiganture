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
import ProvinceAPI from "../../common/Provinces.VN";
import ReactSelect from "react-select";
import axios from "../../setup/axios";
import { theme } from "../../helpers/userInfoTheme";
import { ChakraProvider } from "@chakra-ui/react";
import BackHome from "../BackHome";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function StudentVerify() {
  const [imgCCCD, setImgCCCD] = useState(null);
  const [toggle, setToggle] = useState(true);
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const fileValidate = useDisclosure();
  const [showFormControls, setShowFormControls] = React.useState(false);
  const navigate = useNavigate();

  const changeProfileImage = (event) => {
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    const selected = event.target.files[0];
    setImgCCCD(selected);
    // if (selected && ALLOWED_TYPES.includes(selected.type)) {
    //   let reader = new FileReader();
    //   reader.onloadend = () => setImgCCCD(reader.result);
    //   return reader.readAsDataURL(selected);
    // }

    fileValidate.onOpen();
  };

  const [image, setImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const stopCamera = () => {
    if (!toggle) return;
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    videoRef.current.srcObject = null;
    setToggle(false);
  };

  const startCamera = async () => {
    setToggle(true);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    videoRef.current.play();
    setImage(null);
  };

  const captureImage = () => {
    const context = canvasRef.current.getContext("2d");
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context.drawImage(
      videoRef.current,
      0,
      0,
      videoRef.current.videoWidth,
      videoRef.current.videoHeight
    );
    setImage(canvasRef.current.toDataURL("image/png"));
    stopCamera();
    // setToggle(false);
  };

  const openModal = async () => {
    onOpen();
    if (!image) startCamera();
  };

  const closeModal = async () => {
    onClose();
    stopCamera();
  };

  return (
    <ChakraProvider theme={theme}>
      <BackHome />
      <Grid templateColumns="repeat(1, 1fr)" gap={4}>
        <h4 style={{ textAlign: "left", margin: "120px 0 0 60px" }}>
          Mở khóa ưu đãi chỉ dành cho sinh viên TLU
        </h4>
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
          gap={4}
          padding={"60px"}
        >
          {!showFormControls && (
            <>
              <FormControl id="firstName">
                <FormLabel>Tên</FormLabel>
                <Input focusBorderColor="brand.blue" type="text" />
              </FormControl>

              <FormControl id="lastName">
                <FormLabel>Họ</FormLabel>
                <Input focusBorderColor="brand.blue" type="text" />
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
                  placeholder="(408) 996–1010"
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
                  focusBorderColor="brand.blue"
                  type="text"
                  placeholder="A40953"
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

          {showFormControls && (
            <>
              <FormControl id="cccd_img_front">
                <FormLabel>Ảnh CCCD Mặt Trước</FormLabel>
                <Input
                  focusBorderColor="brand.blue"
                  type="file"
                  // value={imgCCCD}
                  onChange={changeProfileImage}
                  accept="image/png, image/jpeg"
                  style={{ padding: "5px" }}
                ></Input>
                <Modal
                  isOpen={fileValidate.isOpen}
                  onClose={fileValidate.onClose}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Something went wrong</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Text>File not supported!</Text>
                      <HStack mt={1}>
                        <Text color="brand.cadet" fontSize="sm">
                          Supported types:
                        </Text>
                        <Badge colorScheme="green">PNG</Badge>
                        <Badge colorScheme="green">JPG</Badge>
                        <Badge colorScheme="green">JPEG</Badge>
                      </HStack>
                    </ModalBody>

                    <ModalFooter>
                      <Button onClick={fileValidate.onClose}>Close</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </FormControl>

              <FormControl id="cccd_img_back">
                <FormLabel>Ảnh CCCD Mặt Sau</FormLabel>
                <Input
                  focusBorderColor="brand.blue"
                  type="file"
                  // value={imgCCCD}
                  onChange={changeProfileImage}
                  accept="image/png, image/jpeg"
                  style={{ padding: "5px" }}
                ></Input>
                <Modal
                  isOpen={fileValidate.isOpen}
                  onClose={fileValidate.onClose}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Something went wrong</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Text>File not supported!</Text>
                      <HStack mt={1}>
                        <Text color="brand.cadet" fontSize="sm">
                          Supported types:
                        </Text>
                        <Badge colorScheme="green">PNG</Badge>
                        <Badge colorScheme="green">JPG</Badge>
                        <Badge colorScheme="green">JPEG</Badge>
                      </HStack>
                    </ModalBody>

                    <ModalFooter>
                      <Button onClick={fileValidate.onClose}>Close</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </FormControl>

              <FormControl id="img_authen">
                <FormLabel>Ảnh Chụp</FormLabel>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Button onClick={openModal}>
                    {image ? "Chụp/Xem lại ảnh" : "Mở Camera"}
                  </Button>
                  <p className="m-0">
                    {image ? "Ảnh đã được chụp" : "Chưa có ảnh nào được chụp"}
                  </p>
                  <Modal isOpen={isOpen} onClose={closeModal}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Chụp ảnh xác thực</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>{/* <Lorem count={2} /> */}</ModalBody>

                      {toggle && <video ref={videoRef} autoPlay />}
                      <canvas ref={canvasRef} hidden={true} />
                      {image && <img src={image} alt="Captured" />}

                      <ModalFooter>
                        <Button mr={3} onClick={captureImage}>
                          Chụp ảnh
                        </Button>
                        <Button mr={3} onClick={startCamera}>
                          Mở Camera
                        </Button>
                        <Button colorScheme="blue" mr={3} onClick={closeModal}>
                          Close
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </div>
              </FormControl>
            </>
          )}
        </Grid>
      </Grid>
      <Box mt={5} py={5} px={8} borderTopWidth={1} borderColor="brand.light">
        <Button
          onClick={() => {
            navigate("/otp_student_verify");
          }}
        >
          Tiếp tục
        </Button>
      </Box>
    </ChakraProvider>
  );
}

export default StudentVerify;
