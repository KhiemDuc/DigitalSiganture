import { Container } from "@chakra-ui/layout";
import Content from "../../components/AccountContent";
import ShowUserInfo from "../../components/ShowUserInfo/ShowUserInfo";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../../helpers/userInfoTheme";
import Cover from "../../components/Cover";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../../redux/infoSlice";
import { showToast, ToastType } from "../../common/toast";
import { ToastContainer } from "react-toastify";

export default function Main() {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoggedIn) {
      console.log(user._id);
      dispatch(getUserInfo(user._id))
        .unwrap()
        .then(() => {})
        .catch(() => {
          showToast(
            "Lỗi khi lấy dữ liệu User vui lòng đăng nhập lại",
            ToastType.ERROR
          );
        });
    }
  }, [user, dispatch, isLoggedIn]);
  return (
    <ChakraProvider theme={theme}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Cover />
      <Container display={{ base: "block", md: "flex" }} maxW="container.xl">
        <ShowUserInfo />
        <Content />
      </Container>
    </ChakraProvider>
  );
}
