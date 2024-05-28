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
  IconButton,
  Avatar,
} from "@chakra-ui/react";
import ProvinceAPI from "../../common/Provinces.VN";
import ReactSelect from "react-select";
import axios from "../../setup/axios";
import { CloseButton } from "@chakra-ui/react";
import { screen } from "@testing-library/react";

function RequestForm({ changeStep }) {
  const [imgCCCD, setImgCCCD] = useState(null);
  const [imgCccdDBack, setImgCccdBack] = useState(null);
  const [toggle, setToggle] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fileValidate = useDisclosure();
  const [isSuccess, setIsSuccess] = useState(false);
  const [showFormControls, setShowFormControls] = React.useState(false);
  const [image, setImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [formData, setFormData] = useState(() => new FormData());

  function DataURIToBlob(dataURI) {
    const splitDataURI = dataURI.split(",");
    const byteString =
      splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  }

  const changeProfileImage = (event) => {
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    const selected = event.target.files[0];
    formData.append("CCCD", selected);
    // if (selected && ALLOWED_TYPES.includes(selected.type)) {
    //   let reader = new FileReader();
    //   reader.onloadend = () => setImgCCCD(reader.result);
    //   return reader.readAsDataURL(selected);
    // }

    // fileValidate.onOpen();
  };

  const changeCCCDBackImage = (event) => {
    // const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    const selected = event.target.files[0];
    // if (selected && ALLOWED_TYPES.includes(selected.type)) {
    //   let reader = new FileReader();
    //   reader.onloadend = () => setImgCccdBack(reader.result);
    //   return reader.readAsDataURL(selected);
    // }

    // fileValidate.onOpen();
    formData.append("CCCDBack", selected);
  };

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
    formData.append(
      "face",
      DataURIToBlob(canvasRef.current.toDataURL("image/png"))
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

  const [provinces, setProvinces] = useState([]);
  const [provinceID, setProvinceID] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [districtID, setDistrictID] = useState(null);
  const [wards, setWards] = useState([]);

  React.useEffect(() => {
    ProvinceAPI.getListProvinces()
      .then((response) => {
        setProvinces(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const provinceSelectRef = React.useRef();
  const wardSelectRef = React.useRef();

  React.useEffect(() => {
    if (!provinceID) return;
    ProvinceAPI.getAllDistrictsFromProvince(provinceID)
      .then((response) => {
        setDistricts(response.data.districts);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [provinceID]);

  React.useEffect(() => {
    if (!districtID) return;
    ProvinceAPI.getAllWardsFromDistrict(districtID)
      .then((response) => {
        setWards(response.data.wards);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [districtID]);

  return (
    <>
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        gap={4}
      >
        {!showFormControls && (
          <>
            <FormControl id="firstName">
              <FormLabel>Tên</FormLabel>
              <Input
                borderRadius={"15px"}
                focusBorderColor="brand.blue"
                type="text"
              />
            </FormControl>

            <FormControl id="lastName">
              <FormLabel>Họ</FormLabel>
              <Input
                borderRadius={"15px"}
                focusBorderColor="brand.blue"
                type="text"
              />
            </FormControl>

            <FormControl id="gender">
              <FormLabel>Giới tính</FormLabel>
              <Select
                borderRadius={"15px"}
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
                borderRadius={"15px"}
                focusBorderColor="brand.blue"
                type="date"
                placeholder=""
              />
            </FormControl>

            <FormControl id="phoneNumber">
              <FormLabel>Số Điện Thoại</FormLabel>
              <Input
                borderRadius={"15px"}
                focusBorderColor="brand.blue"
                type="tel"
                placeholder="(408) 996–1010"
              />
            </FormControl>

            <FormControl id="emailAddress">
              <FormLabel>Email Address</FormLabel>
              <Input
                borderRadius={"15px"}
                focusBorderColor="brand.blue"
                type="email"
                placeholder="khimback@knb.com"
              />
            </FormControl>

            <FormControl id="province">
              <FormLabel>Tỉnh, Thành Phố Trực Thuộc Trung Ương</FormLabel>
              <ReactSelect
                theme={{
                  borderRadius: "15px",
                }}
                id="province"
                placeholder="Chọn tỉnh"
                options={provinces.map((province) => ({
                  value: province.code,
                  label: province.name,
                }))}
                isSearchable
                onChange={(selectedOption) => {
                  setProvinceID(selectedOption.value); // Log label của tùy chọn được chọn
                  provinceSelectRef.current.focus();
                }}
              />
            </FormControl>

            <FormControl id="district">
              <FormLabel>Quận, Huyện, Thành Phố</FormLabel>
              <ReactSelect
                theme={{
                  borderRadius: "15px",
                }}
                ref={provinceSelectRef}
                id="district"
                placeholder="Chọn quận, huyện "
                options={districts.map((district) => ({
                  value: district.code,
                  label: district.name,
                }))}
                isSearchable
                onChange={(selectedOption) => {
                  setDistrictID(selectedOption.value); // Log label của tùy chọn được chọn
                  wardSelectRef.current.focus();
                }}
              />
            </FormControl>

            <FormControl id="wards">
              <FormLabel>Phường, Xã</FormLabel>
              <ReactSelect
                theme={{
                  borderRadius: "15px",
                }}
                placeholder="Chọn phường, xã"
                ref={wardSelectRef}
                id="ward"
                options={wards.map((ward) => ({
                  value: ward.code,
                  label: ward.name,
                }))}
                isSearchable
              />
            </FormControl>
          </>
        )}

        {showFormControls && (
          <>
            <FormControl id="cccd_img_front">
              <FormLabel>Ảnh CCCD Mặt Trước</FormLabel>
              <Input
                className="form-control"
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
                className="form-control"
                focusBorderColor="brand.blue"
                type="file"
                // value={imgCCCD}
                onChange={changeCCCDBackImage}
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
                <button className="btn btn-outline-success" onClick={openModal}>
                  {image ? "Chụp/Xem lại ảnh" : "Mở Camera"}
                </button>
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
                      <Button
                        variant="outline"
                        color={"brand.blue"}
                        mr={3}
                        onClick={captureImage}
                      >
                        Chụp ảnh
                      </Button>
                      <Button
                        variant="outline"
                        color={"brand.blue"}
                        mr={3}
                        onClick={startCamera}
                      >
                        Mở Camera
                      </Button>
                      <Button
                        variant="outline"
                        color={"brand.blue"}
                        mr={3}
                        onClick={closeModal}
                      >
                        Đóng
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </div>
            </FormControl>
          </>
        )}
        <FormControl
          id="btn-next"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="outlined"
            color={"brand.blue"}
            onClick={() => setShowFormControls(!showFormControls)}
            borderBottom={"1px solid #4164e3"}
          >
            {showFormControls ? "<< Quay lại" : "Tiếp tục >>"}
          </Button>
        </FormControl>
      </Grid>
      <Box mt={5} py={5} px={8} borderTopWidth={1} borderColor="brand.light">
        <Button
          onClick={() => {
            const body = {
              firstName: "Khiem",
              lastName: "Nguyen",
              publicKey:
                "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiOq6GkOOcdLafJNIHoTTIL2I3OpruPnqsJuqEXZXUdwrflh5/cHFawfsW3dyWorg6u9e5KvHu2iL6WqEr+/yp5bFRLLqW40zacT5odIrErWqxDLnY5MNGsXGzC1YAB3WZXgVonTIG6NKmqPdat3KsoqK2NI64pJoOWt5aBwxggQWEFAdqowswJQdNCh4v0jMOZqGcN/HNVG8bUh4Wr4B1KmCvaN8Phz0oRxMjzKYwOiRyI4TLtnQGiAoCE8450FoJmA/7vOqpvtPsa8uLcn2IyUKYh6M1zmnGK4bx69i76raGDyYjNBfRir61LoyQBPXzerf7BNguQSbdZEFW/Kr2QIDAQAB-----END PUBLIC KEY-----",
              address: "Hà Nội",
              phone: "0123456789",
              gender: "Male",
              dateOfBirth: "2023-09-01",
              nationaltiy: "Vietnam",
              email: "123@gmail.com",
              idNum: "030202010287",
            };

            if (showFormControls) {
              for (const key in body) {
                formData.append(key, body[key]);
              }
              console.log(formData);
              axios
                .post("/certificate/", formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                })
                .then((response) => {
                  console.log(response);
                })
                .catch((error) => {
                  console.error(error);
                });
            } else {
              setShowFormControls(!showFormControls);
            }
            changeStep(3);
          }}
        >
          {!showFormControls ? "Tiếp tục" : "Đăng ký"}
        </Button>
        <Modal
          blockScrollOnMount={false}
          isOpen={isSuccess}
          onClose={() => setIsSuccess(false)}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalBody>
              <IconButton
                aria-label="close"
                // onClick={handleClose} // Replace 'handleClose' with your function to close the modal
                sx={{
                  position: "absolute", // Position the button absolutely
                  top: 0, // Position it at the top
                  right: 0, // Position it at the left
                  padding: 2,
                }}
                variant={"text"}
                onClick={() => setIsSuccess(!isSuccess)}
              >
                <CloseButton />
              </IconButton>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyItems: "space-between",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Avatar
                  style={{ width: "80px", height: "80px" }}
                  src="/static/img/success.png"
                />
                <Text fontSize={17} id="modal-modal-title">
                  Gửi yêu cầu thành công
                </Text>
              </Box>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}

export default RequestForm;
