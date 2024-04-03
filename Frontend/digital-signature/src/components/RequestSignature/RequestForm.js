import * as React from 'react';
import { useRef, useState } from 'react';
import { FormControl, FormLabel, Grid, Input, Select } from '@chakra-ui/react'
import { Box, Button } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react';
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
} from '@chakra-ui/react'




function RequestForm() {
  
  const [imgCCCD, setImgCCCD] = useState(null);
  const [toggle, setToggle] = useState(true);
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const fileValidate = useDisclosure();

  const changeProfileImage = event => {
    const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg']
    const selected = event.target.files[0]

    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader()
      reader.onloadend = () => setImgCCCD(reader.result)
      return reader.readAsDataURL(selected)
      
      
    }

    fileValidate.onOpen()
  }

  const [image, setImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const stopCamera = () => {
    if (!toggle) return;
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
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
    const context = canvasRef.current.getContext('2d');
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);
    setImage(canvasRef.current.toDataURL('image/png'));
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
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      gap={6}
    >
      <FormControl id="firstName">
        <FormLabel>Tên</FormLabel>
        <Input focusBorderColor="brand.blue" type="text" placeholder="Tim" />
      </FormControl>

      <FormControl id="lastName">
        <FormLabel>Họ</FormLabel>
        <Input focusBorderColor="brand.blue" type="text" placeholder="Cook" />
      </FormControl>

      <FormControl id="gender">
        <FormLabel>Giới tính</FormLabel>
        <Select focusBorderColor="brand.blue" placeholder="Chọn giới tính">
          <option value="male">Nam</option>
          <option value="female">Nữ</option>
        </Select>
      </FormControl>

      <FormControl id="dateOfbirth">
        <FormLabel>Ngày Sinh</FormLabel>
        <Input focusBorderColor="brand.blue" type="date" placeholder="" />
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
        <FormLabel>Email Address</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="email"
          placeholder="tcook@apple.com"
        />
      </FormControl>
      
      <FormControl id="city">
        <FormLabel>City</FormLabel>
        <Select focusBorderColor="brand.blue" placeholder="Select city">
          <option value="california">California</option>
          <option value="washington">Washington</option>
          <option value="toronto">Toronto</option>
          <option value="newyork" selected>
            New York
          </option>
          <option value="london">London</option>
          <option value="netherland">Netherland</option>
          <option value="poland">Poland</option>
        </Select>
      </FormControl>

      <FormControl id="country">
        <FormLabel>Country</FormLabel>
        <Select focusBorderColor="brand.blue" placeholder="Select country">
          <option value="america" selected>
            America
          </option>
          <option value="england">England</option>
          <option value="poland">Poland</option>
        </Select>
      </FormControl>

      <FormControl id="cccd_img">
        <FormLabel>Ảnh Căn Cước Công Dân</FormLabel>
        <Input focusBorderColor="brand.blue" type="file" value={imgCCCD} onChange={changeProfileImage} accept="image/png, image/jpeg" style={{padding: '5px'}}></Input>
        <Modal isOpen={fileValidate.isOpen} onClose={fileValidate.onClose} >
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
        <Button onClick={openModal} >Mở camera</Button>
          <Modal isOpen={isOpen} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Chụp ảnh xác thực</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {/* <Lorem count={2} /> */}
              </ModalBody>
              
              {toggle && <video ref={videoRef}  autoPlay/>}
              <canvas ref={canvasRef} hidden={true}/>
              {image && <img src={image} alt="Captured" />}

              
              <ModalFooter>
                <Button mr={3} onClick={captureImage}>Chụp ảnh</Button>
                <Button mr={3} onClick={startCamera}>Mở Camera</Button>
                <Button colorScheme='blue' mr={3} onClick={closeModal}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
      </FormControl>

      <Box mt={5} py={5} px={8} borderTopWidth={1} borderColor="brand.light">
      <Button>Tạo</Button>
      </Box>
    </Grid>
    
  )
}

export default RequestForm
