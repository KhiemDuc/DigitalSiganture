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
  Tooltip,
} from "@chakra-ui/react";
import ProvinceAPI from "../../common/Provinces.VN";
import ReactSelect from "react-select";
import axios from "../../setup/axios";
import { CloseButton } from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

function RequestForm({ changeStep }) {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fileValidate = useDisclosure();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [message, setMessage] = useState("");
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

    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      // setImgCCCDFont(selected);
      formData.delete("CCCD");
      formData.append("CCCD", selected);
      return reader.readAsDataURL(selected);
    }

    fileValidate.onOpen();
  };

  const changeCCCDBackImage = (event) => {
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    const selected = event.target.files[0];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      // reader.onloadend = () => setImgCCCDBack(selected);
      formData.delete("CCCDBack");
      formData.append("CCCDBack", selected);
      return reader.readAsDataURL(selected);
    }

    fileValidate.onOpen();
  };

  const stopCamera = () => {
    if (!toggle) return;
    try {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setToggle(false);
    } catch (err) {}
  };

  const startCamera = async () => {
    try {
      setToggle(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setImage(null);
    } catch (err) {}
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
      DataURIToBlob(canvasRef.current.toDataURL("image/png")),
      "face.jpg"
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

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [nationaltiy, setNationaltiy] = useState("Việt Nam");
  const [email, setEmail] = useState("");
  const [idNum, setIdNum] = useState("");

  const [provinces, setProvinces] = useState([]);
  const [provinceName, setProvinceName] = useState("");
  const [provinceID, setProvinceID] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [districtName, setDistrictName] = useState(null);
  const [districtID, setDistrictID] = useState(null);
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState(null);
  const [wardName, setWardName] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const handleRegisterSignature = (event) => {
    event.preventDefault();
    const body = {
      firstName: firstName,
      lastName: lastName,
      publicKey: publicKey,
      address: wardName + ", " + districtName + ", " + provinceName,
      phone: phone,
      gender: gender,
      dateOfBirth: dateOfBirth,
      nationality: nationaltiy,
      email: email,
      IdNum: idNum,
    };

    if (showFormControls) {
      for (const key in body) {
        formData.delete(key);
      }
      for (const key in body) {
        formData.append(key, body[key]);
      }
      axios
        .post("/certificate/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setIsSuccess(true);
          setIsFail(false);
          setMessage("Gửi yêu cầu thành công");
        })
        .catch((error) => {
          setIsSuccess(true);
          setIsFail(true);
          setMessage(error.response.data.message || "Gửi yêu cầu thất bại");
        });
    } else {
      setShowFormControls(!showFormControls);
    }
    changeStep(3);
  };

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
    <form onSubmit={handleRegisterSignature}>
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
                value={firstName}
                required
                onInput={(e) => setFirstName(e.target.value)}
              />
            </FormControl>

            <FormControl id="lastName">
              <FormLabel>Họ</FormLabel>
              <Input
                borderRadius={"15px"}
                focusBorderColor="brand.blue"
                type="text"
                required
                value={lastName}
                onInput={(e) => setLastName(e.target.value)}
              />
            </FormControl>

            <FormControl id="gender">
              <FormLabel>Giới tính</FormLabel>
              <Select
                value={gender}
                borderRadius={"15px"}
                focusBorderColor="brand.blue"
                placeholder="Chọn giới tính"
                onChange={(e) => {
                  setGender(e.target.value);
                  console.log(e.target.value);
                }}
              >
                <option value="Male">Nam</option>
                <option value="Female">Nữ</option>
              </Select>
            </FormControl>

            <FormControl id="dateOfbirth">
              <FormLabel>Ngày Sinh</FormLabel>
              <Input
                onInput={(e) => setDateOfBirth(e.target.value)}
                borderRadius={"15px"}
                focusBorderColor="brand.blue"
                type="date"
                placeholder=""
                isRequired
                value={dateOfBirth}
              />
            </FormControl>

            <FormControl id="phoneNumber">
              <FormLabel>Số Điện Thoại</FormLabel>
              <Input
                onInput={(e) => setPhone(e.target.value)}
                borderRadius={"15px"}
                focusBorderColor="brand.blue"
                type="tel"
                placeholder="(408) 996–1010"
                isRequired
                value={phone}
              />
            </FormControl>

            <FormControl id="emailAddress">
              <FormLabel>Email Address</FormLabel>
              <Input
                onInput={(e) => setEmail(e.target.value)}
                borderRadius={"15px"}
                focusBorderColor="brand.blue"
                type="email"
                placeholder="khimback@knb.com"
                isRequired
                value={email}
              />
            </FormControl>

            <FormControl id="province">
              <FormLabel>Tỉnh, Thành Phố Trực Thuộc Trung Ương</FormLabel>
              <ReactSelect
                theme={{
                  borderRadius: "15px",
                }}
                value={selectedProvince}
                id="province"
                placeholder="Chọn tỉnh"
                options={provinces.map((province) => ({
                  value: province.code,
                  label: province.name,
                }))}
                isSearchable
                onChange={(selectedOption) => {
                  setProvinceID(selectedOption.value); // Log label của tùy chọn được chọn
                  setProvinceName(selectedOption.label);
                  setSelectedProvince(selectedOption);
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
                value={selectedDistrict}
                isSearchable
                onChange={(selectedOption) => {
                  setDistrictID(selectedOption.value); // Log label của tùy chọn được chọn
                  setDistrictName(selectedOption.label);
                  setSelectedDistrict(selectedOption);
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
                // value={wardID}
                placeholder="Chọn phường, xã"
                ref={wardSelectRef}
                id="ward"
                options={wards.map((ward) => ({
                  value: ward.code,
                  label: ward.name,
                }))}
                value={selectedWard}
                required
                isLoading={wards.length === 0}
                isSearchable
                onChange={(selectedOption) => {
                  setWardName(selectedOption.label);
                  setSelectedWard(selectedOption);
                }}
              />
            </FormControl>
          </>
        )}

        {showFormControls && (
          <>
            <FormControl id="idNum">
              <FormLabel>Số CCCD</FormLabel>
              <Input
                onInput={(e) => setIdNum(e.target.value)}
                borderRadius={"15px"}
                focusBorderColor="brand.blue"
                type="text"
                isRequired
                value={idNum}
              />
            </FormControl>
            <FormControl id="idNum">
              <FormLabel>
                Mã khoá công khai{" "}
                <Tooltip label="Mã khoá công khai được tạo ở bước 1">
                  <InfoOutlineIcon />
                </Tooltip>
              </FormLabel>
              <Input
                onInput={(e) => setPublicKey(e.target.value)}
                borderRadius={"15px"}
                focusBorderColor="brand.blue"
                type="text"
                isRequired
                value={publicKey}
              />
            </FormControl>
            <FormControl id="cccd_img_front">
              <FormLabel>Ảnh CCCD Mặt Trước</FormLabel>
              <Input
                className="form-control"
                focusBorderColor="brand.blue"
                type="file"
                onChange={changeProfileImage}
                accept="image/png, image/jpeg"
                style={{ padding: "5px" }}
                isRequired
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
                isRequired
                className="form-control"
                focusBorderColor="brand.blue"
                type="file"
                // value={imgCCCDBack}
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
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={openModal}
                >
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
      <Box mt={5} pt={5} px={8} borderTopWidth={1} borderColor="brand.light">
        <button type="submit" className="btn btn-outline-primary">
          {!showFormControls ? "Tiếp tục" : "Đăng ký"}
        </button>
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
                  src={
                    isFail
                      ? "/static/img/remove.png"
                      : "/static/img/success.png"
                  }
                />
                <Text fontSize={17} id="modal-modal-title">
                  {message}
                </Text>
                {!isFail && (
                  <button
                    type="button"
                    class="btn btn-link"
                    onClick={() => {
                      navigate("/certificate/my_request");
                    }}
                  >
                    Xem vé yêu cầu
                  </button>
                )}
              </Box>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </form>
  );
}

export default RequestForm;
