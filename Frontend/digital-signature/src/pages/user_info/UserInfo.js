import { Container } from "@chakra-ui/layout";
import Content from "../../components/AccountContent";
import ShowUserInfo from "../../components/ShowUserInfo/ShowUserInfo";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../../helpers/userInfoTheme";
import Cover from "../../components/Cover";
import { useSelector } from "react-redux";
import UserService from "../../services/user.service";
import { useEffect, useState } from "react";

export default function Main() {
  const { user } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    UserService.getUserInfo(user._id)
      .then((response) => {
        console.log(response.data);
        setUserData(response.data.data);
      })
      .catch((error) => {});
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <Cover />
      <Container display={{ base: "block", md: "flex" }} maxW="container.xl">
        <ShowUserInfo user={userData} />
        <Content userData={userData} />
      </Container>
    </ChakraProvider>
  );
}
