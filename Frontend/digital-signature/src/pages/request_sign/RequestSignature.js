import { Container } from "@chakra-ui/layout";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../../helpers/userInfoTheme";
import RequestNavigate from "../../components/RequestSignature/RequestNavigate";
import { useMediaQuery } from "@chakra-ui/react";
import { useEffect } from "react";

export default function RequestSignature() {
  const [isSmallerThan760] = useMediaQuery("(max-width: 760px)");
  useEffect(() => {
    document.title = "Đăng ký chứng chỉ số";
    let element = document.querySelector(".fda3723591e0b38e7e52");

    if (element) {
      element.remove();
    }
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <Container
        display={{ base: "block", md: "flex" }}
        maxW="container.xl"
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: isSmallerThan760 ? "100%" : "1000px",
          paddingTop: isSmallerThan760 ? "40px" : "40px",
        }}
      >
        <RequestNavigate />
      </Container>
    </ChakraProvider>
  );
}
