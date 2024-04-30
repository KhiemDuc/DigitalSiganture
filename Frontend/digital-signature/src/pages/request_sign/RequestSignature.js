import { Container } from "@chakra-ui/layout";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../../helpers/userInfoTheme";
import RequestNavigate from "../../components/RequestSignature/RequestNavigate";
import BackHome from "./../../components/BackHome";

export default function RequestSignature() {
  return (
    <ChakraProvider theme={theme}>
      <Container
        display={{ base: "block", md: "flex" }}
        maxW="container.xl"
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "1000px",
          marginTop: "40px",
        }}
      >
        <BackHome />
        <RequestNavigate />
      </Container>
    </ChakraProvider>
  );
}
