import {
  Step,
  StepDescription,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  StepIcon,
  useSteps,
  Box,
} from "@chakra-ui/react";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../../helpers/userInfoTheme";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const steps = [
  {
    title: "Bước 1",
    description: "Tạo cặp khoá",
  },
  {
    title: "Bước 2",
    description: "Điền thông tin",
  },
  {
    title: "Bước 3",
    description: "Gửi yêu cầu và chờ kết quả",
  },
];

const StepperCustom = ({ step, sx }) => {
  const navigate = useNavigate();
  const { activeStep, setActiveStep } = useSteps({
    index: step,
    count: steps.length,
  });
  console.log(step);
  useEffect(() => {
    setActiveStep(step);
  }, [step]);

  return (
    <ChakraProvider theme={theme}>
      <Stepper
        overflow={"auto"}
        sx={sx}
        index={activeStep}
        gap={20}
        justifyContent={"space-between"}
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </ChakraProvider>
  );
};

export default StepperCustom;
