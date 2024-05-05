import { Container } from "@chakra-ui/layout";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../../helpers/userInfoTheme";
import RequestNavigate from "../../components/RequestSignature/RequestNavigate";
import BackHome from "./../../components/BackHome";
import { useMediaQuery } from "@chakra-ui/react";

export default function RequestSignature() {
  const [isSmallerThan760] = useMediaQuery("(max-width: 760px)");
  return (
    <ChakraProvider theme={theme}>
      <BackHome />
      <Container
        display={{ base: "block", md: "flex" }}
        maxW="container.xl"
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: isSmallerThan760 ? "100%" : "1000px",
          paddingTop: isSmallerThan760 ? "120px" : "40px",
        }}
      >
        <RequestNavigate />
      </Container>
    </ChakraProvider>
  );
}
