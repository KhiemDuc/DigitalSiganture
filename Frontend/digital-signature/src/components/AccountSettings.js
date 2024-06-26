import React, { useState, useEffect } from "react";
import { FormControl, FormLabel, Grid, Input, Select } from "@chakra-ui/react";
import UserService from "../services/user.service";
import { useSelector } from "react-redux";

function AccountSettings({ userData }) {
  console.log(userData);
  return (
    <Grid
      templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
      gap={6}
    >
      <FormControl id="firstName">
        <FormLabel>Tên</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="text"
          value={userData?.firstName}
        />
      </FormControl>
      <FormControl id="lastName">
        <FormLabel>Họ</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="text"
          value={userData?.lastName}
        />
      </FormControl>
      <FormControl id="gender">
        <FormLabel>Giới tính</FormLabel>
        <Select focusBorderColor="brand.blue" value={userData?.gender}>
          <option value="male">Nam</option>
          <option value="female">Nữ</option>
        </Select>
      </FormControl>
      <FormControl id="dateOfbirth">
        <FormLabel>Ngày Sinh</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="date"
          value={
            userData?.dateOfBirth &&
            new Date(userData?.dateOfBirth).toISOString().slice(0, 10)
          }
        />
      </FormControl>
      <FormControl id="dateOfbirth">
        <FormLabel>Thông Tin Liên Hệ</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="text"
          value={userData?.email}
        />
      </FormControl>
      {/* Add more fields as needed */}
    </Grid>
  );
}

export default AccountSettings;
