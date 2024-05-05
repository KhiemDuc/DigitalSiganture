import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import RequestForm from "./RequestForm";
import RequestTicket from "./RequestTicket";

const RequestNavigate = () => {
  const tabs = ["Đăng Ký Chứng Chỉ Số", "Xem vé yêu cầu"];

  return (
    <Box
      as="main"
      flex={3}
      d="flex"
      alignItems="center"
      flexDir="column"
      justifyContent="center"
      //   pt={5}
      bg="white"
      rounded="md"
      borderWidth={1}
      borderColor="gray.200"
      // width={"1000px"}
      //   style={{ transform: 'translateY(-100px)' }}
    >
      <Tabs>
        <TabList px={5}>
          {tabs.map((tab) => (
            <Tab
              key={tab}
              mx={3}
              px={0}
              py={3}
              fontWeight="semibold"
              color="brand.cadet"
              borderBottomWidth={1}
              _active={{ bg: "transparent" }}
              _selected={{ color: "brand.dark", borderColor: "brand.blue" }}
            >
              {tab}
            </Tab>
          ))}
        </TabList>

        <TabPanels px={3} mt={5}>
          <TabPanel>
            <RequestForm />
          </TabPanel>
          <TabPanel>
            <RequestTicket />
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* <Actions /> */}
    </Box>
  );
};

export default RequestNavigate;
