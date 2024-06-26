import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import AccountSettings from "./AccountSettings";
import ChangeCurrentPassword from "./changeCurrentPassword";
import { useSelector } from "react-redux";

const Content = () => {
  const { userInfo } = useSelector((state) => state.info);
  return (
    <Box
      as="main"
      flex={3}
      d="flex"
      flexDir="column"
      justifyContent="space-between"
      pt={5}
      bg="white"
      rounded="md"
      borderWidth={1}
      borderColor="gray.200"
      style={{ transform: "translateY(-100px)" }}
    >
      <Tabs>
        <TabList px={5}>
          <Tab
            mx={3}
            px={0}
            py={3}
            fontWeight="semibold"
            color="brand.cadet"
            // borderBottomWidth={1}
            _active={{ bg: "transparent" }}
            _selected={{ color: "brand.dark", borderColor: "brand.blue" }}
          >
            Cập nhật thông tin tài khoản
          </Tab>
          <Tab
            mx={3}
            px={0}
            py={3}
            fontWeight="semibold"
            color="brand.cadet"
            // borderBottomWidth={1}
            _active={{ bg: "transparent" }}
            _selected={{ color: "brand.dark", borderColor: "brand.blue" }}
          >
            Đổi mật khẩu
          </Tab>
        </TabList>

        <TabPanels px={3} mt={5}>
          <TabPanel>
            <AccountSettings userData={userInfo} />
          </TabPanel>
          <TabPanel>
            <ChangeCurrentPassword />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Content;
