import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useState } from "react";

import RequestForm from "./RequestForm";
import Stepper from "../Steper";

const RequestNavigate = () => {
  const tabs = ["Đăng Ký Chứng Chỉ Số ✍️"];
  const [stepParent, setParentState] = useState(2);

  const changeParentState = (newState) => {
    console.log("newState", newState);
    setParentState(newState);
  };
  return (
    <div className="container">
      <Stepper step={stepParent} />
      <Box
        as="main"
        flex={3}
        d="flex"
        alignItems="center"
        flexDir="column"
        justifyContent="center"
        bg="white"
        rounded="md"
        borderWidth={1}
        borderColor="gray.200"
        borderRadius="20px"
      >
        <Tabs isFitted>
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
              <RequestForm changeStep={changeParentState} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
};

export default RequestNavigate;
