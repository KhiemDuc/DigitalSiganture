import { FormControl, FormLabel, Grid, Input, Select } from '@chakra-ui/react'

function RequestTicket() {
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

      
    </Grid>
  )
}

export default RequestTicket
